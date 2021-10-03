<template>
  <base-layout>
    <card responsivity="mb-8">
      <h2 class="font-bold text-gray-500">Cadastro de Instituições</h2>
      <hr class="my-4" />
      <institution-form @form-response="showInformation" />
    </card>
    <card class="mb-8">
      <base-table>
        <template #header>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200">Nome</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">E-mail</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">
              Nº Usuários
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">
              Adicionado em
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200" />
          </tr>
        </template>
        <template #body>
          <tr v-for="inst in institutions" :key="inst.id">
            <td class="px-5 py-5 border-b border-gray-200 ">
              <p class="text-gray-900">{{ inst.name }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <a :href="`mailto:${inst.email}`" class="text-gray-900">{{ inst.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ inst.amount_users }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ new Date(inst.created_at).toLocaleDateString() }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <p class="text-gray-900">Detalhes</p>
            </td>
          </tr>
        </template>
      </base-table>
      <pagination :current="parseInt(currentPage)" :total="parseInt(totalPages)" />
    </card>
  </base-layout>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseTable from '../components/BaseTable.vue';
import Pagination from '../components/Pagination.vue';
import InstitutionForm from '../components/forms/InstitutionForm.vue';

import Institution from '../services/Institution';

export default {
  components: {
    BaseLayout: Base,
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

      institutions: [],
      currentPage: null,
      totalPages: null,
    };
  },
  methods: {
    async paginate(page = 0) {
      const result = await Institution.indexDetailed(page);

      if (result.success) {
        this.institutions = result.institution.data;
        this.totalPages = result.institution.pagination.total;
        this.currentPage = result.institution.pagination.currentPage;
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
      }, 3000);
    },
  },
  async mounted() {
    await this.paginate();
  },
};
</script>
