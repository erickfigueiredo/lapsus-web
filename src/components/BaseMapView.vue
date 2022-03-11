<template>
  <div id="map-container" class="w-full h-full z-10"></div>
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */

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
      let result = await contribution.index(x, y);
      if (result.success) {
        this.contributions = result.contribution;
      }

      result = await EMSI.index(x, y);
      if (result.success) {
        this.emsis = result.emsi;
      }

      // INICIO - Visualização das contribuições

      this.contributions.forEach((elemento) => {
        if (elemento.local.indexOf('POINT') !== '-1') {
          L.marker(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração normal<br>'
            + '<strong>Data de ocorrência:</strong> '}${elemento.occurrence}<br>`
            + `<strong>Vítimas:</strong> ${elemento.victims}<br>`
            + `<strong>Risco de danos:</strong> ${elemento.risk_damage}<br>`
            + `<strong>Descrição:</strong> ${elemento.desc}<br>`
            + `<strong>Categoria:</strong> ${elemento.category_name}`,
          );
        } else if (elemento.local.indexOf('LINESTRING') !== '-1') {
          L.polyline(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração normal<br>'
            + '<strong>Data de ocorrência:</strong> '}${elemento.occurrence}<br>`
            + `<strong>Vítimas:</strong> ${elemento.victims}<br>`
            + `<strong>Risco de danos:</strong> ${elemento.risk_damage}<br>`
            + `<strong>Descrição:</strong> ${elemento.desc}<br>`
            + `<strong>Categoria:</strong> ${elemento.category_name}`,
          );
        } else if (elemento.local.indexOf('POLYGON') !== '-1') {
          L.polygon(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração normal<br>'
            + '<strong>Data de ocorrência:</strong> '}${elemento.occurrence}<br>`
            + `<strong>Vítimas:</strong> ${elemento.victims}<br>`
            + `<strong>Risco de danos:</strong> ${elemento.risk_damage}<br>`
            + `<strong>Descrição:</strong> ${elemento.desc}<br>`
            + `<strong>Categoria:</strong> ${elemento.category_name}`,
          );
        }
      });

      this.emsis.forEach((elemento) => {
        if (elemento.local.indexOf('POINT') !== '-1') {
          L.marker(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração EMSI<br>'
            + '<strong>Nome do campo:</strong> '}${elemento.created_at}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.urgency}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_org}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.uri}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.seclass}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.mode}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.msgtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.level}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.main_event_id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.certainty}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.decl_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.occ_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.source}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.scale}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.cause}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.risk_assessmnt}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subweather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.weather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_loc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.st_astext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.address}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.env}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subcategory}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.category}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subloctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.loctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv3}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv2}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actor}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}`,
          );
        } else if (elemento.local.indexOf('LINESTRING') !== '-1') {
          L.polyline(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração EMSI<br>'
            + '<strong>Nome do campo:</strong> '}${elemento.created_at}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.urgency}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_org}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.uri}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.seclass}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.mode}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.msgtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.level}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.main_event_id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.certainty}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.decl_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.occ_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.source}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.scale}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.cause}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.risk_assessmnt}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subweather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.weather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_loc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.st_astext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.address}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.env}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subcategory}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.category}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subloctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.loctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv3}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv2}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actor}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}`,
          );
        } else if (elemento.local.indexOf('POLYGON') !== '-1') {
          L.polygon(wkt.parse(elemento.local).coordinates).addTo(this.map).bindPopup(
            `${'<strong>Tipo de colaboração: </strong>Colaboração EMSI<br>'
            + '<strong>Nome do campo:</strong> '}${elemento.created_at}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.urgency}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_org}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.uri}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.seclass}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.mode}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.msgtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.level}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.main_event_id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.certainty}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.decl_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.occ_datime}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.source}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.scale}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.cause}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.risk_assessmnt}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.freetext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.status}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subtype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.type}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subweather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.weather}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id_loc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.name}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.st_astext}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.id}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.address}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.env}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subcategory}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.category}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.subloctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.loctype}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv3}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actornv2}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.actor}<br>`
            + `<strong>Nome do campo:</strong> ${elemento.desc}`,
          );
        }
      });

      // FIM - Visualização das contribuições
    }, 2000), // Espera 2 segundos pra mandar a requisição
    async fetchAndShow(e) {
      const center = e.target.getCenter();

      await this.getContributionsAndEMSI(center.lat, center.lng);
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
