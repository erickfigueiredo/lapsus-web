<template>
  <base-template :is-map="true">
    <base-map :useUserLocation="true"  />
  </base-template>
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseMap from '../components/BaseMap.vue';

export default {
  components: {
    BaseTemplate,
    BaseMap,
  },
};
</script>
