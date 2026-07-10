<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/Product'
import { fetchProductById } from '@/services/productService'
import { useProductStore } from '@/stores/products'
import ConfirmModal from '@/components/ConfirmModal.vue'
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'

const props = defineProps<{ id: string }>()
const router = useRouter()
const productStore = useProductStore()

const product = ref<Product | null>(null)
console.log('%c⧭', 'color: #00e600', product)

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

// function goToDelete(): void {
//   router.push({ name: 'product-delete', params: { id: props.id } })
// }
</script>

<template>
  <div v-if="product">
    <button :disabled="!previousProduct" @click="goToPrevious">← Précédent</button>
    <button :disabled="!nextProduct" @click="goToNext">Suivant →</button>

    <Tabs default-tab="infos">
      <Tab id="infos" label="Informations" />
      <Tab id="images" label="Images" />

      <template #content="{ activeTab }">
        <div v-if="activeTab === 'infos'">
          <h1>{{ product.title }}</h1>
          <p>{{ product.price }} €</p>
          <p>{{ product.category?.name }}</p>
          <p>{{ product.description }}</p>
        </div>

        <div v-else-if="activeTab === 'images'">
          <img v-for="(image, i) in product.images" :key="i" :src="image" style="max-width: 200px" />
        </div>
      </template>
    </Tabs>

    <div>
      <button @click="goToEdit">Modifier</button>
      <ConfirmModal>
        <template #trigger="{ open }">
          <button @click="open">Supprimer</button>
        </template>
        <template #content="{ close, confirm, isProcessing }">
          <p>Voulez-vous vraiment supprimer "{{ product.title }}" ?</p>
          <button :disabled="isProcessing" @click="confirm(async () => {
            await productStore.removeProduct(props.id)
            router.push({ name: 'products' })
          })">
            {{ isProcessing ? 'Suppression...' : 'Confirmer' }}
          </button>
          <button @click="close">Annuler</button>
        </template>
      </ConfirmModal>
    </div>
  </div>
</template>
