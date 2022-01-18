<template>
  <form>
    <section v-show="step === false">
      <div class="flex space-x-4">
        <div class="w-full">
          <label for="collaborator" class="block my-2 text-gray-500 font-semibold">
            Colaborador
          </label>
          <input
            id="collaborator"
            type="text"
            name="collaborator"
            :value="collaborator"
            placeholder="Nome do Colaborador"
            class="form-control"
            disabled
          />
        </div>
        <div class="w-full">
          <label for="ocurrence" class="block my-2 text-gray-500 font-semibold">
            Data da Ocorrência
          </label>
          <input
            id="ocurrence"
            type="text"
            name="ocurrence"
            :value="occurrence"
            class="form-control"
            disabled
          />
        </div>
      </div>
      <div class="my-4">
        <label for="category" class="block my-2 text-gray-500 font-semibold">
          Categoria
        </label>
        <input
          id="category"
          type="text"
          name="category"
          :value="this.fillData.category_name"
          placeholder="Nome da Categoria"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md capitalize
        outline-none border-2 border-gray-200 focus:border-gray-400"
          disabled
        />
      </div>
      <div class="my-4">
        <label for="name" class="block my-2 text-gray-500 font-semibold">
          Local
        </label>
        <section class="h-64">
          <div id="map-container" class="rounded-lg w-full h-full z-10" />
        </section>
      </div>
    </section>
    <section v-show="step">
      <div class="flex space-x-4">
        <div class="w-full">
          <label for="victims" class="block my-2 text-gray-500 font-semibold">
            Existem Vítimas?
          </label>
          <input
            id="victims"
            type="text"
            name="victims"
            :value="this.fillData.victims ? 'SIM' : 'NÃO'"
            placeholder="Nome do Colaborador"
            class="form-control"
            disabled
          />
        </div>
        <div class="w-full">
          <label for="risk" class="block my-2 text-gray-500 font-semibold">
            Existe Risco Material?
          </label>
          <input
            id="risk"
            type="text"
            name="risk"
            :value="this.fillData.risk_damage ? 'SIM' : 'NÃO'"
            class="form-control"
            disabled
          />
        </div>
      </div>
      <div class="my-4">
        <label for="desc" class="block my-2 text-gray-500 font-semibold">
          Descrição
        </label>
        <textarea
          id="desc"
          name="desc"
          rows="4"
          placeholder="Descrição"
          :value="fillData.desc"
          class="form-control"
          disabled
        />
      </div>
      <div v-if="fillData.annexes?.length" class="my-4">
        <label for="name" class="block my-2 text-gray-500 font-semibold">
          Anexos
        </label>
        <div class="bg-gray-100 p-2 rounded-md h-28 overflow-y-auto">
          <p v-for="(file, i) in fillData.annexes" :key="file.id" class="mb-1">
            <a :href="url + file.uri" target="_bank">
              <font-awesome :icon="['fas', 'file']" />
              {{ `arquivo ${i + 1} - Extensão ${getFileExtension(file.uri)}` }}</a
            >
          </p>
        </div>
      </div>
      <div :class="manager ? 'space-x-4 flex' : 'flex'">
        <div v-show="manager" class="w-full">
          <label for="manager" class="block my-2 text-gray-500 font-semibold">
            Avaliado por
          </label>
          <input
            id="manager"
            type="text"
            name="manager"
            :value="manager"
            placeholder="Nome do Avaliador"
            class="form-control"
            disabled
          />
        </div>
        <div class="w-full">
          <label for="status" class="block my-2 text-gray-500 font-semibold">
            Situação
          </label>
          <input
            id="status"
            type="text"
            name="status"
            :value="situation"
            placeholder="Status da Colaboração"
            class="form-control"
            disabled
          />
        </div>
      </div>
      <div v-if="fillData.published === 'P'" class="mt-8 mb-4 flex justify-center space-x-8">
        <button
          class="p-2 bg-gray-600 text-lemon-400 hover:bg-red-500 hover:text-white
          rounded-md font-semibold transition delay-55 duration-100 ease-in-out"
          type="button"
          @click="submitForm('R')"
        >
          Reprovado
          <font-awesome :icon="['fas', 'thumbs-down']" />
        </button>
        <button
          class="p-2 bg-gray-600 text-lemon-400 hover:bg-green-500 hover:text-white
          rounded-md font-semibold transition delay-55 duration-100 ease-in-out"
          type="button"
          @click="submitForm('A')"
        >
          Aprovado
          <font-awesome :icon="['fas', 'thumbs-up']" />
        </button>
      </div>
    </section>
  </form>
  <hr class="mt-4 mb-2"/>
  <div class="flex">
    <button
      :class="[
        'p-2 bg-gray-600 text-lemon-400 rounded-md font-semibold my-2',
        { 'ml-auto': !step }
      ]"
      @click="step = !step"
    >
      {{ step ? "Voltar" : "Próximo" }}
    </button>
  </div>
</template>

<script>
import { toRaw } from 'vue';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { apiURL } from '../../services/AxiosSettings';
import Contribution from '../../services/Contribution';

export default {
  emits: ['form-response', 'form-data'],
  props: {
    fillData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      step: false,
      map: null,

      url: apiURL,
    };
  },
  computed: {
    collaborator() {
      return this.fillData.collaborator_name
        ? `${this.fillData.collaborator_name} ${this.fillData.collaborator_surname}`
        : 'Anônimo';
    },
    manager() {
      return this.fillData.manager_name
        ? `${this.fillData.manager_name} ${this.fillData.manager_surname}`
        : false;
    },
    situation() {
      switch (this.fillData.published) {
        case 'A':
          return 'Aprovado';
        case 'R':
          return 'Reprovado';
        default:
          return 'Pendente';
      }
    },
    occurrence() {
      if (this.fillData.occurrence) return new Date(this.fillData.occurrence).toLocaleString('pt-br');
      return 'Não informada';
    },
  },
  methods: {
    getFileExtension(uri) {
      return uri.split('.')[1];
    },
    coordSplitter(local) {
      const coords = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const l of local) {
        coords.push(l.split(' '));
      }

      return coords;
    },
    async submitForm(published) {
      const result = await Contribution.changeStatus(this.$store.getters.token, {
        id: this.fillData.id,
        published,
      });

      if (result.success) {
        this.$emit('form-data', result.contribution);
        this.$emit('form-response', 1, 'Contribuição avaliada com sucesso!');
      } else {
        this.$emit('form-response', 3, result.message);
      }
    },
  },
  mounted() {
    this.step = false;

    const osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      minZoom: 8,
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    let coords = [[0, 0]];
    if (this.fillData.local) {
      coords = this.coordSplitter(this.fillData.local);
    }

    const map = L.map('map-container', {
      center: coords[0],
      layers: [osm],
      zoom: 15,
    });

    if (coords.length > 1) {
      const pointList = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const c of coords) {
        pointList.push(new L.LatLng(c[0], c[1]));
      }

      const polyLine = new L.Polyline(pointList, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1,
      });

      polyLine.addTo(map);
    } else {
      // eslint-disable-next-line new-cap
      const point = new L.marker(coords[0]);

      point.addTo(map);
    }

    // Desabilita as funções do mapa
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    this.map = map;
  },
  beforeUnmount() {
    toRaw(this.map).remove();
  },
};
</script>
