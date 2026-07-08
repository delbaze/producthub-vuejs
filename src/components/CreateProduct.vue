<script setup lang="ts">

function handleSubmit() {
    console.log("je demande à valider le formulaire");
}
</script>

<template>
    <div>Ici il y aura la création d'un produit
        <form @submit.prevent="handleSubmit">
            <input />
            <button>Valider</button>
        </form>

    </div>
</template>