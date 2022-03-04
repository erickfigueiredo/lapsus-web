<template>
  <map-template>
    <base-map :useUserLocation="true" @finish-draw="openModal" />
  </map-template>
  <modal
    v-show="isModalContributionActive"
    class="overflow-y-auto"
    title="Registrar Colaboração"
    size="w-4/5 md:w-2/4"
    @close="closeModal"
  >
    <div
      v-if="contentFailed"
      class="bg-gray-100 flex font-semibold text-center text-gray-400 h-64 rounded-md p-6
      overflow-y-auto"
    >
      <p class="mx-auto my-auto">Não é possível realizar contribuições!</p>
    </div>
    <template v-else>
      <emsi-form
        v-if="isLoggedIn && (userType === 'A' || userType === 'T')"
        :actorList="actor"
        :casualtiesList="casualties"
        :categoryList="category"
        :causeList="cause"
        :contributionList="contribution"
        :loctypeList="loctype"
        :riskList="risk"
        :scaleList="scale"
        :statusList="status"
        :typeList="type"
        :weatherList="weather"
        :geometry="geometry"
        @form-response="showInformation"
        @next-action="closeModal"
      />
      <contribution-form
        v-else
        :category-list="category"
        :coords="geometry"
        @form-response="showInformation"
        @next-action="closeModal"
      />
    </template>
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import MapTemplate from '../templates/MapTemplate.vue';
import BaseMap from '../components/BaseMap.vue';
import ContributionForm from '../components/forms/ContributionForm.vue';
import EMSIForm from '../components/forms/EMSIForm.vue';

import Modal from '../components/Modal.vue';

import Category from '../services/Category';
import EMSI from '../services/EMSI';

export default {
  components: {
    MapTemplate,
    BaseMap,
    Modal,
    ContributionForm,
    'emsi-form': EMSIForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      category: [],
      cause: [],
      risk: [],
      scale: [],
      status: [],
      casualties: [],
      contribution: [],
      type: {},
      loctype: {},
      weather: {},
      actor: {},

      geometry: '',
      contentFailed: false,

      contacts: [],
      legend: [],

      isModalContributionActive: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'userType', 'token']),
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
    if (this.isLoggedIn && (this.userType === 'A' || this.userType === 'T')) {
      const result = await EMSI.list(this.token);

      if (result.success) {
        this.actor = result.actor;
        this.casualties = result.casualties;
        this.category = result.category;
        this.cause = result.cause;
        this.contribution = result.contribution;
        this.loctype = result.loctype;
        this.risk = result.risk;
        this.scale = result.scale;
        this.status = result.status;
        this.type = result.type;
        this.weather = result.weather;
      } else {
        this.contentFailed = true;
        this.showInformation(3, result.message);
      }
    } else {
      const result = await Category.index();

      if (result.success) {
        this.category = result.category;
      } else {
        this.contentFailed = true;
        this.showInformation(3, result.message);
      }
    }
  },
};
</script>
