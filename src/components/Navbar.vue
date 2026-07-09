<script setup lang="ts">
import { routes } from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useExempleStore } from '@/stores/exemple';
import { computed } from 'vue';

const navRoutes = computed(() => routes.filter(route => route.meta?.title))

const exempleStore = useExempleStore();
const authStore = useAuthStore()
function handleLogout(): void {
    authStore.logout()
}
</script>


<template>
    <nav>
        <router-link v-for="item in navRoutes" :key="item.name" :to="item">
            {{ item.meta?.title }}
        </router-link>
        <!-- <router-link :to="{ name: 'products' }">Produits</router-link>
        <router-link :to="{ name: 'product-create' }">Créer un produit</router-link> -->
        <template v-if="authStore.isAuthenticated">
            <span>Connecté : {{ authStore.user?.name }}</span>
            <button @click="handleLogout">Se déconnecter</button>
        </template>
        <template v-else>
            <router-link :to="{ name: 'login' }">Se connecter</router-link>
            <router-link :to="{ name: 'register' }">S'inscrire</router-link>
        </template>
    </nav>
</template>