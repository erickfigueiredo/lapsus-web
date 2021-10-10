<template>
  <header
    class="px-4 bg-gradient-to-r from-cerulean-900 to-gray-700 border-b-2 border-lemon-400
  shadow-md"
  >
    <div class=" flex my-auto py-2">
      <!-- Mudar a tag button -->
      <button class="ml-2 lg:hidden" @click="isActive = true">
        <font-awesome :icon="['fas', 'bars']" class="text-2xl text-lemon-400 align-middle" />
      </button>
      <!-- Mudar a tag button -->
      <button class="ml-auto bg-white rounded-full w-10 h-10 shadow-md mr-4 lg:mr-12">
        <font-awesome
          :icon="['fas', 'user-circle']"
          class="text-3xl text-cerulean-700 align-middle"
        />
      </button>
    </div>
  </header>
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
