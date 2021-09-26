<template>
  <div id="mapContainer" class="w-full h-full z-10"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import L from 'leaflet';
import 'leaflet-draw';

export default {
  name: 'LeafletMap',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.map = L.map('mapContainer').setView([51.959, -8.623], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
    });
    this.map.addControl(drawControl);
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>
