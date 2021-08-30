import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';

import Teste from './pages/Teste.vue';
import Map from './pages/Map.vue';

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
    path: '/contribuicao',
    component: Map,
  },
  {
    path: '/home',
    component: Teste,
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
    path: '/:notFound(.*)',
    redirect: '/404',
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  // Chamado pelo router, sempre que a página muda
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
});
