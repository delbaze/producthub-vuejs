<script setup lang="ts">
import { confirmModalKey } from '@/composables/useConfirmModalContext';
import { provide, readonly, ref } from 'vue';

const isOpen = ref(false);
const isProcessing = ref(false)
const errorModal = ref<string | null>(null);

function open() {
    isOpen.value = true
}

function close() {
    isOpen.value = false
}

async function confirm(action: () => Promise<void>): Promise<void> {
    isProcessing.value = true
    try {
        await action()
        close()
    } catch (err) {
        console.error(err)
        errorModal.value = "Il y a eu une erreur"
    } finally {
        isProcessing.value = false
    }
}


provide(confirmModalKey, { isOpen: readonly(isOpen), isProcessing: readonly(isProcessing), open, close, confirm })
</script>

<template>
    <slot name="trigger" :open="open"></slot>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-content">
            <p>{{ errorModal }}</p>
            <slot name="content" :close="close" :confirm="confirm" :is-processing="isProcessing"></slot>
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