<template>
  <map-template>
    <base-map-view :useUserLocation="true" />
  </map-template>
</template>

<script>
import MapTemplate from '../templates/MapTemplate.vue';
import BaseMapView from '../components/BaseMapView.vue';

// import EMSI from '../services/EMSI';

export default {
  components: {
    MapTemplate,
    BaseMapView,
  },

};
</script>
