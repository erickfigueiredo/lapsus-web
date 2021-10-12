<template>
  <base-template :subtitle="institution?.name">
    <card v-if="institution" responsivity="mb-8">
      <h2 class="font-bold text-gray-500">Informações da Instituição</h2>
      <hr class="my-4" />
      <institution-form
        @form-response="showInformation"
        @form-data="updateInstitution"
        :fill-data="institution"
        :to-update="true"
      />
    </card>
    <card class="mb-8">
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
              <p class="text-gray-900">{{ new Date(tech.created_at).toLocaleDateString() }}</p>
            </td>
          </tr>
        </template>
      </base-table>
      <pagination
        v-if="technicians.length"
        :current="parseInt(pagination.currentPage)"
        :last="parseInt(pagination.lastPage)"
        @change-page="paginate"
      />
    </card>
  </base-template>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseTable from '../components/BaseTable.vue';
import Pagination from '../components/Pagination.vue';
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
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      institution: null,
      technicians: [],
      pagination: {},
    };
  },
  methods: {
    updateInstitution(institution) {
      this.institution = institution;
    },
    async paginate(page = 0) {
      const result = await Technician.indexByInstitution(this.institution.id, page);

      if (result.success) {
        this.technicians = result.user.data;
        this.pagination = result.user.pagination;
      } else {
        this.showInformation(3, result.message);
      }
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
    const result = await Institution.findOneById(this.$route.params.institutionId);
    if (result.success) {
      this.institution = result.institution;

      await this.paginate();
    } else {
      this.showInformation(3, result.message);
    }
  },
};
</script>
