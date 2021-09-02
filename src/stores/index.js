import { createStore } from 'vuex';

// import authModule from './modules/auth';

const store = createStore({
  modules: {
  },
  state() {
    return {
      isNavbarActive: false,
    };
  },
});

export default store;
