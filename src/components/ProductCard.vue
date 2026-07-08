<script setup lang="ts">
import type { Product } from '@/types/Product';
import { ref } from 'vue';
// const product: Product = { title: "toto" }
defineProps<{ product: Product }>()
const emit = defineEmits<{ 'say-coucou': [productId: number], 'delete-prod': [productId: number] }>()
const isLoading = ref(false);
// const toto = "test";

// const state = ref({
//     products: [] as Product[],
//     isLoading: true,
//     searchQuery: ''
// })

const demo = ref<Product[]>([{
    id: 1,
    title: 'Produit de test 0',
    price: 29,
    description: 'Juste pour vérifier que ProductCard fonctionne',
    images: ['https://placehold.co/300'],
    category: { id: 1, name: 'Test' }
},
{
    id: 2,
    title: 'Produit de test 1',
    price: 29,
    description: 'Juste pour vérifier que ProductCard fonctionne',
    images: ['https://placehold.co/300'],
    category: { id: 1, name: 'Test' }
}])
</script>

<template>
    <h1>{{ product.title }}</h1>
    <h2 v-if="isLoading">Chargement en cours</h2>
    <!-- <h2 v-else-if="isLoading">Chargement en cours</h2> -->

    <ul>
        <!-- <li v-for="(p, index) in demo" :key="index">{{ p.title }}</li> -->
        <li v-for="p in demo" :key="p.title">{{ p.title }}</li>
    </ul>
    <button @click="emit('say-coucou', product.id)">Dire coucou</button>
    <button @click="emit('delete-prod', product.id)">Supprimer le produit</button>
</template>