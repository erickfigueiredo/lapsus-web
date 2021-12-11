import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import Category from '../pages/Category.vue';
import Institution from '../pages/Institution.vue';
import InstitutionDetails from '../pages/InstitutionDetails.vue';
import Message from '../pages/Message.vue';
import NewMessage from '../pages/NewMessage.vue';
import Shapefile from '../pages/Shapefile.vue';
import Contribute from '../pages/Contribute.vue';
import NotFound from '../pages/NotFound.vue';

import Teste2 from '../pages/Teste2.vue';

const routes = [
  {
    name: 'Home',
    path: '/',
    alias: '/home',
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
    name: 'Mensagens',
    path: '/mensagens',
    component: Message,
  },
  {
    name: 'Enviar mensagem',
    path: '/mensagens/nova',
    component: NewMessage,
  },
  {
    name: 'Instituições',
    path: '/instituicoes',
    component: Institution,
  },
  {
    name: 'Instituição',
    path: '/instituicoes/:institutionId',
    component: InstitutionDetails,
  },
  {
    name: 'Shapefiles',
    path: '/shapefiles',
    component: Shapefile,
  },
  {
    name: 'Contribuir',
    path: '/contribuir',
    component: Contribute,
  },
  {
    name: 'Test',
    path: '/teste',
    component: Teste2,
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
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0, left: 0 };
  },
});
