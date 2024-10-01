<script setup>
import { ref, computed, onMounted, defineProps, watch, watchEffect} from 'vue';
import Dropdown from 'primevue/dropdown';
import  Dialog  from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import  Button  from 'primevue/button';
import * as api from '../../helpers/api'


const tipoSangre = ref([
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'O', value: 'O' },
  { label: 'AB', value: 'AB' },
]);

const { visible } = defineProps(['visible']);
const emits = defineEmits(['update:visible']);
const mostrarModalAgregar = ref(false);

function cerrarModal() {
  emits('update:visible', false);
}


const pacientes = ref([]);




async function cargarDatosPaciente(id) {
  try {
    const response = await api.getPacientePorId(id);
    pacienteSeleccionado = { ...pacienteSeleccionado, ...response.data };
  } catch (error) {
    console.error('Error al cargar datos del paciente:', error);
  }
}

async function abrirModal(id) {
  await cargarDatosPaciente(id);
  emits('update:visible', true);
}


const campos = [
  { label: 'Nombre:', field: 'name', type: 'text' },
  { label: 'Apellido:', field: 'last_name', type: 'text' },
  { label: 'Dirección:', field: 'address', type: 'text' },
  { label: 'Localidad:', field: 'location', type: 'text' },
  { label: 'Provincia:', field: 'province', type: 'text' },
  { label: 'Teléfono:', field: 'cell_phone', type: 'number' },
  { label: 'Correo:', field: 'mail', type: 'email'  },
  { label: 'Fecha De Nacimiento:', field: 'birthdate', type: 'date' },
  { label: 'Edad:', field: 'date', type: 'number' },
  { label: 'Tipo De Sangre:', field: 'blood_type', type: 'dropdown', options: tipoSangre.value },
  { label: 'Rh:', field: 'rh', type: 'text' },
  { label: 'Cobertura:', field: 'coverage', type: 'text' },
  { label: 'Código Postal:', field: 'cod_post', type: 'text' },
  { label: 'Nacionalidad:', field: 'nationalid', type: 'text' },
  { label: 'Teléfono Alternativo:', field: 'telephone', type: 'text' },
  { label: 'Tipo De Documento:', field: 'type_of_do', type: 'text' },
  { label: 'Número de Documento:', field: 'no_of_doc', type: 'text' },
  { label: 'Sexo:', field: 'sex', type: 'text' },
  { label: 'Estado Civil:', field: 'est_civil', type: 'text' },
  { label: 'Ocupación:', field: 'occupation', type: 'text' },
  { label: 'Tipo de Deuda:', field: 'type_of_debt', type: 'text' },
  { label: 'Código Deudor o Plan:', field: 'cod_deudorcod_plan', type: 'text' },
  { label: 'Número de Afiliación:', field: 'nro_affilia', type: 'text' },
  { label: 'Primera Visita:', field: 'primera_vi', type: 'date' },
  { label: 'CUIT:', field: 'cuit', type: 'text' },
  { label: 'Condición:', field: 'condition', type: 'text' },
  { label: 'Notas:', field: 'notes', type: 'text' },
];



async function modificarPaciente(event) {
  try {
    const index = pacientes.value.findIndex(e => e.id == pacienteSeleccionado.value.id);

    const camposPermitidos = [
      'id',
      'name',
      'last_name',
      'address',
      'location',
      'province',
      'cell_phone',
      'mail',
      'birthdate',
      'blood_type',
      'rh',
      'coverage',
      'date',
      'cod_post',
      'nationalid',
      'telephone',
      'type_of_do',
      'no_of_doc',
      'sex',
      'est_civil',
      'occupation',
      'type_of_debt',
      'cod_deudorcod_plan',
      'nro_affilia',
      'primera_vi',
      'cuit',
      'condition',
      'notes'
    ];

    const updatedData = {};

    camposPermitidos.forEach((campo) => {
      updatedData[campo] = pacienteSeleccionado.value[campo] || '';
    });

    console.log(updatedData);

    const res = await api.updatePatient(updatedData.id, updatedData);
    await loadPatientes();
    console.log("pase");

    if (res.error === false) {
      cerrarModalAgregar();
      pacienteSeleccionado.value = Object.fromEntries(camposPermitidos.map(campo => [campo, '']));
      console.log(pacienteSeleccionado);
    } else {
      throw new Error('Error al modificar el paciente: ' + res);
    }
  } catch (error) {
    console.log(error.message, 'error al modificar');
    cerrarModalAgregar();
  }
}


</script>

<template>
    <div class="container-dialog">
      <Dialog ref="agregarPacienteDialog" :visible="visible" @update:visible="cerrarModal">
        <div class="row">
          <div class="column">
           
            <!-- Columna 1 -->
            <div v-for="field in campos.slice(0, Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
              <div>
                <label>{{ field.label }}</label>
                <template v-if="field.field === 'blood_type'">
                  <Dropdown :options="tipoSangre" :value="pacienteSeleccionado[field.field]" @onChange="handleDropdownChange(field.field)" optionLabel="label" optionValue="value" class="p-inputtext" />
                </template>
                <template v-else>
                  <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
                </template>
              </div>
            </div>
          </div>
  
          <div class="column">
            <!-- Columna 2 -->
            <div v-for="field in campos.slice(Math.ceil(campos.length / 3), 2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
              <div>
                <label>{{ field.label }}</label>
                <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
              </div>
            </div>
          </div>
  
          <div class="column">
            <!-- Columna 3 -->
            <div v-for="field in campos.slice(2 * Math.ceil(campos.length / 3))" :key="field.field" class="input-container">
              <div>
                <label>{{ field.label }}</label>
                <InputText :type="field.type" :modelValue="pacienteSeleccionado[field.field]" @update:modelValue="val => pacienteSeleccionado[field.field] = val" class="p-inputtext" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="dialog-button">
          <Button label="Guardar" class="p-button-redondeado p-button-success" @click="modificarPaciente" />
          <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cerrarModal" />
        </div>
      </Dialog>
    </div>
  </template>
  
  
  <style scoped>
    .p-dialog {
      width: 100%;
      max-width: none;
      background-color: #83B9FF;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
  
    .container-dialog {
      display: flex;
      flex-direction: column;
      width: 80%;
    }
  
    .row {
      display: flex;
    }
  
    .column {
      flex: 1;
      padding: 0 10px;
    }
  
    .input-container {
      margin-bottom: 20px;
    }
  
    .p-inputtext {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
  
    .dialog-button {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  </style>