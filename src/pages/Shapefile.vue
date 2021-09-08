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
              v-for="shp in shapefiles"
              :key="shp.id"
              class="py-4 px-8 text-white bg-cerulean-400 rounded-lg mb-4"
            >
              <font-awesome :icon="['fas', 'archive']" class="mr-2" /> {{ shp.title }}
            </li>
          </ul>
        </div>
      </card>
    </section>
  </base-layout>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import ShapefileForm from '../components/forms/ShapefileForm.vue';
// import Modal from '../components/Modal.vue';

import Shapefile from '../services/Shapefile';

export default {
  components: {
    BaseLayout: Base,
    Card: BaseCard,
    ShapefileForm,
    // Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      shapefiles: [],
    };
  },
  methods: {
    addShapefile(shapefile) {
      this.shapefiles.push(shapefile);
    },
    updateShapefile() {},
    deleteShapefile() {},
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
