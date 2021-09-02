<template>
  <div class="flex h-screen">
    <navbar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <headbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <headbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Headbar from '../components/Headbar.vue';

export default {
  components: {
    Navbar,
    Headbar,
  },
};
</script>
