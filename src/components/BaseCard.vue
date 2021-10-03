<template>
  <div class="bg-white p-4 rounded-lg shadow-md w-full" :class="responsivity">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    responsivity: {
      type: String,
      required: false,
    },
  },
};
</script>
