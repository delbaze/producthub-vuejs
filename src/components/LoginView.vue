<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const error = ref<string | null>(null)

async function handleSubmit(): Promise<void> {
  error.value = null
  try {
    await authStore.login(email.value, password.value)
    const redirectTo = (route.query.redirect as string) ?? '/'
    router.push(redirectTo)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Email ou mot de passe incorrect.'
  }
}
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="handleSubmit">
      <label>
        Email
        <input v-model="email" type="email" required />
      </label>
      <label>
        Mot de passe
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Se connecter</button>
    </form>
    <p>
      Pas encore de compte ?
      <router-link :to="{ name: 'register' }">S'inscrire</router-link>
    </p>
  </div>
</template>