import { createStore } from 'vuex';

import Access from '../services/users/Access';

const store = createStore({
  state() {
    return {
      user: null,
      token: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  },

  actions: {
    // Refatorar o tryAutoLogin
    // Pegar a rota /me
    async tryAutoLogin(context) {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (token && user) {
        context.commit('setUser', user);
        context.commit('setToken', token);
      } else {
        context.dispatch('logout');
      }
    },

    async login(context, payload) {
      const result = await Access.login(payload);

      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        context.commit('setUser', result.user);

        localStorage.setItem('token', result.token);
        context.commit('setToken', result.token);
      }

      return result;
    },

    logout(context) {
      localStorage.removeItem('user');
      context.commit('setUser', null);

      localStorage.removeItem('token');
      context.commit('setToken', null);
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },

    userName(state) {
      return state.user.name;
    },
  },
});

export default store;
