import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from './pages/Login.vue';

const routes = [
  {
    path: '/',
    component: '',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/cadastro',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)',
    component: '',
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
