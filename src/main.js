import { createApp } from 'vue';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck, faExclamation, faTimes, faUserCircle, faBars, faChevronRight,
  faSortUp, faSortDown, faCaravan, faSpinner, faMap, faLayerGroup, faServer,
  faTasks, faLandmark, faEnvelopeOpenText, faPaperPlane, faMapMarkedAlt,
  faMapMarkerAlt, faIdCard, faUserSecret, faUser, faUserShield, faUserCog,
  faUserTie, faPhoneAlt, faThumbsUp, faThumbsDown, faFile, faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import FloatInfo from './components/FloatInfo.vue';

import Store from './stores';
import Router from './routes';
import App from './App.vue';

library.add(
  faCheck, faExclamation, faTimes, faUserCircle, faBars, faChevronRight,
  faSortUp, faSortDown, faCaravan, faSpinner, faMap, faLayerGroup, faServer,
  faTasks, faLandmark, faEnvelopeOpenText, faPaperPlane, faMapMarkedAlt,
  faMapMarkerAlt, faIdCard, faUserSecret, faUser, faUserShield, faUserCog,
  faUserTie, faPhoneAlt, faThumbsUp, faThumbsDown, faFile, faSearch,
);

const app = createApp(App);

app.use(Store);
app.use(Router);

app.component('font-awesome', FontAwesomeIcon);
app.component('float-info', FloatInfo);

app.mount('#app');
