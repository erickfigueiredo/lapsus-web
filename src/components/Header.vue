<template>
  <header
    class="px-4 bg-gradient-to-r from-cerulean-900 to-gray-700 border-b-2 border-lemon-400
    shadow-md"
  >
    <div class="flex my-auto py-2">
      <button class="ml-2 lg:hidden" @click="isActiveNav = true">
        <font-awesome :icon="['fas', 'bars']" class="text-2xl text-lemon-400 align-middle" />
      </button>
      <div v-if="instanceName.length" class="my-auto ml-2 hidden md:block">
        <p class="align-middle text-white">
          <span class="font-semibold">Instância: </span>{{ instanceName }}</p
        >
      </div>
      <div class="flex ml-auto my-auto items-center">
        <span v-if="$store.getters['userName']" class="text-white align-middle">
          Olá, {{ $store.getters["userName"] }}
        </span>
        <button
          class="ml-4 bg-white rounded-full w-10 h-10 shadow-md mr-4 lg:mr-12"
          @click="isActiveMenu = !isActiveMenu"
        >
          <img v-if="isLoggedIn" :src="profilePic" :alt="userName" class="rounded-full p-0.5" />
          <font-awesome
            v-else
            :icon="['fas', 'user-circle']"
            class="text-3xl text-cerulean-700 align-middle"
          />
        </button>
      </div>
    </div>
  </header>
  <div v-if="isActiveMenu" class="absolute top-12 right-4 shadow-md rounded-lg z-20 lg:right-12">
    <div class="absolute -top-2 right-7 bg-white h-4 w-4 transform rotate-45" />
    <section class="bg-white rounded-lg">
      <ul>
        <template v-if="isLoggedIn">
          <li class="px-6 py-2">
            <router-link to="/perfil" @click="closeMenu">Perfil</router-link>
          </li>
          <li v-if="userType === 'A'" class="px-6 py-2">
            <router-link to="/configuracoes" @click="closeMenu">Configurações</router-link>
          </li>
        </template>
        <li v-else class="px-6 py-2">
          <router-link to="/cadastro" @click="closeMenu">Cadastrar-me</router-link>
        </li>
        <router-link to="" @click="logout">
          <li
            class="px-6 py-2 text-red-500 hover:bg-red-500 rounded-b-lg hover:text-white
            font-semibold"
          >
            Sair
          </li>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import useMenus from '../hooks/useMenus';

export default {
  setup() {
    const { isActiveNav, isActiveMenu } = useMenus();

    return { isActiveNav, isActiveMenu };
  },
  props: {
    instanceName: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userType', 'userName', 'profilePic']),
  },
  methods: {
    closeMenu() {
      this.isActiveMenu = false;
    },
    logout() {
      this.closeMenu();
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
  },
};
</script>
