<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Product } from '@/types/Product'
import { fetchProductById, deleteProduct } from '@/services/productService'

const props = defineProps<{ id: string }>()
const router = useRouter()
const product = ref<Product | null>(null)
const isDeleting = ref(false)

onMounted(async () => {
  product.value = await fetchProductById(props.id)
})

async function confirmDelete(): Promise<void> {
  isDeleting.value = true
  await deleteProduct(props.id)
  router.push({ name: 'products' })
}

function cancel(): void {
  router.push({ name: 'product-view', params: { id: props.id } })
}
</script>

<template>
  <div v-if="product">
    <p>Voulez-vous vraiment supprimer "{{ product.title }}" ?</p>
    <button @click="confirmDelete" :disabled="isDeleting">Confirmer</button>
    <button @click="cancel">Annuler</button>

    <!-- <ButtonLink to="/products" variant="">Annuler</ButtonLink> -->
  </div>
</template>