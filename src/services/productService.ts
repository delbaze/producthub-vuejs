import type { Category } from "@/types/Category";
import type { Product } from "@/types/Product";
import type { ProductFormData } from "@/types/ProductForm";

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
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`)
  if (!response.ok) throw new Error('Impossible de récupérer les catégories')
  return response.json()
}


//? après, prévoir une méthode de création de produit (en POST)
export async function createProduct(data: ProductFormData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error('Impossible de créer le produit')
  }
  return response.json()
}

//? récupérer un produit précis par son id, pour la vue détail et le pré-remplissage en édition
export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error('Produit introuvable')
  }
  return response.json()
}

//? modification d'un produit existant (en PUT)
export async function updateProduct(id: string, data: ProductFormData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    throw new Error('Impossible de modifier le produit')
  }
  return response.json()
}

//? suppression d'un produit (en DELETE)
export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('Impossible de supprimer le produit')
  }
}