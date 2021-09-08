import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

import Home from '../pages/Home.vue';
import Category from '../pages/Category.vue';
import Shapefile from '../pages/Shapefile.vue';

import NotFound from '../pages/NotFound.vue';

import Teste from '../pages/Teste.vue';
// import Map from '../pages/Map.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register',
    path: '/cadastro',
    component: Register,
  },
  {
    name: 'Categorias',
    path: '/categorias',
    component: Category,
  },
  {
    name: 'Shapefiles',
    path: '/shapefiles',
    component: Shapefile,
  },
  {
    name: 'Test',
    path: '/teste',
    component: Teste,
  },
  {
    name: 'NotFound',
    path: '/404',
    component: NotFound,
  },
  {
    name: 'CatchAll',
    path: '/:notFound(.*)',
    redirect: '/404',
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  // Chamado pelo router, sempre que a página muda
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      left: 0,
      top: 0,
    };
  },
});
