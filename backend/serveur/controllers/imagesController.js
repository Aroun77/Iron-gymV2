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
        res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
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

    // ⚡ 3) Filtrage + optimisation URL
    const files = (data || [])
      .filter(f => f?.name && !isPlaceholderFile(f.name))
      .map(f => {
        const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/gym-images/${folder ? folder + '/' : ''}${f.name}`;
        return {
          name: f.name.replace(/\.[^/.]+$/, ''),
          url: publicUrl,
          optimized: getOptimizedPublicUrl(publicUrl, { width: 600, quality: 65 })
        };
      });

    // ⚡ 4) Mettre en cache pour 2 minutes (config NodeCache)
    cache.set(cacheKey, files);

    // ⚡ 5) Retour (option noSend si utilisé par d’autres contrôleurs)
    if (!noSend) {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
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
