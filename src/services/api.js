const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getCategories() {
  const res = await fetch(`${API_URL}/api/images/categories`);
  return await res.json();
}

export async function getEtages() {
  const res = await fetch(`${API_URL}/api/images/etages`);
  return await res.json();
}

export { API_URL };
