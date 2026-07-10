<!-- src/views/admin/CategoryListView.vue -->
<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import AdminLayout from '@/components/AdminLayout.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { confirmModalKey } from '@/composables/useConfirmModalContext'

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

async function handleDelete(categoryId: number, close: () => void): Promise<void> {
  await categoryStore.removeCategory(String(categoryId));
  close();
}

// const injections = inject(confirmModalKey)
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
            <!-- <button @click="handleDelete(category.id)">Supprimer</button> -->
            <ConfirmModal>
              <template #trigger="{ open }">
                <button @click="open">Supprimer</button>
              </template>
              <template #content="{ close }">
                <p>Voulez vous vraiment supprimer "{{ category.name }}"</p>
                <button @click="handleDelete(category.id, close)">Confirmer</button>
                <button @click="close">Annuler</button>
              </template>
            </ConfirmModal>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- </template> -->
  </AdminLayout>
</template>