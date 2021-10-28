<template>
  <header
    class="px-4 bg-gradient-to-r from-cerulean-900 to-gray-700 border-b-2 border-lemon-400
  shadow-md"
  >
    <div class=" flex my-auto py-2">
      <!-- Mudar a tag button -->
      <button class="ml-2 lg:hidden" @click="isActiveNav = true">
        <font-awesome :icon="['fas', 'bars']" class="text-2xl text-lemon-400 align-middle" />
      </button>
      <!-- Mudar a tag button -->
      <div class="ml-auto my-auto">
        <!-- Mudar isso de escrever o nome e a questão da rota -->
        <span v-if="$store.getters['userName']" class="text-white align-middle">
          Olá, {{ $store.getters["userName"] }}
        </span>
        <button
          class="ml-4 bg-white rounded-full w-10 h-10 shadow-md mr-4 lg:mr-12"
          @click="isActiveMenu = !isActiveMenu"
        >
          <font-awesome
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
        <li class="px-6 py-2">
          <router-link to="/perfil" @click="closeMenu">Perfil</router-link>
        </li>
        <li class="px-6 py-2">
          <router-link to="/configuracoes" @click="closeMenu">Configurações</router-link>
        </li>
        <router-link to="/login" @click="logout">
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
import useMenus from '../hooks/useMenus';

export default {
  setup() {
    const { isActiveNav, isActiveMenu } = useMenus();

    return { isActiveNav, isActiveMenu };
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
