<template>
  <div class="bg-gray-100 rounded-md p-6 animate-pulse w-full">
    <div
      v-for="i in this.quantity"
      :key="i"
      class="mb-4 py-6 border-lg bg-cerulean-200 rounded-lg"
    />
  </div>
</template>

<script>
export default {
  props: {
    quantity: {
      type: Number,
      default() {
        return 5;
      },
    },
  },
};
</script>
