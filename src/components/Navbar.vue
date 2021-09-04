<template>
  <div class="flex">
    <div
      :class="isActive ? 'block' : 'hidden'"
      class="fixed z-10 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      @click="isActive = false;"
    ></div>
    <nav
      :class="isActive ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class=" fixed z-20 inset-y-0 left-0 w-64 transition duration-300 transform bg-cerulean-900
      overflow-y-auto rounded-r-xl lg:rounded-none lg:translate-x-0 lg:static lg:inset-0"
    >
    <!-- Início definição das rotas -->
    <div class="active bg-cerulean-800 ml-4 pr-4 rounded-l-lg my-4 border-l-8 border-lemon-300">
      <p class="text-center text-cerulean-500 p-2">
        <font-awesome :icon="['fas', 'caravan']" class="text-xl mr-2"/>
        <router-link to="/home" class="text-lg">Home</router-link>
      </p>
    </div>
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
};
</script>
