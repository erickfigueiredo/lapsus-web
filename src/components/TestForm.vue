<template>
  <div class="w-full">{{name}}</div>
</template>

<script>
export default {
  props: {
    a: {
      type: String,
      required: true,
    },
  },
  data() {
    return { name: this.a }; // Isso n funciona com alteração de prop
  },
  created() {
    console.log('Recriou');
  },
};
</script>
