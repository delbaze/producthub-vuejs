<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/Product'
import { fetchProductById } from '@/services/productService'
import { useProductStore } from '@/stores/products'

const props = defineProps<{ id: string }>()
const router = useRouter()
const productStore = useProductStore()

const product = ref<Product | null>(null)

const currentIndex = computed(() =>
  productStore.products.findIndex(p => p.id === Number(props.id))
)

const previousProduct = computed(() =>
  currentIndex.value > 0 ? productStore.products[currentIndex.value - 1] : null
)

const nextProduct = computed(() =>
  currentIndex.value !== -1 && currentIndex.value < productStore.products.length - 1
    ? productStore.products[currentIndex.value + 1]
    : null
)

async function loadProduct(): Promise<void> {
  product.value = await fetchProductById(props.id)
}

onMounted(() => {
  loadProduct()
  if (!productStore.hasLoaded) {
    productStore.loadProducts()
  }
})

watch(() => props.id, loadProduct)

function goToPrevious(): void {
  if (previousProduct.value) {
    router.push({ name: 'product-view', params: { id: previousProduct.value.id } })
  }
}

function goToNext(): void {
  if (nextProduct.value) {
    router.push({ name: 'product-view', params: { id: nextProduct.value.id } })
  }
}

function goToEdit(): void {
  router.push({ name: 'product-edit', params: { id: props.id } })
}

function goToDelete(): void {
  router.push({ name: 'product-delete', params: { id: props.id } })
}
</script>

<template>
  <div v-if="product">
    <button :disabled="!previousProduct" @click="goToPrevious">← Précédent</button>
    <h1>{{ product.title }}</h1>
    <p>{{ product.price }} €</p>
    <p>{{ product.description }}</p>
    <button :disabled="!nextProduct" @click="goToNext">Suivant →</button>
    <div>
      <button @click="goToEdit">Modifier</button>
      <button @click="goToDelete">Supprimer</button>
    </div>
  </div>
</template>