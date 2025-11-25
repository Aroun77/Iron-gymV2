// server/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

//  Vérification des variables ENV
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
}

//  Client privé Serveur (pas de sessions)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
    global: { headers: { 'x-iron-cache': 'true' } } // ➕ hint CDN
  }
);

/**
 *  List images in folder (public bucket)
 */
export async function listImages(folder = '', bucket = 'gym-images') {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, { limit: 200 });

    if (error) throw error;

    return (data || [])
      .filter(f => f?.name && !f.name.startsWith('.'))
      .map(file => ({
        name: file.name,
        path: folder ? `${folder}/${file.name}` : file.name,
        publicUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${folder ? folder + '/' : ''}${file.name}`
      }));

  } catch (err) {
    console.error('Supabase listImages error:', err.message || err);
    return [];
  }
}

/**
 *  Generate optimized PUBLIC URL
 * Compatible iOS/Android/Chrome/Safari
 *  DO NOT use /render/... (causes 403 mobile)
 */
export function getOptimizedPublicUrl(
  publicUrl,
  { width = 600, quality = 65, format = 'webp' } = {}
) {
  if (!publicUrl) return null;

  const url = new URL(publicUrl);

  //  Fix Safari Bug: parameters must be simple integer strings
  if (width) url.searchParams.set('width', String(width));
  if (quality) url.searchParams.set('quality', String(quality));

  // Force WebP for compression, auto fallback if unsupported
  if (format) url.searchParams.set('format', String(format));

  return url.toString();
}
