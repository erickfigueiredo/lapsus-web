<template>
  <base-template :is-map="true">
    <base-map :useUserLocation="true" @finish-draw="openModal" />
  </base-template>
  <modal
    v-show="isModalContributionActive"
    title="Registrar Colaboração"
    size="w-4/5 md:w-2/4"
    @close="closeModal"
  >
    <contribution-form
      :category-list="categories"
      :coords="geometry"
      @form-response="showInformation"
    />
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseMap from '../components/BaseMap.vue';
import ContributionForm from '../components/forms/ContributionForm.vue';
import Modal from '../components/Modal.vue';

import Category from '../services/Category';

export default {
  components: {
    BaseTemplate,
    BaseMap,
    Modal,
    ContributionForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      categories: [],
      geometry: '',

      isModalContributionActive: false,
    };
  },
  methods: {
    openModal(geo) {
      this.geometry = geo;
      this.isModalContributionActive = true;
    },
    closeModal() {
      this.isModalContributionActive = false;
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
    const result = await Category.index();

    if (result.success) {
      this.categories = result.category;
    }
  },
};
</script>
