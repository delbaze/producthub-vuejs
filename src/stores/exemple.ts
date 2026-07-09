import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useExempleStore = defineStore("exemple", () => {
  const compteur = ref(0);

  const double = computed(() => compteur.value * 2);

  function incrementer(): void {
    console.log("test");
    compteur.value++;
  }

  return {
    compteur,
    double,
    incrementer,
  };
});
