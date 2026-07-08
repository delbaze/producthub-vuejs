import type { Product } from "@/types/Product";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Impossible de récuéprer les produits");
  }
  return response.json();
}
