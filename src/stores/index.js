import { createStore } from 'vuex';
import { MD5 } from 'crypto-js';

import Access from '../services/users/Access';

const store = createStore({
  state() {
    return {
      user: null,
      token: null,

      triedToLogin: false,
    };
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload = null) {
      state.token = payload;

      if (payload) {
        localStorage.setItem('token', payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    setTriedLogin(state) {
      state.triedToLogin = true;
    },
  },

  actions: {
    async login(context, payload) {
      const result = await Access.login(payload);

      if (result.success) {
        context.commit('setUser', result.user);
        context.commit('setToken', result.token);
      }

      return result;
    },

    async tryAutoLogin(context) {
      const token = localStorage.getItem('token');

      if (token) {
        const result = await Access.getUserInfo(token);

        if (result.success) {
          context.commit('setToken', token);
          context.commit('setUser', result.user);
        } else {
          context.dispatch('logout');
        }
      } else {
        context.dispatch('logout');
      }

      context.commit('setTriedLogin');
    },

    logout(context) {
      context.commit('setToken');
      context.commit('setUser', null);
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    triedLogin(state) {
      return state.triedToLogin;
    },
    token(state) {
      return state.token;
    },
    user(state) {
      return state.user;
    },
    userName(state) {
      return state.user?.name || 'Anônimo';
    },
    userType(state) {
      return state.user?.type;
    },
    profilePic(state) {
      const hash = MD5(state.user?.email).toString();
      return `https://gravatar.com/avatar/${hash}?d=identicon`;
    },
  },
});

export default store;
