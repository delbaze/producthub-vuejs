<!-- src/views/admin/CategoryListView.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import AdminLayout from '@/components/AdminLayout.vue'

const categoryStore = useCategoryStore()
const router = useRouter()

onMounted(() => {
  if (!categoryStore.hasLoaded) {
    categoryStore.loadCategories()
  }
})

function goToEdit(id: number): void {
  router.push({ name: 'admin-category-edit', params: { id } })
}

async function handleDelete(id: number): Promise<void> {
  if (confirm('Supprimer cette catégorie ?')) {
    await categoryStore.removeCategory(String(id))
  }
}
</script>

<template>
  <AdminLayout title="Gestion des catégories">
    <template #actions>
      <router-link :to="{ name: 'admin-category-create' }">
        <button>+ Nouvelle catégorie</button>
      </router-link>
    </template>
    <!-- <template #default> -->
      <p v-if="categoryStore.isLoading">Chargement...</p>
      <p v-else-if="categoryStore.error">{{ categoryStore.error }}</p>
      <table v-else>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categoryStore.categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>
              <button @click="goToEdit(category.id)">Modifier</button>
              <button @click="handleDelete(category.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- </template> -->
  </AdminLayout>
</template>