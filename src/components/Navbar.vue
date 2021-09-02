<template>
  <div class="flex">
    <div
      :class="isActive ? 'block' : 'hidden'"
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      @click="isActive = false"
    ></div>
    <nav
      :class="isActive ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class=" fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-800
      overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 rounded-r-lg lg:rounded-none"
    >

    Erick

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
