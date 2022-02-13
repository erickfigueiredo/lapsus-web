<template>
  <div class="p-4 bg-white rounded-lg shadow-md w-full" :class="responsivity">
    <template v-if="title">
      <h2 class="font-semibold text-gray-500">{{title}}</h2>
      <hr class="my-4" />
    </template>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    responsivity: {
      type: String,
      required: false,
    },
  },
};
</script>
