const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const memoryCache = new Map();

export async function cachedFetch(url) {
  if (memoryCache.has(url)) return memoryCache.get(url);

  const res = await fetch(url, { cache: "no-cache" });
  const data = await res.json();
  memoryCache.set(url, data);
  return data;
}


export async function getCategories() {
  return cachedFetch(`${API_URL}/api/images/categories`);
}

export async function getEtages() {
  return cachedFetch(`${API_URL}/api/images/etages`);
}

export async function getBackgrounds() {
  return cachedFetch(`${API_URL}/api/images/backgrounds`);
}

export async function getCoaches() {
  return cachedFetch(`${API_URL}/api/images/coachs`);
}

export { API_URL };
