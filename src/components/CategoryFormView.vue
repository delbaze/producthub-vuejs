<!-- src/views/admin/CategoryFormView.vue -->
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import type { CategoryFormData } from '@/types/CategoryForm'
import AdminLayout from '@/components/AdminLayout.vue'

const props = defineProps<{ id?: string }>()
const router = useRouter()
const categoryStore = useCategoryStore()

const isEditMode = computed(() => props.id !== undefined)

const form = ref<CategoryFormData>({
  name: '',
  image: 'https://placehold.co/300'
})

const error = ref<string | null>(null)

function loadForm(): void {
  if (props.id) {
    const existing = categoryStore.categories.find(c => c.id === Number(props.id))
    if (existing) {
      form.value = { name: existing.name, image: existing.image ?? 'https://placehold.co/300' }
    }
  } else {
    form.value = { name: '', image: 'https://placehold.co/300' }
  }
}

onMounted(async () => {
  if (!categoryStore.hasLoaded) {
    await categoryStore.loadCategories()
  }
  loadForm()
})

watch(() => props.id, loadForm)

async function handleSubmit(): Promise<void> {
  error.value = null
  try {
    if (isEditMode.value && props.id) {
      await categoryStore.editCategory(props.id, form.value)
    } else {
      await categoryStore.addCategory(form.value)
    }
    router.push({ name: 'admin-categories' })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
  }
}
</script>

<template>
  <AdminLayout :title="isEditMode ? 'Modifier la catégorie' : 'Nouvelle catégorie'">
    <p v-if="error" class="error">{{ error }}</p>
    <form @submit.prevent="handleSubmit">
      <label>
        Nom
        <input v-model="form.name" required />
      </label>
      <label>
        Image (URL)
        <input v-model="form.image" type="url" required />
      </label>
      <button type="submit">{{ isEditMode ? 'Mettre à jour' : 'Créer' }}</button>
    </form>
  </AdminLayout>
</template>