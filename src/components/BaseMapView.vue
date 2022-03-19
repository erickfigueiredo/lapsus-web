<template>
  <div id="map-container" class="w-full h-full z-10"></div>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
import { toRaw } from 'vue';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import shp from 'shpjs';

import _ from 'lodash';

import wkt from 'wkt';
import EMSI from '../services/EMSI';
import Shapefile from '../services/Shapefile';
import contribution from '../services/Contribution';

import genHexColor from '../utils/colorGenerator';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  props: {
    useUserLocation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,

      layers: [],
      contributions: [],
      emsis: [],
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
    getContributionsAndEMSI: _.debounce(async function (x, y) {
      const map = toRaw(this.map);
      const contrib = await contribution.index(x, y);
      if (contrib.success) {
        this.contributions = contrib.contribution;
      }

      const emsi = await EMSI.index(x, y);
      if (emsi.success) {
        this.emsis = emsi.emsi;
      }

      if (contrib.success !== emsi.success) {
        if (contrib.success) this.emsis = [];
        else this.contributions = [];
      }

      // Deleta colaborações anteriores evitando sobrescrita
      if (this.layers.length && (contrib.success || emsi.success)) {
        this.layers.forEach((layer) => {
          map.removeLayer(layer);
        });

        this.layers = [];
      }

      // Visualização de Contribuições
      this.contributions.forEach((el) => {
        const data = '<strong>Colaboração de Usuário</strong><br><hr><br>'
          + `<strong>Categoria:</strong> ${el.category_name}<br>`
          + `<strong>Data de ocorrência:</strong> ${el.occurrence || 'Não Informado.'}<br>`
          + `<strong>Vítimas:</strong> ${el.victims ? 'Sim' : 'Não'}<br>`
          + `<strong>Risco de danos:</strong> ${el.risk_damage ? 'Sim' : 'Não'}<br>`
          + `<strong>Descrição:</strong> ${el.desc || 'Não Informado.'}<br>`;

        if (wkt.parse(el.local).type === 'Point') {
          this.layers.push(
            L.marker(wkt.parse(el.local).coordinates).addTo(map).bindPopup(data),
          );
        }

        if (wkt.parse(el.local).type === 'Polygon') {
          this.layers.push(
            L.polygon(wkt.parse(el.local).coordinates).addTo(map).bindPopup(data),
          );
        }

        if (wkt.parse(el.local).type === 'LineString') {
          this.layers.push(
            L.polyline(wkt.parse(el.local).coordinates).addTo(map).bindPopup(data),
          );
        }
      });

      // Visualização de EMSI
      this.emsis.forEach((el) => {
        const data = '<strong>Colaboração EMSI</strong><br><hr><br>'
          + `<strong>Origem:</strong> ${el.origin_name || 'Não Informado.'}<br>`
          + `<strong>Identificador da Organização:</strong> ${el.origin_id || 'Não Informado.'}<br><hr>`
          + `<strong>Data de Observação:</strong> ${el.obs_datime || 'Não Informado.'}<br>`
          + `<strong>Data de Ocorrência:</strong> ${el.occ_datime || 'Não Informado.'}<br>`
          + `<strong>Data de Declaração:</strong> ${el.decl_datime || 'Não Informado.'}<br><hr>`
          + `<strong>Fonte:</strong> ${el.event_source || 'Não Informado.'}<br>`
          + `<strong>Endereço:</strong> ${el.address || 'Não Informado.'}<br>`
          + `<strong>Local:</strong> ${el.egeo_type ? `${el.egeo_type}/${el.egeo_subtype}` : 'Não Informado.'}<br><hr>`
          + `<strong>Categoria:</strong> ${el.context_freetext || 'Não Informado.'}<br>`
          + `<strong>Situação:</strong> ${el.event_status || 'Não Informado.'}<br>`
          + `<strong>Risco:</strong> ${el.event_risk || 'Não Informado.'}<br>`
          + `<strong>Probabilidade de Ocorrência:</strong> ${`${el.event_certainty}%` || 'Não Informado.'}<br>`
          + `<strong>Urgência:</strong> ${el.context_urgency === 'URGENT' ? 'Urgente' : 'Não Urgente'}<br>`
          + `<strong>Causa:</strong> ${el.event_cause || 'Não Informado.'}<br>`
          + `<strong>Escala:</strong> ${el.event_scale || 'Não Informado.'}<br><hr>`
          + `<strong>Observação 1:</strong> ${el.event_freetext || 'Não Informado.'}<br>`
          + `<strong>Observação 2:</strong> ${el.egeo_freetext || 'Não Informado.'}<br>`;

        if (wkt.parse(el.coord).type === 'Point') {
          this.layers.push(
            L.marker(wkt.parse(el.coord).coordinates).addTo(map).bindPopup(data),
          );
        }

        if (wkt.parse(el.coord).type === 'Polygon') {
          this.layers.push(
            L.polygon(wkt.parse(el.coord).coordinates).addTo(map).bindPopup(data),
          );
        }

        if (wkt.parse(el.coord).type === 'LineString') {
          this.layers.push(
            L.polyline(wkt.parse(el.coord).coordinates).addTo(map).bindPopup(data),
          );
        }
      });
    }, 2000), // Espera 2 segundos pra mandar a requisição
    async fetchAndShow(e) {
      const center = e.target.getCenter();

      await this.getContributionsAndEMSI(center.lat, center.lng);
    },
  },
  beforeMount() {
    if (this.map) {
      toRaw(this.map).off();
      toRaw(this.map).remove();
    }
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
      zoomAnimation: false, // Adicionado para evitar Bug
      center: [this.coords.latitude, this.coords.longitude],
      layers: [osm],
      zoom: 15,
    });

    const layerControl = L.control.layers(baseMap, null, { collapse: true }).addTo(map);

    L.control.scale({ metric: true, imperial: false }).addTo(map);

    const center = map.getCenter();
    await this.getContributionsAndEMSI(center.lat, center.lng);

    map.on('dragend', this.fetchAndShow);

    // INÍCIO - Indexação de Shapefiles
    const shapes = await Shapefile.index('y');
    if (shapes.success) {
      shapes.shapefile.forEach((s) => {
        const randomColor = genHexColor();

        shp(s.uri)
          .then((data) => {
            let shpName = data.fileName.replaceAll(/[-_]/g, ' ');

            if (shpName.length > 25) {
              shpName = `${shpName.slice(0, 26)}...`;
            }

            layerControl.addOverlay(
              L.geoJSON(data, {
                style() {
                  return { color: randomColor };
                },
              }),
              shpName,
            );
          })
          .catch((err) => {
            console.warn('Um ou mais arquivos não possuem layers!', err);
          });
      });
    }
    // FIM - Indexação de Shapefiles

    this.map = map;
  },
};
</script>
