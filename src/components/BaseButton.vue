<template>
  <button
    class="w-full mt-4 p-2 rounded-md font-semibold
          transition delay-75 duration-300 ease-in-out"
    :class="
      isBlocked
        ? 'bg-gray-400 text-gray-700 cursor-wait'
        : 'bg-gray-600 hover:text-white text-lemon-400 hover:bg-lemon-500'
    "
    :disabled="isBlocked"
  >
    <font-awesome v-if="isBlocked" :icon="['fas', 'spinner']" class="text-lg text-white" spin />
    <span v-else>{{ name }}</span>
  </button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
