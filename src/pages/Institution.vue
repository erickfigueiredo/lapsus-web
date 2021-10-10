<template>
  <base-template>
    <card responsivity="mb-8">
      <h2 class="font-bold text-gray-500">Cadastro de Instituições</h2>
      <hr class="my-4" />
      <institution-form @form-response="showInformation" @form-data="addInstitution" />
    </card>
    <card class="mb-8">
      <base-table>
        <template #header>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200">Nome</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">E-mail</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">
              Telefone
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">
              Adicionado em
            </th>
            <th class="px-5 py-3 border-b-2 border-gray-200" />
          </tr>
        </template>
        <template #body>
          <tr v-for="inst in institutions" :key="inst.id" class="hover:bg-gray-100">
            <td class="px-5 py-5 border-b border-gray-200 ">
              <p class="text-gray-900">{{ inst.name }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <a :href="`mailto:${inst.email}`" class="text-gray-900">{{ inst.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ formatNumber(inst.phone) }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ new Date(inst.created_at).toLocaleDateString() }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <router-link
                :to="`/instituicoes/${inst.id}`"
                class="text-gray-900 hover:text-cerulean-600"
              >
                Detalhes
              </router-link>
            </td>
          </tr>
        </template>
      </base-table>
      <pagination
        v-if="institutions.length"
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
import genericMask from '../utils/genericMask';

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

      institutions: [],
      pagination: {},
    };
  },

  methods: {
    addInstitution(inst) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.institutions.length - 1; i++) {
        if (inst.name >= this.institutions[i].name && inst.name <= this.institutions[i + 1].name) {
          this.institutions.splice(i + 1, 0, inst);
        }
      }

      if (this.institutions.length > this.pagination.perPage) {
        this.institutions.pop();
      }

      if (this.pagination.currentPage === this.pagination.lastPage) {
        this.pagination.lastPage += 1;
      }
    },
    formatNumber(phone) {
      return genericMask(phone, phone.length === 10 ? '(##) ####-####' : '(##) #####-####');
    },
    async paginate(page = 0) {
      const result = await Institution.indexDetailed(page);

      if (result.success) {
        this.institutions = result.institution.data;
        this.pagination = result.institution.pagination;
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
