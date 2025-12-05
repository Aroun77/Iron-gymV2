// server/controllers/imagesController.js
import { supabase, getOptimizedPublicUrl } from '../supabase.js';
import { cache } from '../index.js'; // ⬅️ IMPORTANT

/**
 * Helper pour détecter les fichiers placeholders (à ignorer)
 */
const isPlaceholderFile = (fileName) => {
  if (!fileName) return true;
  const low = fileName.toLowerCase();
  return (
    low.startsWith('.') ||
    low.includes('empty') ||
    low.includes('placeholder') ||
    low === 'emptyfolderplaceholder'
  );
};

/**
 * Récupère les images d'un dossier avec optimisation + cache serveur
 * @param {*} req
 * @param {*} res
 * @param {boolean} noSend - si true → renvoie simplement les données (utilisé par cache)
 */
export async function getImagesByFolder(req, res, noSend = false) {
  try {
    const folder = req.params.folder || '';
    const cacheKey = `folder_${folder}`;

    // ⚡ 1) Vérifier cache serveur
    const cached = cache.get(cacheKey);
    if (cached) {
      if (!noSend) {
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800 , must-revalidate");
        return res.json(cached);
      }
      return cached;
    }

    // ⚡ 2) Requête Supabase uniquement si pas en cache
    const { data, error } = await supabase.storage.from('gym-images').list(folder, { limit: 200 });

    if (error) {
      console.error('Supabase list error:', error);
      if (!noSend) return res.status(500).json({ error: 'Failed to list images' });
      return [];
    }

    // ⚡ 3) Filtrage + URLs Imgix
    // Si IMGIX_URL est défini, on l'utilise. Sinon fallback sur Supabase direct.
    const imgixUrl = process.env.IMGIX_URL;
    console.log('Using Imgix URL:', imgixUrl ? imgixUrl : 'DISABLED (using Supabase)');

    const files = (data || [])
      .filter(f => f?.name && !isPlaceholderFile(f.name))
      .map(f => {
        let finalUrl;

        if (imgixUrl) {
          // Avec Imgix : https://mon-domaine.imgix.net/dossier/image.jpg
          // On réactive auto=format pour avoir WebP/AVIF (beaucoup plus léger)
          finalUrl = `${imgixUrl}/${folder ? folder + '/' : ''}${f.name}?auto=format,compress`;
        } else {
          // Fallback Supabase direct
          finalUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/gym-images/${folder ? folder + '/' : ''}${f.name}`;
        }

        return {
          name: f.name.replace(/\.[^/.]+$/, ''),
          url: finalUrl,
          optimized: finalUrl
        };
      });

    // ⚡ 4) Mettre en cache pour 2 minutes (config NodeCache)
    cache.set(cacheKey, files);

    // ⚡ 5) Retour (option noSend si utilisé par d'autres contrôleurs)
    if (!noSend) {
      res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800 , must-revalidate");
      return res.json(files);
    }
    return files;

  } catch (err) {
    console.error('getImagesByFolder error', err);
    if (!noSend) return res.status(500).json({ error: 'Internal Server Error' });
    return [];
  }
}

/**
 * Convenience routes
 */
export async function getCategories(req, res) {
  req.params.folder = 'categories';
  return getImagesByFolder(req, res);
}

export async function getEtages(req, res) {
  req.params.folder = 'etages';
  return getImagesByFolder(req, res);
}

export async function getBackgrounds(req, res) {
  req.params.folder = 'backgrounds';  // Avec un 's' pour correspondre à Supabase
  return getImagesByFolder(req, res);
}



/**
 * Proxy pour servir les images via le backend (évite CORS sur iOS)
 */
export async function proxyImage(req, res) {
  try {
    const { folder, filename } = req.params;

    // Construire l'URL Supabase
    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/gym-images/${folder}/${filename}`;

    // Fetch l'image depuis Supabase
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Headers CORS critiques pour permettre l'affichage cross-origin
    const origin = req.headers.origin;
    if (origin && (
      origin.includes('vercel.app') ||
      origin.includes('localhost')
    )) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    // Headers de l'image
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    // Stream l'image
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error('proxyImage error:', err);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
}
