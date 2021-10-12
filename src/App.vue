<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.dispatch('tryAutoLogin');
  },
};
</script>

<style>
  textarea {
    resize: none;
  }
</style>
