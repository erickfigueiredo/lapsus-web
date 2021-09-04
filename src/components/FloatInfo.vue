<template>
  <div v-if="flag !== 0" class="flex absolute z-40 bg-white shadow-lg rounded-lg bottom-8 right-8">
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
      <font-awesome
        v-if="flag === 1"
        class="text-white"
        :icon="['fas', 'check']"
      />
      <font-awesome
        v-else-if="flag === 2"
        class="text-gray-800"
        :icon="['fas', 'exclamation']"
      />
      <font-awesome
        v-else
        class="text-white"
        :icon="['fas', 'times']"
      />
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
