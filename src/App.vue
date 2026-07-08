<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/Product';
import { onMounted, ref } from 'vue';
import { fetchProducts } from '@/services/productService';


const products = ref<Product[]>([]);

onMounted(async () => {
  products.value = await fetchProducts();
})


</script>


<template>
  <div class="product-grid">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
</style>