<script setup lang="ts">
import { fetchCategories } from '@/services/productService';
import type { Category } from '@/types/Category';
import { onMounted, ref } from 'vue';


//? prévoir de récupérer (à quel moment ? ) les catégories ici et les afficher  (prévoir une interface/type Category)
//? dans une select (value de l'option = id de la catégorie)
//? une fois les categories affichées, prévoir les inputs pour créer un produit (créer une interface/type ProductFormData)

const categories = ref<Category[]>([])

function handleSubmit() {
    console.log("je demande à valider le formulaire");
}
onMounted(async () => {
    categories.value = await fetchCategories();
})
</script>

<template>
    <div>Ici il y aura la création d'un produit
        <form @submit.prevent="handleSubmit">
            <label>
                Catégorie
                <select>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}
                    </option>

                </select>
            </label>
            <input />
            <button>Valider</button>
        </form>

    </div>
</template>