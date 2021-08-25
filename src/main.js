import { createApp } from 'vue';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Router from './routes';
import App from './App.vue';

library.add(faUserSecret);

const app = createApp(App);

app.use(Router);

app.component('font-awesome', FontAwesomeIcon);

app.mount('#app');
