<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/Product';
import { onMounted, ref } from 'vue';
import { fetchProducts } from '@/services/productService';


const products = ref<Product[]>([]);
const isLoading = ref(true)

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (err) {

  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 800) // simulation d'un temps de récupération
  }
})

</script>

<template>
  <main>
    <p v-if="isLoading">Chargement des produits ...</p>
    <div v-else class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
  </main>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>