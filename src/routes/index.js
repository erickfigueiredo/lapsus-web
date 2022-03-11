import { createRouter, createWebHistory } from 'vue-router';

// Importação das Páginas
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import ResetPassword from '../pages/ResetPassword.vue';
import Home from '../pages/Home.vue';
import User from '../pages/User.vue';
import Registered from '../pages/users/Registered.vue';
import Moderator from '../pages/users/Moderator.vue';
import Technician from '../pages/users/Technician.vue';
import Admin from '../pages/users/Admin.vue';
import Category from '../pages/Category.vue';
import Institution from '../pages/Institution.vue';
import InstitutionDetails from '../pages/InstitutionDetails.vue';
import Message from '../pages/Message.vue';
import NewMessage from '../pages/NewMessage.vue';
import Shapefile from '../pages/Shapefile.vue';
import Contribute from '../pages/Contribute.vue';
import ContributeView from '../pages/ContributeView.vue';
import AssessContribution from '../pages/AssessContribution.vue';
import Profile from '../pages/Profile.vue';
import Settings from '../pages/Settings.vue';
import NotFound from '../pages/NotFound.vue';

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
    name: 'Redefinir Senha',
    path: '/redefinir-senha',
    meta: { requireAuth: false },
    component: ResetPassword,
  },
  {
    name: 'Usuários',
    path: '/usuarios',
    children: [
      {
        name: 'Cadastrados',
        path: 'cadastrados',
        component: Registered,
      },
      {
        name: 'Moderadores',
        path: 'moderadores',
        component: Moderator,
      },
      {
        name: 'Técnicos',
        path: 'tecnicos',
        component: Technician,
      },
      {
        name: 'Administradores',
        path: 'administradores',
        component: Admin,
      },
    ],
    meta: {
      requireAuth: true,
      allowUsers: ['A'],
    },
    component: User,
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
      requireAuth: false,
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
    name: 'Contribuicoes',
    path: '/contribuicoes',
    meta: {
      requireAuth: false,
    },
    component: ContributeView,
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
      document.title = `Lapsus | ${to.name}`;
      return next();
    }

    if (from.path !== to.path) {
      document.title = `Lapsus | ${from.name}`;
      return next(from);
    }

    document.title = 'Lapsus | Login';
    return next('/login');
  }

  document.title = `Lapsus | ${to.name}`;
  return next();
});

export default router;
