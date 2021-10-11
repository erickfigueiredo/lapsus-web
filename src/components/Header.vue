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
      <button
        class="ml-auto bg-white rounded-full w-10 h-10 shadow-md mr-4 lg:mr-12"
        @click="isActiveMenu = !isActiveMenu"
      >
        <font-awesome
          :icon="['fas', 'user-circle']"
          class="text-3xl text-cerulean-700 align-middle"
        />
      </button>
    </div>
  </header>
  <div v-if="isActiveMenu" class="absolute top-12 right-4 shadow-md rounded-lg lg:right-12">
    <div class="absolute -top-2 right-7 bg-white h-4 w-4 transform rotate-45"></div>
    <section class="bg-white p-6 rounded-lg">
      <ul>
        <li>Perfil</li>
        <li>Configurações</li>
        <li>Sair</li>
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
};
</script>
