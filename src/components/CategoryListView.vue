<script setup lang="ts">
import { ref } from 'vue';
import Demo from './Demo.vue';

const title = ref("Mon titre")
</script>
<template>
    <div>
        Ici il y aura les catégories
        <Demo :title="title">
            <template #actions>
                <button>Coucou</button>
            </template>
            <template #actions2>
                <button>Hello</button>
            </template>
        </Demo>
    </div>
</template>