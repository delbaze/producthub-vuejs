<script setup lang="ts">
import { routes } from '@/router';
import { computed } from 'vue';

const navRoutes = computed(() => routes.filter(route => route.meta?.title))
</script>


<template>
    <nav>
        <router-link v-for="item in navRoutes" :key="item.name" :to="item">
            {{ item.meta?.title }}
        </router-link>
        <!-- <router-link :to="{ name: 'products' }">Produits</router-link>
        <router-link :to="{ name: 'product-create' }">Créer un produit</router-link> -->
    </nav>
</template>