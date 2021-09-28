<template>
  <base-layout :is-map="true">
    <base-map :useUserLocation="true"  />
  </base-layout>
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseMap from '../components/BaseMap.vue';

export default {
  components: {
    BaseLayout: Base,
    BaseMap,
  },
};
</script>
