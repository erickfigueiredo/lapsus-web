<template>
  <base-layout>
    <section class="md:flex md:space-x-4 md:h-4/5">
      <card responsivity="mb-4 md:mb-0 md:w-1/2">
        <h2 class="font-bold text-gray-500">Cadastro de Shapefile</h2>
        <hr class="my-4" />
        <shapefile-form @form-response="showInformation" @form-data="addShapefile" />
      </card>
      <card responsivity="md:w-1/2">
        <div class="bg-gray-100 rounded-md p-6 h-full overflow-y-auto">
          <ul>
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
        </div>
      </card>
    </section>
  </base-layout>
  <modal v-if="isModalUpdateActive" title="Atualizar Shapefile" size="w-1/4" @close="closeModal">
    <shapefile-form
      @form-response="showInformation"
      @form-data="updateShapefile"
      :fill-data="shapefile"
      :to-update="true"
    />
  </modal>
  <modal
    v-if="isModalDeleteActive"
    title="Deletar Categoria"
    size="w-1/4"
    @close="closeModal(true)"
  >
    <p>Tem certeza que deseja deletar "{{ shapefile.title }}"?</p>
    <button :disabled="blockAction" @click="deleteShapefile">Sim</button>
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import ShapefileForm from '../components/forms/ShapefileForm.vue';
import Modal from '../components/Modal.vue';

import Shapefile from '../services/Shapefile';

export default {
  components: {
    BaseLayout: Base,
    Card: BaseCard,
    ShapefileForm,
    Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      blockAction: false,

      isModalUpdateActive: false,
      isModalDeleteActive: false,

      shapefiles: [],

      shapefile: null,
      index: null,
    };
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
      const result = await Shapefile.delete(this.shapefile.id);

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
      }, 3000);
    },
  },
  async mounted() {
    const result = await Shapefile.index();

    if (result.success) {
      this.shapefiles = result.shapefile;
    } else {
      this.showInformation(3, result.message);
    }
  },
};
</script>
