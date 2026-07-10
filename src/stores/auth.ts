import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser } from '@/types/User'
import type { RegisterFormData } from '@/types/RegisterForm'
import { login as loginRequest, fetchProfile, register as registerRequest } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('access_token'))
  const user = ref<AuthUser | null>(null)

  // const isAuthenticated = ref(!!token.value)
  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string): Promise<void> {
    const result = await loginRequest(email, password)
    token.value = result.access_token
    localStorage.setItem('access_token', result.access_token)
    user.value = await fetchProfile(result.access_token)
    
  }

  async function register(data: RegisterFormData): Promise<void> {
    await registerRequest(data)
    await login(data.email, data.password)
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
  }

  return { token, user, isAuthenticated, login, register, logout }
})