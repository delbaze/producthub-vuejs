<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()

onMounted(() => {
  if (!productStore.hasLoaded) {
    productStore.loadProducts()
  }
})
</script>

<template>
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