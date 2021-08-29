<template>
  <div v-if="flag !== 0" class="flex absolute bg-white shadow-lg rounded-lg bottom-8 right-8">
    <section
      :class="[
        'p-4',
        'rounded-l-lg',
        {
          'bg-green-400': flag === 1,
          'bg-yellow-400': flag === 2,
          'bg-red-400': flag === 3
        }
      ]"
    >
      <font-awesome :class="flag === 2 ? 'text-gray-800' : 'text-white'" :icon="['fas', 'check']" />
    </section>
    <p class="py-4 px-2">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    flag: {
      type: Number,
      validator(value) {
        return value >= 0 && value <= 3;
      },
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
