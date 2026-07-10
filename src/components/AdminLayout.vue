<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="admin-page">
    <header class="admin-page-header">
      <h1>{{ title }}</h1>
      <slot name="actions"></slot>
    </header>
    <slot></slot>
  </div>
</template>

<style scoped>
.admin-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>