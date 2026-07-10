<template>
  <div class="admin-layout">
    <nav class="admin-nav">
      <router-link :to="{ name: 'admin-categories' }">Catégories</router-link>
    </nav>
    <router-view />
  </div>
</template>