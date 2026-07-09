<script setup lang="ts">
import { routes } from '@/router';
import { useExempleStore } from '@/stores/exemple';
import { computed } from 'vue';

const navRoutes = computed(() => routes.filter(route => route.meta?.title))

const exempleStore = useExempleStore();

</script>


<template>
    <nav>
        <router-link v-for="item in navRoutes" :key="item.name" :to="item">
            {{ item.meta?.title }}
        </router-link>
        <div>
            {{ exempleStore.compteur }}
        </div>
        <div>
            {{ exempleStore.double }}
        </div>
        <button @click="exempleStore.incrementer">Incrémenter</button>
        <!-- <router-link :to="{ name: 'products' }">Produits</router-link>
        <router-link :to="{ name: 'product-create' }">Créer un produit</router-link> -->
    </nav>
</template>