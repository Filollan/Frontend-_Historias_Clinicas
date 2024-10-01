<script setup>
import { ref, computed, onMounted, defineProps, watch, watchEffect} from 'vue';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import * as api from '../../helpers/api';

const { pacienteSeleccionado, visible, emits, } = defineProps(['pacienteSeleccionado', 'visible', 'emits',]);
const emit = defineEmits();

const campos = [
  { label: 'Fecha:', field: 'date', type: 'date' },
  {label:'Nombre Genérico del medicamento',field:'medicine', type:'text'},
  {label:'Dosis',field:'doce', type:'number'},
  {label:'Forma Farmacéutica',field:'pharmaceutical_form', type:'text'},
  {label:'Instrucciones',field:'instructions', type:'text'},
  {label:'Duración del tratamiento',field:'Treatment_duration', type:'text'},
  

];

</script>


<template>



</template>

<style scoped>


</style>