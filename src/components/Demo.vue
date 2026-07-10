<script setup lang="ts">

const props = defineProps<{title: string}>();
</script>
<template>
    <article>
        <h3>{{ props.title }}</h3>
        <slot name="actions"></slot>
        <p>Démarquation</p>
        <slot name="actions2"></slot>
    </article>
</template>