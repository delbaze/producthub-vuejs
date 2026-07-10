<script setup lang="ts">
import { ref, provide, readonly, watch } from 'vue'
import { tabsKey } from '@/composables/useTabsContext'
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{ defaultTab: string }>()

const route = useRoute()
const router = useRouter()
const activeTab = ref((route.query.tab as string) ?? props.defaultTab) // ?tab=


function selectTab(tabId: string): void {
    activeTab.value = tabId
    router.push({ query: { ...route.query, tab: tabId } })
}


watch(() => route.query.tab, (newTab) => {
    if (typeof newTab === 'string') {
        activeTab.value = newTab
    }
})
provide(tabsKey, {
    activeTab: readonly(activeTab),
    selectTab
})
</script>

<template>
    <div class="tabs">
        <div class="tabs-nav">
            <slot></slot>
        </div>
        <Transition name="fade" mode="out-in">
            <div :key="activeTab" class="tabs-content">
                <slot name="content" :active-tab="activeTab"></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.tabs-nav {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>