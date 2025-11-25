const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function cachedFetch(url) {
  const cache = sessionStorage.getItem(url);
  if (cache) return JSON.parse(cache);

  const res = await fetch(url, { cache: "no-cache" });
  const data = await res.json();
  sessionStorage.setItem(url, JSON.stringify(data));
  return data;
}


export async function getCategories() {
  return cachedFetch(`${API_URL}/api/images/categories`);
}

export async function getEtages() {
  return cachedFetch(`${API_URL}/api/images/etages`);
}

export { API_URL };
