import type { Product, ProductFilters } from "@/types/Product";
import type { ProductFormData } from "@/types/ProductForm";
import { BASE_URL } from "./common";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Impossible de récuéprer les produits");
  }
  return response.json();
}

export async function fetchProductsFilter(
  filters: ProductFilters,
): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.title) params.append("title", filters.title);
  if (filters.categoryId)
    params.append("categoryId", String(filters.categoryId));
  const response = await fetch(`${BASE_URL}/products?${params}`);
  if (!response.ok) {
    throw new Error("Impossible de récupérer les produits");
  }
  return response.json();
}

// export async function fetchProductsFilter(title: string): Promise<Product[]> {
//   const params = new URLSearchParams({ title });
//   const response = await fetch(`${BASE_URL}/products?${params}`);
//   if (!response.ok) {
//     throw new Error("Impossible de récupérer les produits");
//   }
//   return response.json();
// }

export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Impossible de créer le produit");
  }
  return response.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Produit introuvable");
  }
  return response.json();
}

export async function updateProduct(
  id: string,
  data: ProductFormData,
): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Impossible de modifier le produit");
  }
  return response.json();
}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Impossible de supprimer le produit");
  }
}
