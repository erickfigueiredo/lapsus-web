<template>
  <base-template>
    <section class="md:flex md:space-x-4">
      <card title="Cadastro de Shapefile" responsivity="mb-4 md:mb-0 md:w-1/2">
        <shapefile-form @form-response="showInformation" @form-data="addShapefile" />
      </card>
      <card responsivity="md:w-1/2">
        <list-load v-if="isLoading" />
        <div v-else class="bg-gray-100 rounded-md p-6 h-full overflow-y-auto">
          <ul v-if="shapefiles.length">
            <li
              v-for="(shp, index) in shapefiles"
              :key="shp.id"
              class="py-4 px-8 mb-4 text-white bg-cerulean-400 rounded-lg"
            >
              <p class="capitalize truncate">
                <font-awesome :icon="['fas', 'layer-group']" class="mr-2" />
                {{ shp.title }}
              </p>
              <span @click="openModal(index)">Atualizar</span> -
              <span @click="openModal(index, true)">Deletar</span>
            </li>
          </ul>
          <div v-else class="flex font-semibold text-center text-gray-400 h-full">
            <p class="mx-auto my-auto">
              Não há shapefiles para serem exibidos
            </p>
          </div>
        </div>
      </card>
    </section>
  </base-template>
  <teleport to="body">
    <modal
      v-show="isModalUpdateActive"
      title="Atualizar Shapefile"
      size="w-1/4"
      @close="closeModal"
    >
      <shapefile-form
        :key="shapefile.id"
        @form-response="showInformation"
        @form-data="updateShapefile"
        :fill-data="shapefile"
        :to-update="true"
      />
    </modal>
    <modal
      v-show="isModalDeleteActive"
      title="Deletar Shapefile"
      size="w-1/4"
      @close="closeModal(true)"
    >
      <p>Tem certeza que deseja deletar "{{ shapefile.title }}"?</p>
      <button :disabled="blockAction" @click="deleteShapefile">Sim</button>
    </modal>
  </teleport>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import ShapefileForm from '../components/forms/ShapefileForm.vue';
import Modal from '../components/Modal.vue';
import ListLoad from '../components/loads/ListLoad.vue';

import Shapefile from '../services/Shapefile';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    ShapefileForm,
    Modal,
    ListLoad,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      blockAction: false,
      isLoading: true,

      isModalUpdateActive: false,
      isModalDeleteActive: false,

      shapefiles: [],

      shapefile: {},
      index: null,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    addShapefile(shapefile) {
      this.shapefiles.unshift(shapefile);
    },
    updateShapefile(shapefile) {
      this.shapefiles[this.index] = shapefile;
    },
    async deleteShapefile() {
      this.blockAction = true;
      const result = await Shapefile.delete(this.token, this.shapefile.id);

      if (result.success) {
        this.shapefiles.splice(this.index, 1);
        this.showInformation(1, result.message);
      } else {
        this.showInformation(3, result.message);
      }

      this.isModalDeleteActive = false;
      this.blockAction = false;
    },
    openModal(index, isDelete = false) {
      this.shapefile = this.shapefiles[index];
      this.index = index;

      if (isDelete) {
        this.isModalDeleteActive = true;
      } else this.isModalUpdateActive = true;
    },
    closeModal(isDelete = false) {
      if (isDelete) {
        this.isModalDeleteActive = false;
      } else this.isModalUpdateActive = false;
    },
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 5000);
    },
  },
  async mounted() {
    const result = await Shapefile.index();

    if (result.success) {
      this.shapefiles = result.shapefile;
    } else {
      this.showInformation(3, result.message);
    }

    this.isLoading = false;
  },
};
</script>
