<script setup lang="ts">
import { fetchCategories, createProduct, updateProduct, fetchProductById } from '@/services/productService'
import type { Category } from '@/types/Category'
import type { ProductFormData } from '@/types/ProductForm'
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ id?: string }>()
const router = useRouter()

const isEditMode = computed(() => props.id !== undefined)

const categories = ref<Category[]>([])

const form = ref<ProductFormData>({
    title: '',
    price: null,
    description: '',
    categoryId: null,
    images: ['']
})

const error = ref<string | null>(null)
const successMessage = ref<string | null>('')


async function loadForm(): Promise<void> {
  if (props.id) {
    const existingProduct = await fetchProductById(props.id)
    form.value = {
      title: existingProduct.title,
      price: existingProduct.price,
      description: existingProduct.description,
      categoryId: existingProduct.category.id,
      images: existingProduct.images
    }
  } else {
    form.value = {
      title: '',
      price: null,
      description: '',
      categoryId: null,
      images: ['']
    }
  }
}

onMounted(async () => {
  categories.value = await fetchCategories()
  await loadForm()
})

watch(() => props.id, loadForm)

async function handleSubmit(): Promise<void> {
    error.value = null
    successMessage.value = ''

    if (form.value.categoryId === null || form.value.price === null) {
        error.value = 'Merci de remplir tous les champs'
        return
    }

    try {
        if (isEditMode.value && props.id) {
            await updateProduct(props.id, form.value)
            successMessage.value = 'Produit mis à jour avec succès'
            router.push({ name: 'product-view', params: { id: props.id } })
        } else {
            const newProduct = await createProduct(form.value)
            console.log('produit créé :', newProduct)
            successMessage.value = 'Produit créé avec succès'
            router.push({ name: 'products' })
        }
    } catch (err) {
        console.log(err)
        error.value = err instanceof Error
            ? err.message
            : `Une erreur est survenue lors de ${isEditMode.value ? 'la mise à jour' : 'la création'} du produit`
    }
}

function addImageField(): void {
    form.value.images.push('')
}

function removeImageField(index: number): void {
    form.value.images.splice(index, 1)
}
</script>

<template>
    <div>
        <h1>{{ isEditMode ? 'Modification de produit' : 'Création de produit' }}</h1>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <form @submit.prevent="handleSubmit">
            <label>
                Catégorie
                <select v-model="form.categoryId">
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </label>

            <label>
                Titre
                <input v-model="form.title" />
            </label>

            <label>
                Prix
                <input v-model.number="form.price" type="number" />
            </label>

            <label>
                Description
                <textarea v-model="form.description"></textarea>
            </label>

            <fieldset>
                <legend>Images</legend>
                <div v-for="(_, index) in form.images" :key="index">
                    <input v-model="form.images[index]" type="url" placeholder="https://...." />
                    <button type="button" v-if="form.images.length > 1" @click="removeImageField(index)">-</button>
                </div>
                <button type="button" @click="addImageField">+ Ajouter une image</button>
            </fieldset>

            <button>{{ isEditMode ? 'Mettre à jour' : 'Valider' }}</button>
        </form>
    </div>
</template>