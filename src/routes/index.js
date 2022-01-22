import { createRouter, createWebHistory } from 'vue-router';

// Importação das Páginas
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
import AssessContribution from '../pages/AssessContribution.vue';
import Profile from '../pages/Profile.vue';
import Settings from '../pages/Settings.vue';
import NotFound from '../pages/NotFound.vue';

import Teste2 from '../pages/Teste2.vue';
import Teste from '../pages/Teste.vue';

import store from '../stores';

const routes = [
  {
    name: 'Home',
    path: '/',
    alias: '/home',
    meta: {
      requireAuth: true,
      allowUsers: ['A', 'T', 'M', 'R'],
    },
    component: Home,
  },
  {
    name: 'map',
    path: '/map',
    meta: {
      requireAuth: true,
      allowUsers: [],
    },
    component: Teste,
  },
  {
    name: 'Login',
    path: '/login',
    meta: { requireAuth: false },
    component: Login,
  },
  {
    name: 'Cadastrar',
    path: '/cadastro',
    meta: { requireAuth: false },
    component: Register,
  },
  {
    name: 'Categorias',
    path: '/categorias',
    meta: {
      requireAuth: true,
      allowUsers: ['A', 'T'],
    },
    component: Category,
  },
  {
    name: 'Mensagens',
    path: '/mensagens',
    meta: {
      requireAuth: true,
      allowUsers: ['A', 'T'],
    },
    component: Message,
  },
  {
    name: 'Enviar mensagem',
    path: '/mensagens/nova',
    meta: {
      requireAuth: false,
      dennyUsers: ['A', 'T'],
    },
    component: NewMessage,
  },
  {
    name: 'Instituições',
    path: '/instituicoes',
    meta: {
      requireAuth: true,
      allowUsers: ['A'],
    },
    component: Institution,
  },
  {
    name: 'Instituição',
    path: '/instituicoes/:institutionId',
    meta: {
      requireAuth: true,
      allowUsers: ['A'],
    },
    component: InstitutionDetails,
  },
  {
    name: 'Shapefiles',
    path: '/shapefiles',
    meta: {
      requireAuth: true,
      allowUsers: ['A'],
    },
    component: Shapefile,
  },
  {
    name: 'Contribuir',
    path: '/contribuicao',
    meta: {
      requireAuth: false,
    },
    component: Contribute,
  },
  {
    name: 'Avaliar Contribuições',
    path: '/contribuicao/avaliar',
    meta: {
      requireAuth: true,
      allowUsers: ['A', 'T', 'M'],
    },
    component: AssessContribution,
  },
  {
    name: 'Perfil',
    path: '/perfil',
    meta: {
      requireAuth: true,
      allowUsers: ['A', 'T', 'M', 'R'],
    },
    component: Profile,
  },
  {
    name: 'Configurações',
    path: '/configuracoes',
    meta: {
      requireAuth: true,
      allowUsers: ['A'],
    },
    component: Settings,
  },
  {
    name: 'Test',
    path: '/teste',
    meta: {
      requireAuth: true,
      allowUsers: [],
    },
    component: Teste2,
  },
  {
    name: 'NotFound',
    path: '/404',
    meta: { requireAuth: false },
    component: NotFound,
  },
  {
    name: 'CatchAll',
    path: '/:notFound(.*)',
    meta: { requireAuth: false },
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0, left: 0 };
  },
});

// Guarda de Navegação
router.beforeEach(async (to, from, next) => {
  if (!store.getters.triedLogin) {
    await store.dispatch('tryAutoLogin');
  }

  if (to.meta.requireAuth) {
    if (store.getters.isLoggedIn && to.meta.allowUsers.includes(store.getters.userType)) {
      return next();
    }

    if (from.path !== to.path) return next(from);

    return next('/login');
  }

  return next();
});

export default router;
