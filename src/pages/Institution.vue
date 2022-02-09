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
              <span class="text-gray-900">{{ inst.name }}</span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <a :href="`mailto:${inst.email}`" class="text-gray-900">{{ inst.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <a :href="`tel:${inst.phone}`" class="text-gray-900">{{ formatPhone(inst.phone) }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <span class="text-gray-900"
                >{{ new Date(inst.created_at).toLocaleDateString() }}
              </span>
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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    addOrdered(array, begin, end, inst) {
      const index = Math.floor((begin + end) / 2);

      if (
        !array[index].name.localeCompare(inst.name, 'pt-BR', { sensitivity: 'base' })
        || begin === end
      ) {
        if (array[index].name.localeCompare(inst.name, 'pt-BR', { sensitivity: 'base' }) <= 0) {
          array.splice(index + 1, 0, inst);
        } else {
          array.splice(index, 0, inst);
        }
        return null;
      }

      if (array[index].name.localeCompare(inst.name, 'pt-BR', { sensitivity: 'base' }) < 0) {
        return this.addOrdered(array, index + 1, end, inst);
      }
      return this.addOrdered(array, begin, index, inst);
    },
    addInstitution(inst) {
      if (!this.institutions.length) {
        this.institutions.push(inst);
      } else {
        this.addOrdered(this.institutions, 0, this.institutions.length - 1, inst);
      }

      if (this.institutions.length > this.pagination.perPage) {
        this.institutions.pop();

        if (this.pagination.currentPage === this.pagination.lastPage) {
          this.pagination.lastPage += 1;
        }
      }
    },
    formatPhone(phone) {
      return genericMask(phone, phone.length === 10 ? '(##) ####-####' : '(##) #####-####');
    },
    async paginate(page = 0) {
      const result = await Institution.indexDetailed(this.token, page);

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
      }, 5000);
    },
  },
  async mounted() {
    await this.paginate();
  },
};
</script>
