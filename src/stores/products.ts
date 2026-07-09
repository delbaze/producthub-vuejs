// src/stores/products.ts
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '@/types/Product'
import { fetchProducts, fetchProductsFilter } from '@/services/productService'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(true)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const hasLoaded = ref(false)

  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  async function loadProducts(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      products.value = await fetchProducts()
      hasLoaded.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      isLoading.value = false
    }
  }

  async function handleSearch(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      const query = searchQuery.value.trim()
      products.value = query === ''
        ? await fetchProducts()
        : await fetchProductsFilter(query)
      hasLoaded.value = true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      isLoading.value = false
    }
  }

  function resetSearch(): void {
    searchQuery.value = ''
  }

  watch(searchQuery, () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      handleSearch()
    }, 1000)
  })

  return { products, isLoading, error, searchQuery, hasLoaded, loadProducts, handleSearch, resetSearch }
})