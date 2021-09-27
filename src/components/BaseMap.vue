<template>
  <div id="mapContainer" class="w-full h-full z-10"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import L from 'leaflet';
import 'leaflet-draw';

// import translate from '../translate/MapDraw';

export default {
  data() {
    return {
      map: null,
      coords: null,
    };
  },
  methods: {
    async getUserLocation() {
      try {
        const geolocation = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        this.coords = geolocation.coords;
      } catch (error) {
        console.warn(error);
        this.coords = { latitude: -20.7542, longitude: -42.8819 };
      }
    },
  },
  async mounted() {
    await this.getUserLocation();

    this.map = L.map('mapContainer').setView(
      [this.coords.latitude, this.coords.longitude],
      15,
    );
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // L.drawLocal = { translate };

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
