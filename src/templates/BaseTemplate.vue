<template>
  <div  class="flex h-screen">
    <navbar @click="isActiveMenu = false" />
    <div class="flex-1 flex flex-col overflow-hidden bg-cerulean-100">
      <head-bar />
      <main @click="isActiveMenu = false" class="flex-1 overflow-x-hidden overflow-y-auto">
        <div
          :class="['container', 'mx-auto', 'h-full', { 'p-4 md:px-8 lg:py-4 lg:px-16': !isMap }]"
        >
          <section v-if="!isMap" class="bg-white p-4 rounded-lg shadow-md mt-4 mb-8">
            <h1 class="text-xl md:text-2xl lg:text-3xl truncate">
              <font-awesome :icon="['fas', 'chevron-right']" class="text-lemon-400" />
              {{ $route.name }}
              <template v-if="subtitle">
                <font-awesome :icon="['fas', 'chevron-right']" class="text-cerulean-400" />
                {{ subtitle }}
              </template>
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
import useMenus from '../hooks/useMenus';

export default {
  components: {
    HeadBar: Header,
    Navbar,
  },
  setup() {
    const { isActiveMenu } = useMenus();

    return { isActiveMenu };
  },
  props: {
    subtitle: {
      type: String,
      required: false,
    },
    isMap: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
