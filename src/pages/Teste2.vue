<template>
  <h2>TEste 2</h2>
  <test-form :a="name" :key="name"></test-form>
</template>

<script>
import TestForm from '../components/TestForm.vue';

export default {
  components: {
    TestForm,
  },
  data() {
    return {
      name: 'Erick',
    };
  },
  mounted() {
    this.name = 'Joao';
  },
};
</script>
