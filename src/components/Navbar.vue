<template>
  <div class="flex">
    <div
      :class="isActive ? 'block' : 'hidden'"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      @click="isActive = false"
    ></div>
    <nav
      :class="isActive ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class=" fixed z-20 inset-y-0 left-0 w-64 transition duration-300 transform bg-cerulean-900
      overflow-y-auto rounded-r-xl lg:rounded-none lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex justify-center mt-8 mb-12">
        <div>
          <router-link to="/" exact>
            <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
          </router-link>
        </div>
      </div>
      <!-- Início definição das rotas -->
      <ul class="text-gray-200">
        <li>
          <router-link
            to="/"
            exact
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:bg-cerulean-800 pr-4 p-2 transition
            duration-200"
            exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800 border-r-4"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'caravan']" class="text-xl mr-2" />Home
            </p>
          </router-link>
        </li>
        <li>
          <div
            class="block ml-4 my-4 border-l-8 rounded-l-lg cursor-pointer hover:bg-cerulean-800
            pr-4 p-2 transition duration-200"
            @click="isDockOpen = !isDockOpen"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'map-marked-alt']" class="text-xl mr-2" />Mapas
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
                  to="/contribuicoes"
                  class="block my-4 border-l-4"
                  exact-active-class="p-2 border-lemon-400 text-lemon-400 bg-cerulean-800"
                >
                  <p class="text-center text-base">
                    <font-awesome :icon="['fas', 'tasks']" class="text-xl mr-2" />Contribuições
                  </p>
                </router-link>
              </li>
              <li>
                <router-link
                  to="/colaboracoes"
                  class="block my-4 border-l-4"
                  exact-active-class="p-2 border-lemon-400 text-lemon-400 bg-cerulean-800"
                >
                  <p class="text-center text-base">
                    <font-awesome :icon="['fas', 'tasks']" class="text-xl mr-2" />Contribuir
                  </p>
                </router-link>
              </li>
            </ul>
          </section>
        </li>
        <li>
          <router-link
            to="/categorias"
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:bg-cerulean-800 pr-4 p-2 transition
            duration-200"
            exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800 border-r-4"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'tasks']" class="text-xl mr-2" />Categoria
            </p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/instituicoes"
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:bg-cerulean-800 pr-4 p-2 transition
            duration-200"
            exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800 border-r-4"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'landmark']" class="text-xl mr-2" />Instituições
            </p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/mensagens"
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:bg-cerulean-800 pr-4 p-2 transition
            duration-200"
            exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800 border-r-4"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'envelope-open-text']" class="text-xl mr-2" />Mensagens
            </p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/shapefiles"
            class="block ml-4 my-4 border-l-8 rounded-l-lg hover:bg-cerulean-800 pr-4 p-2 transition
            duration-200"
            exact-active-class="border-lemon-400 text-lemon-400 bg-cerulean-800 border-r-4"
          >
            <p class="text-center text-base">
              <font-awesome :icon="['fas', 'archive']" class="text-xl mr-2" />Shapefile
            </p>
          </router-link>
        </li>
      </ul>
      <!-- Fim definição das rotas -->
    </nav>
  </div>
</template>

<script>
import useNavbar from '../hooks/useNavbar';

export default {
  setup() {
    const { isActive } = useNavbar();

    return { isActive };
  },
  data() {
    return {
      isDockOpen: false,
    };
  },
};
</script>
