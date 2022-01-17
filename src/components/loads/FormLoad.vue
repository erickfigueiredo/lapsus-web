<template>
  <div class="bg-gray-100 rounded-md p-6 animate-pulse w-full">
    <div v-for="i in this.lines" :key="i">
      <div v-if="i % 2 === 0">
        <div class="mb-1 py-2  w-1/3 border-sm bg-cerulean-200 rounded-lg" />
        <div class="mb-4 py-4 border-lg bg-cerulean-200 rounded-lg" />
      </div>
      <div v-else class="flex space-x-4">
        <div class="w-full">
          <div class="mb-1 py-2  w-1/3 border-sm bg-cerulean-200 rounded-lg" />
          <div class="mb-4 py-4 border-lg bg-cerulean-200 rounded-lg" />
        </div>
        <div class="w-full">
          <div class="mb-1 py-2  w-1/3 border-sm bg-cerulean-200 rounded-lg" />
          <div class="mb-4 py-4 border-lg bg-cerulean-200 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lines: {
      type: Number,
      default() {
        return 3;
      },
    },
  },
};
</script>
