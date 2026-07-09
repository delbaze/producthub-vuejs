<script setup lang="ts">
import { fetchProducts, fetchProductsFilter } from '@/services/productService';
import type { Product } from '@/types/Product'
import { onMounted, ref, watch } from 'vue';
import ProductCard from '@/components/ProductCard.vue';

const products = ref<Product[]>([])

const isLoading = ref(true)
const searchQuery = ref('')
const error = ref<string | null>(null)

let debounceTimer: ReturnType<typeof setTimeout> | undefined


async function handleSearch(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
        const query = searchQuery.value.trim()
        products.value = query === ''
            ? await fetchProducts()
            : await fetchProductsFilter(query)
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
        isLoading.value = false
    }
}
async function loadProducts(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
        products.value = await fetchProducts()
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
        isLoading.value = false
    }
}

onMounted(() => loadProducts())

function handleReset(): void {
    searchQuery.value = ''
    loadProducts()
}

watch(searchQuery, (nouvelleValeur, ancienneValeur) => {
    console.log(`Recherche passée de ${ancienneValeur} à ${nouvelleValeur}`)
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        handleSearch()
    }, 1000)
})



</script>

<template>
    <!-- <CreateProduct /> -->
    <div class="search-bar">
        <!-- <input v-model="searchQuery" type="text" @input="handleInput" placeholder="Rechercher un produit..." /> -->
        <input v-model="searchQuery" type="text" placeholder="Rechercher un produit..." />
        <button @click="handleSearch">Rechercher</button>
        <button v-if="searchQuery" @click="handleReset">Réinitialiser</button>

    </div>

    <p v-if="isLoading">Chargement des produits ...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="products.length === 0">Aucun produit trouvé</p>
    <div v-else class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
</template>


<style scoped>
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
}

.search-bar {
    height: 3rem
}
</style>