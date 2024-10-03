import { createRouter, createWebHistory } from 'vue-router';

import inicio from './components/inicio.vue'
import Table from './components/Table.vue';

const routes = [
  {
    path: '/inicio',
    component: inicio
  },
  {
    path: '/Table',
    component: Table
  },
  {
    path: '/TableConsultation',
    component: TableConsultation
  },
  {
    path: '/TableConsultation2',
    component: TableConsultation2
  },
 
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
