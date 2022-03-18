<template>
  <div id="map-container" class="w-full h-full z-10"></div>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { toRaw } from 'vue';

import L from 'leaflet';
import 'leaflet-draw';

import shp from 'shpjs';

import Shapefile from '../services/Shapefile';

import genHexColor from '../utils/colorGenerator';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  emits: ['finish-draw'],
  props: {
    useUserLocation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,
      geometry: '',
      finishDraw: false,
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
        this.coords = { latitude: -20.7542, longitude: -42.8819 };
      }
    },
    drawFigure(e) {
      const { layerType, layer } = e;
      const that = this;

      this.geometry = '';

      const geometryOptions = {
        marker() {
          const coord = layer.getLatLng();
          that.geometry = `POINT (${coord.lat} ${coord.lng})`;
        },
        polygon() {
          that.geometry = 'POLYGON ((';

          for (let i = 0; i < layer._latlngs[0].length; i += 1) {
            that.geometry += `${layer._latlngs[0][i].lat} ${layer._latlngs[0][i].lng}`;
            if (i < layer._latlngs[0].length - 1) that.geometry += ',';
            else that.geometry += `,${layer._latlngs[0][0].lat} ${layer._latlngs[0][0].lng}))`;
          }
        },
        polyline() {
          that.geometry = 'LINESTRING (';

          for (let i = 0; i < layer._latlngs.length; i += 1) {
            that.geometry += `${layer._latlngs[i].lat} ${layer._latlngs[i].lng}`;
            if (i < layer._latlngs.length - 1) that.geometry += ',';
            else that.geometry += ')';
          }
        },
      };

      if (geometryOptions[layerType]) {
        geometryOptions[layerType]();
        this.finishDraw = true;
      }
    },
    sendCoords() {
      if (this.finishDraw) {
        this.finishDraw = false;
        this.$emit('finish-draw', this.geometry);
      }
    },
  },
  async mounted() {
    if (this.useUserLocation) {
      await this.getUserLocation();
    } else {
      this.coords = { latitude: -20.7542, longitude: -42.8819 };
    }

    const osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    const satellite = L.tileLayer.wms(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        minZoom: 5,
        maxZoom: 17,
        attribution:
          'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      },
    );

    const baseMap = {
      'Open Street Map': osm,
      'Visão Satélite': satellite,
    };

    // Definição e plotagem do mapa
    const map = L.map('map-container', {
      center: [this.coords.latitude, this.coords.longitude],
      layers: [osm],
      zoom: 15,
    });

    const layerControl = L.control.layers(baseMap, null, { collapse: true }).addTo(map);

    // INÍCIO Plugin - Desenho no Mapa
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        circle: false,
        circlemarker: false,
        marker: true,
        polyline: {
          shapeOptions: {
            color: '#4361ea',
          },
          metric: true,
          showLength: true,
        },
        polygon: {
          shapeOptions: {
            color: '#CDFF41',
          },
          metric: true,
          precision: {
            km: 2,
          },
          feet: false,
          nautic: false,
          showArea: true,
          showLength: true,
          allowIntersection: false,
          drawError: {
            color: '#f2628c', // Cor do contorno se encontrar uma interseção
            message: '<strong>Erro:</strong> Polígonos não permitem interseção!', // Mensagem que será informada
          },
        },
        rectangle: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
    });

    L.drawLocal.draw.toolbar.buttons.marker = 'Insira um ponto';
    L.drawLocal.draw.toolbar.buttons.polygon = 'Desenhe um polígono';
    L.drawLocal.draw.toolbar.buttons.polyline = 'Desenhe linhas interligadas';

    map.addControl(drawControl);

    map.on('draw:created', this.drawFigure);
    map.on('draw:drawstop', this.sendCoords);

    // FIM Plugin - Desenho no Mapa

    L.control.scale({ metric: true, imperial: false }).addTo(map);

    // INÍCIO - Indexação de Shapefiles
    const shapes = await Shapefile.index('y');
    if (shapes.success) {
      shapes.shapefile.forEach((s) => {
        const randomColor = genHexColor();

        shp(s.uri).then((data) => {
          let shpName = data.fileName.replaceAll(/[-_]/g, ' ');

          if (shpName.length > 25) { shpName = `${shpName.slice(0, 26)}...`; }

          layerControl.addOverlay(
            L.geoJSON(data, {
              style() {
                return { color: randomColor };
              },
            }), shpName,
          );
        }).catch((err) => {
          console.warn('Um ou mais arquivos não possuem layers!', err);
        });
      });
    }
    // FIM - Indexação de Shapefiles

    this.map = map;
  },
  beforeUnmount() {
    if (this.map) { toRaw(this.map).off(); toRaw(this.map).remove(); }
  },
};
</script>
