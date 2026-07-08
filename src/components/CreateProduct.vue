<script setup lang="ts">
import { fetchCategories, createProduct } from '@/services/productService'
import type { Category } from '@/types/Category'
import type { ProductFormData } from '@/types/ProductForm'
import { onMounted, ref } from 'vue'

const categories = ref<Category[]>([])

const form = ref<ProductFormData>({
    title: '',
    price: null,
    description: '',
    categoryId: null,
    images: ['', '']
})

const error = ref<string | null>(null);
const successMessage = ref<string | null>('');

async function handleSubmit(): Promise<void> {
    error.value = null
    successMessage.value = ''
    if (form.value.categoryId === null || form.value.price === null) {
        console.log('Merci de remplir tous les champs')
        return
    }
    try {
        const newProduct = await createProduct(form.value)
        console.log('produit créé :', newProduct)
        successMessage.value = "Produit créé avec succès";
    } catch (err) {
        console.log(err)
        error.value = err instanceof Error
            ? err.message
            : 'Une erreur est survenue lors de la création du produit'
    }
}

function addImageField(): void {
    form.value.images.push('');
}
function removeImageFIeld(index: number): void {
    form.value.images.splice(index, 1)
}
onMounted(async () => {
    categories.value = await fetchCategories()
})
</script>

<template>
    <div>
        <h1>Création de produit</h1>
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

            <!-- <label>
                Image (URL)
                <input v-model="form.images[0]" type="text" />
            </label> -->

            <fieldset>
                <legend>Images</legend>
                <div v-for="(image, index) in form.images" :key="index">
                    <input v-model="form.images[index]" type="url" placeholder="https://...." />
                    <button type="button" v-if="form.images.length > 1" @click="removeImageFIeld(index)">-</button>
                </div>
                <button type="button" @click="addImageField">+ Ajouter une image</button>

            </fieldset>

            <button>Valider</button>
        </form>
    </div>
</template>