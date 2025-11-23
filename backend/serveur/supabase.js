// server/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

//  VÉRIFICATION ENV
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('⚠️ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
}

// 💡 Client privé (serveur) — NO SESSION
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
    global: { headers: { 'x-iron-cache': 'true' } } // ♻️ hint cache CDN
  }
);

/**
 *  List files from folder inside bucket `gym-images`
 * Returns => { name, path, publicUrl }
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
 *  Create an optimized PUBLIC image URL
 *  Compatible iOS / Safari / Chrome / Android
 *  Always return a WORKING URL
 */
export function getOptimizedPublicUrl(
  publicUrl,
  { width = 600, quality = 65, format = 'webp', resize = 'contain' } = {}
) {
  if (!publicUrl) return null;

  const url = new URL(publicUrl);

  // 🧠 Safari Bug Fix: must be integer strings
  if (width) url.searchParams.set('width', String(width));
  if (quality) url.searchParams.set('quality', String(quality));

  // 💪 Resize works safely everywhere
  if (resize) url.searchParams.set('resize', resize);

  // 🖼️ Try WebP, fallback auto if unsupported
  if (format) url.searchParams.set('format', format);

  return url.toString();
}
