<script setup lang="ts">
import { inject } from 'vue'
import { tabsKey } from '@/composables/useTabsContext'

const props = defineProps<{ id: string; label: string }>()

const tabsContext = inject(tabsKey)

if (!tabsContext) {
    throw new Error('<Tab> doit être utilisé à l\'intérieur de <Tabs>')
}
</script>

<template>
    <button :class="{ active: tabsContext.activeTab.value === id }" @click="tabsContext.selectTab(id)">
        {{ label }}
    </button>
</template>

<style scoped>
button.active {
    font-weight: bold;
    border-bottom: 2px solid black;
}
</style>