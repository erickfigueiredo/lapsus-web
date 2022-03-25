<template>
  <div class="flex md:space-x-4">
    <button
      :disabled="current === 1"
      class="md:ml-auto mt-4 p-2 rounded-md font-semibold transition  duration-300
      ease-in-out"
      :class="
        current === 1
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : 'bg-gray-600 hover:text-white text-lemon-400 hover:bg-lemon-500'
      "
      @click="goTo(false)"
    >
      Anterior
    </button>
    <button
      :disabled="current === last"
      class="ml-auto md:ml-0 mt-4 p-2 rounded-md font-semibold transition  duration-300
      ease-in-out"
      :class="
        current === last
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : 'bg-gray-600 hover:text-white text-lemon-400 hover:bg-lemon-500'
      "
      @click="goTo"
    >
      Próxima
    </button>
  </div>
</template>

<script>
export default {
  emits: ['change-page'],
  props: {
    current: {
      type: Number,
      required: true,
    },
    last: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goTo(isNext = true) {
      if (isNext) {
        this.$emit('change-page', this.current + 1);
      } else {
        this.$emit('change-page', this.current - 1);
      }
    },
  },
};
</script>
