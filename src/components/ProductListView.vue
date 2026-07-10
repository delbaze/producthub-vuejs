<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import { useCategoryStore } from '@/stores/categories'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  if (!productStore.hasLoaded) {
    productStore.loadProducts()
  }
  if (!categoryStore.hasLoaded) {
    categoryStore.loadCategories()
  }
})
</script>

<template>
  <select v-model="productStore.selectedCategoryId">
    <option :value="null">Toutes les catégories</option>
    <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
      {{ category.name }}
    </option>
  </select>
  <div class="search-bar">
    <input v-model="productStore.searchQuery" type="text" placeholder="Rechercher un produit..." />
    <button @click="productStore.handleSearch">Rechercher</button>
    <button v-if="productStore.searchQuery" @click="productStore.resetSearch">Réinitialiser</button>
  </div>

  <p v-if="productStore.isLoading">Chargement des produits ...</p>
  <p v-else-if="productStore.error">{{ productStore.error }}</p>
  <p v-else-if="productStore.products.length === 0">Aucun produit trouvé</p>
  <div v-else class="product-grid">
    <ProductCard v-for="product in productStore.products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.search-bar {
  height: 3rem;
}
</style>