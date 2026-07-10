<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchCurrentUser()
})
</script>

<template>
  <main>
    <Navbar />
    <router-view />
  </main>
</template>
