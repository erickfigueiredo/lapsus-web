<template>
  <div class="map-container"></div>
</template>

<script>
import leaflet from 'leaflet';

export default {
  name: 'LeafletMap',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.map = leaflet.map('mapContainer').setView([51.959, -8.623], 12);
    leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100vw;
  height: 100vh;
}
</style>
