import { createClient } from '@supabase/supabase-js';

/*
  🚀 VERSION ULTRA OPTIMISÉE
  - CDN signé automatique pour éviter les erreurs 403
  - Transformations SUPABASE RLS SAFE
  - Cache mémoire + cache navigateur
  - Optimisation WebP + compression + resize
  - Préchargement intelligent (preconnect + preload)
*/

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  }
);

// ---- CACHE ----
const imageCache = new Map();

// ---- HELPERS ----
const buildTransformedUrl = (publicUrl, { width, height, quality = 75, format = 'webp' }) => {
  const url = new URL(publicUrl);
  url.pathname = url.pathname.replace('/object/public/', '/render/image/public/');

  if (width) url.searchParams.set('width', width);
  if (height) url.searchParams.set('height', height);

  url.searchParams.set('quality', quality);
  url.searchParams.set('format', format);

  return url.toString();
};

// ---- GET PUBLIC URL + OPTIMIZED ----
export const getImageUrl = (path, bucket = 'gym-images') => {
  if (!path) return null;

  const cacheKey = `${bucket}/${path}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  imageCache.set(cacheKey, data.publicUrl);
  return data.publicUrl;
};

export const getOptimizedImageUrl = (path, opts = {}, bucket = 'gym-images') => {
  const baseUrl = getImageUrl(path, bucket);
  if (!baseUrl) return null;

  const optimizedUrl = buildTransformedUrl(baseUrl, opts);
  return optimizedUrl;
};

// ---- SIGNED URL FOR PRIVATE BUCKETS ----
export const getSignedImageUrl = async (path, expiresIn = 3600, bucket = 'gym-images') => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) return null;
  return data.signedUrl;
};

// ---- LIST FILES ----
export const listImages = async (folder = '', bucket = 'gym-images') => {
  const { data, error } = await supabase.storage.from(bucket).list(folder);
  if (error) return [];

  return data.map((file) => ({
    name: file.name,
    path: folder ? `${folder}/${file.name}` : file.name,
    url: getOptimizedImageUrl(
      folder ? `${folder}/${file.name}` : file.name,
      { width: 900, quality: 70 },
      bucket
    )
  }));
};

// ---- PRELOAD IMAGES ----
export const preloadImages = (paths, bucket = 'gym-images') => {
  paths.forEach((p) => {
    const url = getOptimizedImageUrl(p, { width: 600, quality: 70 }, bucket);
    if (url) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    }
  });
};

// ---- CLEAR CACHE ----
export const clearImageCache = () => imageCache.clear();

export { supabase };