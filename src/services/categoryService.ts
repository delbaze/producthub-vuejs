import type { Category } from "@/types/Category";
import type { CategoryFormData } from "@/types/CategoryForm";
import { BASE_URL } from "./common";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/categories`)
  if (!response.ok) throw new Error('Impossible de récupérer les catégories')
  return response.json()
}



export async function createCategory(
  data: CategoryFormData,
): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Impossible de créer la catégorie");
  return response.json();
}

export async function updateCategory(
  id: string,
  data: CategoryFormData,
): Promise<Category> {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Impossible de modifier la catégorie");
  return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Impossible de supprimer la catégorie");
}
