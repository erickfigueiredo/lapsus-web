import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Teste from './pages/Teste.vue';

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
    component: Register,
  },
  {
    path: '/teste',
    component: Teste,
  },
  {
    path: '/404',
    component: Teste,
    // Passar a página errada para esta rota
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
