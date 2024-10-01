<template>
  <div v-if="props.isActive" class="spinner-container">
    <ProgressSpinner style="color:#ff5722!important;stroke:#ff5722!important" aria-label="Custom ProgressSpinner"/>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import ProgressSpinner from "primevue/progressspinner";

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true,
    default: false
  },
});
</script>

<style scoped>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Asegura que esté por encima de otros elementos */
}
</style>
