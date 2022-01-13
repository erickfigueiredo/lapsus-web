<template>
  <div class="flex">
    <div
      :class="isActiveNav ? 'block' : 'hidden'"
      class="fixed z-30 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      @click="isActiveNav = false"
    ></div>
    <nav
      :class="isActiveNav ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class=" fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-cerulean-900
      overflow-y-auto rounded-r-xl lg:rounded-none lg:translate-x-0 lg:static lg:inset-0"
    >
      <section class="flex justify-center mt-8 mb-4 lg:my-4">
        <div>
          <router-link to="/" exact>
            <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
          </router-link>
        </div>
      </section>
      <section class="mt-8 text-gray-200 text-center font-semibold">
        <span>
          <font-awesome
            v-if="userType === 'A'"
            :icon="['fas', 'user-tie']"
            class="text-xl mr-2"
          />
          <font-awesome
            v-else-if="userType === 'T'"
            :icon="['fas', 'user-cog']"
            class="text-xl mr-2"
          />
          <font-awesome
            v-else-if="userType === 'M'"
            :icon="['fas', 'user-shield']"
            class="text-xl mr-2"
          />
          <font-awesome
            v-else-if="userType === 'R'"
            :icon="['fas', 'user']"
            class="text-xl mr-2"
          />
          <font-awesome v-else :icon="['fas', 'user-secret']" class="text-xl mr-2" />
          {{ userTypeDetailed }}
        </span>
      </section>

      <hr class="mx-4 my-4 border-1 border-cerulean-800">

      <!-- Início definição das rotas -->
      <ul class="text-gray-200">
        <li v-if="isLoggedIn">
          <router-link
            to="/"
            exact
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'caravan']" class="text-xl mr-2" />Home
            </p>
          </router-link>
        </li>
        <li v-if="isLoggedIn && userType === 'A'">
          <router-link
            to="/"
            exact
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'id-card']" class="text-xl mr-2" />Usuários
            </p>
          </router-link>
        </li>
        <li>
          <div
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900 cursor-pointer hover:border-lemon-400
            hover:text-lemon-400 pr-4 p-2 transition duration-200"
            @click="isDockOpen = !isDockOpen"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'map']" class="text-xl mr-2" />Mapas
              <font-awesome
                :icon="
                  isDockOpen || $route.name === 'Contribuições'
                    ? ['fas', 'sort-down']
                    : ['fas', 'sort-up']
                "
                class="text-xl ml-2"
              />
            </p>
          </div>
          <section v-show="isDockOpen || $route.name === 'Contribuições'" class="ml-8">
            <ul>
              <li>
                <router-link
                  to="/contribuicao"
                  class="block p-2 my-4 border-l-4 hover:bg-cerulean-800"
                  exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800"
                >
                  <p class="ml-12 text-base">
                    <font-awesome :icon="['fas', 'map-marker-alt']" class="text-xl mr-2" />
                    Contribuir
                  </p>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/contribuicoes"
                  class="block p-2 my-4 border-l-4 hover:bg-cerulean-800"
                  exact-active-class=" border-lemon-400 text-lemon-400 bg-cerulean-800"
                >
                  <p class="ml-12 text-base">
                    <font-awesome :icon="['fas', 'map-marked-alt']" class="text-xl mr-2" />
                    Contribuições
                  </p>
                </router-link>
              </li>
              <li>
                <router-link
                  v-if="isLoggedIn && ['A', 'T', 'M'].includes(userType)"
                  to="/contribuicao/avaliar"
                  class="block p-2 my-4 border-l-4 hover:bg-cerulean-800"
                  exact-active-class=" border-lemon-400 text-lemon-400 bg-cerulean-800"
                >
                  <p class="ml-12 text-base">
                    <font-awesome :icon="['fas', 'thumbs-up']" class="text-xl mr-2" />
                    Avaliar
                  </p>
                </router-link>
              </li>
            </ul>
          </section>
        </li>
        <li v-if="isLoggedIn && ['A', 'T'].includes(userType)">
          <router-link
            to="/categorias"
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'tasks']" class="text-xl mr-2" />Categorias
            </p>
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isLoggedIn && userType === 'A'"
            to="/instituicoes"
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'landmark']" class="text-xl mr-2" />Instituições
            </p>
          </router-link>
        </li>
        <li>
          <router-link
            v-if="isLoggedIn && ['A', 'T'].includes(userType)"
            to="/mensagens"
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'envelope-open-text']" class="text-xl mr-2" />Mensagens
            </p>
          </router-link>
          <router-link
            v-else
            to="/mensagens/nova"
              class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'paper-plane']" class="text-xl mr-2" />Enviar Mensagem
            </p>
          </router-link>
        </li>
        <li v-if="isLoggedIn && userType === 'A'">
          <router-link
            to="/shapefiles"
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:from-cerulean-700
            hover:to-cerulean-900
            hover:border-lemon-400 hover:text-lemon-400 pr-4 p-2 transition duration-200"
            exact-active-class="bg-gradient-to-r from-cerulean-300 to-cerulean-100
            text-cerulean-800 border-cerulean-300"
          >
            <p class="ml-12 text-base">
              <font-awesome :icon="['fas', 'layer-group']" class="text-xl mr-2" />Shapefiles
            </p>
          </router-link>
        </li>
      </ul>
      <!-- Fim definição das rotas -->
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import useMenus from '../hooks/useMenus';

export default {
  setup() {
    const { isActiveNav } = useMenus();

    return { isActiveNav };
  },
  data() {
    return {
      isDockOpen: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userType']),

    userTypeDetailed() {
      switch (this.userType) {
        case 'A':
          return 'Administrador';
        case 'M':
          return 'Moderador';
        case 'R':
          return 'Registrado';
        case 'T':
          return 'Técnico';
        default:
          return 'Anônimo';
      }
    },
  },
};
</script>
