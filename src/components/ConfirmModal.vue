<script setup lang="ts">
import { confirmModalKey } from '@/composables/useConfirmModalContext';
import { provide, readonly, ref } from 'vue';

const isOpen = ref(false);

function open() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
}

provide(confirmModalKey, { isOpen: readonly(isOpen), open, close })
</script>

<template>
    <slot name="trigger" :open="open"></slot>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <slot name="content" :close="close"></slot>
        </div>
    </div>
</template>


<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    min-width: 300px;
}
</style>