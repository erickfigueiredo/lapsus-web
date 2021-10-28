<template>
  <input type="text" v-model="name" />
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
    return { name: this.a };
  },
};
</script>
