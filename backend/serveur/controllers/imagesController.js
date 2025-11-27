// server/controllers/imagesController.js
import { supabase, getOptimizedPublicUrl } from '../supabase.js';
import { cache } from '../index.js';

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

export async function getImagesByFolder(req, res, noSend = false) {
  try {
    const folder = req.params.folder || '';
    const cacheKey = `folder_${folder}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      if (!noSend) {
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800, must-revalidate");
        return res.json(cached);
      }
      return cached;
    }

    const { data, error } = await supabase.storage.from('gym-images').list(folder, { limit: 200 });

    if (error) {
      console.error('Supabase list error:', error);
      if (!noSend) return res.status(500).json({ error: 'Failed to list images' });
      return [];
    }

    const backendUrl = process.env.BACKEND_URL || 'https://iron-gymv2.onrender.com';
    const files = (data || [])
      .filter(f => f?.name && !isPlaceholderFile(f.name))
      .map(f => {
        const proxyUrl = `${backendUrl}/api/images/proxy/${folder}/${f.name}`;
        return {
          name: f.name.replace(/\.[^/.]+$/, ''),
          url: proxyUrl,
          optimized: proxyUrl
        };
      });

    cache.set(cacheKey, files);

    if (!noSend) {
      res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800, must-revalidate");
      return res.json(files);
    }
    return files;

  } catch (err) {
    console.error('getImagesByFolder error', err);
    if (!noSend) return res.status(500).json({ error: 'Internal Server Error' });
    return [];
  }
}

export async function getCategories(req, res) {
  req.params.folder = 'categories';
  return getImagesByFolder(req, res);
}

export async function getEtages(req, res) {
  req.params.folder = 'etages';
  return getImagesByFolder(req, res);
}

export async function proxyImage(req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      res.setHeader('Access-Control-Max-Age', '86400');
      return res.status(200).end();
    }

    const { folder, filename } = req.params;
    const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/gym-images/${folder}/${filename}`;

    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.error(`Image not found: ${imageUrl}`);
      return res.status(404).json({ error: 'Image not found' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);

    // Désactiver le cache pour iOS Safari
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error('proxyImage error:', err);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
}
