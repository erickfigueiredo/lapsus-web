<template>
  <header class="px-4 bg-cerulean-100">
    <div class="py-2 px-4 flex my-auto">
      <button class="lg:hidden" @click="isActive = true;">
        <font-awesome class="text-2xl text-cerulean-500" :icon="['fas', 'bars']"/>
      </button>
      <button class="ml-auto">
        <font-awesome :icon="['fas', 'user-circle']" class="text-3xl text-cerulean-500" />
      </button>
    </div>
    <hr class="border-1 border-cerulean-700"/>
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
