<template>
  <div class="flex h-screen">
    <navbar />
    <div class="flex-1 flex flex-col overflow-hidden bg-cerulean-100">
      <head-bar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div :class="['container', 'mx-auto', 'h-full', {'p-4 md:px-8 lg:py-4 lg:px-16': !isMap}]">
          <section v-if="!isMap" class="bg-white p-4 rounded-lg shadow-md mt-4 mb-8">
            <h1 class="text-2xl lg:text-3xl">
              <font-awesome :icon="['fas', 'chevron-right']" class="text-lemon-400" />
              {{$route.name}}
            </h1>
          </section>
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Header from '../components/Header.vue';

export default {
  components: {
    HeadBar: Header,
    Navbar,
  },
  props: {
    isMap: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
