import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '',
    component: '',
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
