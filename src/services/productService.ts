import type { Product } from "@/types/Product";

const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Impossible de récuéprer les produits");
  }
  return response.json();
}

export async function fetchProductsFilter(title: string): Promise<Product[]> {
  const params = new URLSearchParams({ title });
  const response = await fetch(`${BASE_URL}/products?${params}`);
  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits");
  }
  return response.json();
}


//? prévoir une méthode fetchCategories() pour récupérer la liste des catégories depuis : https://api.escuelajs.co/api/v1/categories

//? après, prévoir une méthode de création de produit (en POST)