<script setup lang="ts">
import type { Product } from '@/types/Product';
import LikeButton from '@/components/LikeButton.vue'
// import { useRouter } from 'vue-router';
// const router = useRouter()

const props = defineProps<{ product: Product }>()

function handleLikeChanged(total: number): void {
    console.log(`${props.product.title} - nouveau total : ${total}`)
}

</script>


<template>
    <article class="product-card">
        <img :src="product.images[0]" :alt="product.title" />
        <h3>{{ product.title }}</h3>
        <p class="price">{{ product.price }} €</p>
        <span v-if="product.stock === 0" class="badge">Rupture de stock</span>
        <LikeButton :productTitle="product.title" @like-changed="handleLikeChanged" />
        <router-link :to="{ name: 'product-view', params: { id: product.id } }">Voir le détail</router-link>
        <!-- <router-link :to="{ name: 'product-view', params: { id: product.id } }">Voir le détail</router-link> -->
        <!-- <button type="button" @click="handleClick">Test</button> -->
    </article>
</template>


<style scoped>
.product-card {
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    padding: 1rem;
}

.product-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 4px;
}

.price {
    font-weight: bold;
}

.out-of-stock {
    opacity: 0.5;
}

.badge {
    background: #d33;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
}
</style>