<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { RegisterFormData } from '@/types/RegisterForm'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = ref<RegisterFormData>({
  name: '',
  email: '',
  password: '',
  avatar: 'https://api.lorem.space/image/face?w=640&h=480'
})
const error = ref<string | null>(null)

async function handleSubmit(): Promise<void> {
  error.value = null
  try {
    await authStore.register(form.value)
    router.push({ name: 'products' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Cet email est peut-être déjà utilisé.'
  }
}
</script>

<template>
  <div>
    <h1>Créer un compte</h1>
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="handleSubmit">
      <label>
        Nom
        <input v-model="form.name" required />
      </label>
      <label>
        Email
        <input v-model="form.email" type="email" required />
      </label>
      <label>
        Mot de passe
        <input v-model="form.password" type="password" required minlength="4" />
      </label>
      <button type="submit">Créer mon compte</button>
    </form>
     <p>
      Déjà un compte? Connectez vous
      <router-link :to="{ name: 'login' }">Se connecter</router-link>
    </p>
  </div>
</template>