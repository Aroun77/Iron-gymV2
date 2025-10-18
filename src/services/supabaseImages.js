import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Cache pour éviter les appels répétés
const imageCache = new Map();

/**
 * Récupère l'URL publique d'une image depuis Supabase Storage
 * @param {string} path - Chemin de l'image dans le bucket (ex: 'equipments/dumbbell.jpg')
 * @param {string} bucket - Nom du bucket (défaut: 'gym-images')
 * @returns {string} URL publique de l'image
 */
export const getImageUrl = (path, bucket = 'gym-images') => {
  if (!path) return null;

  // Vérifier le cache
  const cacheKey = `${bucket}/${path}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  // Mettre en cache
  imageCache.set(cacheKey, data.publicUrl);
  
  return data.publicUrl;
};

/**
 * Récupère une URL signée temporaire (pour images privées)
 * @param {string} path - Chemin de l'image
 * @param {number} expiresIn - Durée de validité en secondes (défaut: 3600 = 1h)
 * @param {string} bucket - Nom du bucket
 */
export const getSignedImageUrl = async (path, expiresIn = 3600, bucket = 'gym-images') => {
  if (!path) return null;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) {
    console.error('Erreur récupération URL signée:', error);
    return null;
  }

  return data.signedUrl;
};

/**
 * Liste toutes les images d'un dossier
 * @param {string} folder - Nom du dossier (ex: 'equipments')
 * @param {string} bucket - Nom du bucket
 */
export const listImages = async (folder = '', bucket = 'gym-images') => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'name', order: 'asc' }
    });

  if (error) {
    console.error('Erreur liste images:', error);
    return [];
  }

  // Retourner avec les URLs complètes
  return data.map(file => ({
    name: file.name,
    path: folder ? `${folder}/${file.name}` : file.name,
    url: getImageUrl(folder ? `${folder}/${file.name}` : file.name, bucket),
    size: file.metadata?.size,
    createdAt: file.created_at,
  }));
};

/**
 * Précharge plusieurs images pour optimiser le chargement
 * @param {string[]} paths - Tableau des chemins d'images
 * @param {string} bucket - Nom du bucket
 */
export const preloadImages = (paths, bucket = 'gym-images') => {
  const urls = paths.map(path => getImageUrl(path, bucket));
  
  urls.forEach(url => {
    if (url) {
      const img = new Image();
      img.src = url;
    }
  });

  return urls;
};

/**
 * Vide le cache d'images
 */
export const clearImageCache = () => {
  imageCache.clear();
};

/**
 * Optimise l'URL d'image avec des transformations Supabase
 * @param {string} path - Chemin de l'image
 * @param {object} options - Options de transformation
 */
export const getOptimizedImageUrl = (path, options = {}, bucket = 'gym-images') => {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
  } = options;

  const baseUrl = getImageUrl(path, bucket);
  
  if (!baseUrl) return null;

  // Si Supabase supporte les transformations, les ajouter ici
  // Sinon, retourner l'URL de base
  return baseUrl;
};

// Export du client Supabase si besoin
export { supabase };