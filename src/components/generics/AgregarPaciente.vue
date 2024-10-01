
<template>
  <div class="container-dialog">
    <Dialog ref="agregarPacienteDialog" :visible.sync="visible" @update:visible="cerrarModal" style="width: 90%;">
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
        <Button label="Guardar" class="p-button-redondeado p-button-success" @click="agregarPaciente" />
        <Button label="Cancelar" class="p-button-rounded p-button-danger" @click="cerrarModalAgregar" />
      </div>
    </Dialog>
  </div>

  <!-- Diálogo de mensajes -->
  <Dialog
      :dismissableMask="true"
      v-model:visible="dialog_msg_visble"
      :draggable="true"
      modal
      :style="{ width: '50rem' }"
    >
      <div style="text-align: center">
        <p class="m-0">{{ dialog_msg_text }}</p>
      </div>
      <template #footer>
        <Button
          label="Ok"
          autofocus
          @click="dialog_msg_visble = false"
        />
      </template>
    </Dialog>
</template>
<script setup>
import { ref, computed, onMounted, defineProps, watch, watchEffect} from 'vue';
import Dropdown from 'primevue/dropdown';
import  Dialog  from 'primevue/dialog';
import  InputText  from 'primevue/inputtext';
import  Button  from 'primevue/button';
import * as api from '../../helpers/api'
const { visible } = defineProps(['visible']);
const emits = defineEmits(['update:visible']);

const tipoSangre = ref([
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'O', value: 'O' },
  { label: 'AB', value: 'AB' },
]);

const dialog_msg_visble = ref(false);
const dialog_msg_text = ref("");

const mostrarModalAgregar = ref(false);

function cerrarModalAgregar() {
  emits('update:visible', false);
}


const campos = [
  { label: 'Nombre:', field: 'name', type: 'text' },
  { label: 'Apellido:', field: 'last_name', type: 'text' },
  { label: 'Dirección:', field: 'address', type: 'text' },
  { label: 'Departamento:', field: 'location', type: 'text' },
  { label: 'Ciudad:', field: 'province', type: 'text' },
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
const pacientes = ref([]);
const pacienteSeleccionado = ref({
      name: '',
      last_name:'',
      address:'',
      location:'',
      province:'',
      cell_phone:'',
      mail:'',
      birthdate:'',
      blood_type:'',
      rh:'',
      coverage:'',
      date:'',
      cod_post:'',
      nationalid:'',
      telephone:'',
      type_of_do:'',
      no_of_doc:'',
      sex:'',
      est_civil:'',
      occupation:'',
      type_of_debt:'',
      cod_deudorcod_plan:'',
      nro_affilia:'',
      primera_vi:'',
      cuit:'',
      condition:'',
      notes:'',
});


const set_dialog = (texto) => {
  dialog_msg_text.value = texto;
  dialog_msg_visble.value = true;
};


watchEffect(() => {
  mostrarModalAgregar.value = visible;
});


function abrirModalAgregar() {
  mostrarModalAgregar.value = true;
}


async function agregarPaciente() {
  try {
    for (const key in pacienteSeleccionado.value) {
      if (!pacienteSeleccionado.value[key]) {
        pacienteSeleccionado.value[key] = "";
      }
    }
    const res = await api.createPatients(pacienteSeleccionado.value);
    console.log(res, "res");
    pacienteSeleccionado.value = {
      name: '',
      last_name:'',
      address:'',
      location:'',
      province:'',
      cell_phone:'',
      mail:'',
      birthdate:'',
      blood_type:'',
      rh:'',
      coverage:'',
      date:'',
      cod_post:'',
      nationalid:'',
      telephone:'',
      type_of_do:'',
      no_of_doc:'',
      sex:'',
      est_civil:'',
      occupation:'',
      type_of_debt:'',
      cod_deudorcod_plan:'',
      nro_affilia:'',
      primera_vi:'',
      cuit:'',
      condition:'',
      notes:'',
    };
    cerrarModalAgregar();
    set_dialog("Paciente creado: " + res.status);
  } catch (error) {
    console.log(error, "error en la petición");
    set_dialog("Paciente error: " + error.status);
  }
}

const rh = ref(["+", "-"]);
const sexo = ref(["M", "F"]);




</script>

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
    width: 100%;
    max-width: 800px; 
    margin: 0 auto; 
    padding: 0 20px; 
  }

  .row {
    display: flex;
    flex-wrap: wrap; 
    margin: 0 -10px; 
  }

  .column {
    flex: 1;
    padding: 0 10px;
    margin-bottom: 20px; 
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

  @media (max-width: 768px) {
    
    .column {
      flex: 1 100%; 
      padding: 0; 
    }
  }
</style>