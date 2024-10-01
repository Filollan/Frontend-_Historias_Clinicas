import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import axios from 'axios';


import inicio from './pages/inicio.vue';
import Table from './pages/Table.vue';
import TableConsultation from './components/TableConsultation.vue'

const app = createApp(App);


app.config.globalProperties.$http = axios;


const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path:'/TableConsultation',
      component: TableConsultation
    },
    {
      path: '/table',
      component: Table
    },
    {
      path: '/inicio',
      component: inicio
    }
    
  ]
});

app.use(router);
app.use(PrimeVue);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Dialog', Dialog);
app.component('Textarea ',Textarea )
app.mount('#app');
