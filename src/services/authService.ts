// src/services/authService.ts
import type { AuthUser } from '@/types/User'
import type { RegisterFormData } from '@/types/RegisterForm'

interface LoginResponse {
  access_token: string
  refresh_token: string
}

const BASE_URL = 'https://api.escuelajs.co/api/v1'


export async function register(data: RegisterFormData): Promise<AuthUser> {
  const response = await fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Impossible de créer le compte')
  return response.json()
}

























export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!response.ok) throw new Error('Identifiants invalides')
  return response.json()
}

export async function fetchProfile(token: string): Promise<AuthUser> {
  const response = await fetch(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) throw new Error('Session invalide')
  return response.json()
}
