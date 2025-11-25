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
 * Récupère les images d’un dossier avec optimisation + cache serveur
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

    // ⚡ 3) Filtrage + création URLs via proxy backend
    // Utiliser l'URL de production Render au lieu de localhost
    const backendUrl = process.env.BACKEND_URL || 'https://iron-gymv2.onrender.com';
    const files = (data || [])
      .filter(f => f?.name && !isPlaceholderFile(f.name))
      .map(f => {
        // Utiliser le proxy backend au lieu de l'URL Supabase directe (évite CORS sur iOS)
        const proxyUrl = `${backendUrl}/api/images/proxy/${folder}/${f.name}`;
        return {
          name: f.name.replace(/\.[^/.]+$/, ''),
          url: proxyUrl,
          optimized: proxyUrl // Même URL pour éviter la complexité
        };
      });

    // ⚡ 4) Mettre en cache pour 2 minutes (config NodeCache)
    cache.set(cacheKey, files);

    // ⚡ 5) Retour (option noSend si utilisé par d’autres contrôleurs)
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

    // Copier les headers importants
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Stream l'image
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error('proxyImage error:', err);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
}

