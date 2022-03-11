<template>
  <base-template :subtitle="institution?.name">
    <card v-if="institution" title="Informações da Instituição" responsivity="mb-8">
      <institution-form
        @form-response="showInformation"
        @form-data="updateInstitution"
        :fill-data="institution"
        :to-update="true"
        :key="institution.id"
      />
      <template v-if="!technicians.length" >
        <hr class="my-4" />
        <div class="flex">
          <button
            class="p-2 ml-auto rounded-md text-white bg-red-500 hover:bg-red-700
          transition  duration-300 ease-in-out"
            @click="openModal"
          >
            Deletar Instituição
          </button>
        </div>
      </template>
    </card>
    <card class="mb-8" title="Técnicos Associados">
      <base-table>
        <template #header>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200">Nome</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">E-mail</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">
              Adicionado em
            </th>
          </tr>
        </template>
        <template #body>
          <tr v-for="tech in technicians" :key="tech.id" class="hover:bg-gray-100">
            <td class="px-5 py-5 border-b border-gray-200 ">
              <p class="text-gray-900">{{ tech.name + tech.surname }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <a :href="`mailto:${tech.email}`" class="text-gray-900">{{ tech.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ tech.created_at }}</p>
            </td>
          </tr>
        </template>
      </base-table>
      <div v-if="!technicians.length" class="bg-gray-100 rounded-md p-6">
      <div class="flex font-semibold text-center text-gray-400 h-full">
        <p class="mx-auto my-auto">Não há usuários vinculados</p>
      </div>
    </div>
      <pagination
        v-if="technicians.length"
        :current="parseInt(pagination.currentPage)"
        :last="parseInt(pagination.lastPage)"
        @change-page="paginate"
      />
    </card>
  </base-template>
  <teleport to="body">
    <modal
      v-show="isModalDeleteActive"
      title="Deletar Instituição"
      size="w-4/5 md:w-2/4 lg:w-1/4"
      @close="closeModal()"
    >
      <p>Tem certeza que deseja deletar "{{ institution.name }}"?</p>
      <div class="flex">
        <button
          class="ml-auto p-2 bg-red-500 hover:bg-red-700 text-white rounded-md
          transition delay-50 duration-300 ease-in-out"
          :disabled="blockAction"
          @click="deleteInstitution"
        >
          deletar
        </button>
      </div>
    </modal>
  </teleport>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseTable from '../components/BaseTable.vue';
import Pagination from '../components/Pagination.vue';
import Modal from '../components/Modal.vue';
import InstitutionForm from '../components/forms/InstitutionForm.vue';

import Institution from '../services/Institution';
import Technician from '../services/users/Technician';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    BaseTable,
    InstitutionForm,
    Pagination,
    Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      institution: {},
      technicians: [],
      pagination: {},

      blockAction: false,
      isModalDeleteActive: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    updateInstitution(institution) {
      this.institution = institution;
    },
    async deleteInstitution() {
      this.blockAction = true;

      const result = await Institution.delete(this.token, this.institution.id);
      if (result.success) {
        this.$router.replace('/instituicoes');
      } else {
        this.showInformation(3, result.message);
      }

      this.blockAction = false;
    },
    async paginate(page = 0) {
      const result = await Technician.indexByInstitution(this.token, this.institution.id, page);

      if (result.success) {
        this.technicians = result.user.data;
        this.pagination = result.user.pagination;
      } else {
        this.showInformation(3, result.message);
      }
    },
    openModal() {
      this.isModalDeleteActive = true;
    },
    closeModal() {
      this.isModalDeleteActive = false;
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
    const result = await Institution.findOneById(this.token, this.$route.params.institutionId);
    if (result.success) {
      this.institution = result.institution;

      await this.paginate();
    } else {
      this.showInformation(3, result.message);
    }
  },
};
</script>
