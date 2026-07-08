<!-- src/components/LikeButton.vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'


defineProps<{
    productTitle: string
}>()

const emit = defineEmits<{
    'like-changed': [total: number]
}>()

const likeCount = ref(0)
const isVeryLiked = computed(() => likeCount.value >= 5)
// const isVeryLiked = ref(false)

function handleClick(): void {
    likeCount.value++
    emit('like-changed', likeCount.value)
    // isVeryLiked.value = likeCount.value >= 5
}
</script>

<template>
    <div>
        <p>{{ productTitle }} - {{ likeCount }} like(s)</p>
        <button :class="{ 'very-liked': isVeryLiked, 'not-liked': !isVeryLiked }" @click="handleClick">J'aime</button>
        <!-- <button class="very-liked" @click="handleClick">J'aime</button> -->
    </div>
</template>

<style scoped>
.very-liked {
    background-color: green;
}

.not-liked {
    background-color: red;
}
</style>
