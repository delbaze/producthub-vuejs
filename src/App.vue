<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import type { Product } from '@/types/Product';
import { ref } from 'vue';



const testProduct: Product = {
  id: 1,
  title: 'Produit de test',
  price: 29,
  description: 'Juste pour vérifier que ProductCard fonctionne',
  images: ['https://placehold.co/300'],
  category: { id: 1, name: 'Test' }
}
let toto = ref("test");


function coucou(productId: number) {
  console.log(`coucou depuis le produit id : ${productId}`);
  console.log("toto value", toto.value);
  toto.value = "coucou";
}

function deleteProduct(productId: number) {
  console.log(`je voudrais supprimé le produit id : ${productId}`)
}

</script>

<template>
  <ProductCard :product="testProduct" @say-coucou="coucou" @delete-prod="deleteProduct" />
  <p v-once>{{ toto.toUpperCase() }}</p>
  <p>{{ toto.toUpperCase() }}</p>
</template>
