import { createRouter, createWebHistory } from 'vue-router';

// Importação das pages
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';

import Teste from '../pages/Teste.vue';
// import Map from '../pages/Map.vue';

const routes = [
  {
    path: '/',
    component: Home,
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

/* // Global Navigation Guard
router.beforeEach((to, from, next) => {
  console.log(next);

});
export default router;
*/
