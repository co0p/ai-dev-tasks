export async function fetchCatalog() {
  const res = await fetch('http://localhost:8080/catalog');
  if (!res.ok) throw new Error('Failed to fetch catalog');
  return await res.json();
}
