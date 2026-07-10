import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '@/types/Category'
import type { CategoryFormData } from '@/types/CategoryForm'
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/services/categoryService'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const hasLoaded = ref(false)

  
  async function loadCategories(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      categories.value = await fetchCategories()
      hasLoaded.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      isLoading.value = false
    }
  }

  async function addCategory(data: CategoryFormData): Promise<Category> {
    const newCategory = await createCategory(data)
    categories.value.push(newCategory)
    return newCategory
  }

  async function editCategory(id: string, data: CategoryFormData): Promise<Category> {
    const updated = await updateCategory(id, data)
    const index = categories.value.findIndex(c => c.id === Number(id))
    if (index !== -1) categories.value[index] = updated
    return updated
  }

  async function removeCategory(id: string): Promise<void> {
    await deleteCategory(id)
    categories.value = categories.value.filter(c => c.id !== Number(id))
  }

  return { categories, isLoading, error, hasLoaded, loadCategories, addCategory, editCategory, removeCategory }
})