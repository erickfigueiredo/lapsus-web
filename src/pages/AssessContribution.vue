<template>
  <base-template>
    <card>
      <base-table>
        <template #header>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200">Id</th>
            <th class="px-5 py-3 border-b-2 border-gray-200">Colaborador</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">Adicionado em</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell">Status</th>
            <th class="px-5 py-3 border-b-2 border-gray-200 hidden md:table-cell"></th>
          </tr>
        </template>
        <template #body>
          <tr
            v-for="(contrib, i) in contributions"
            :key="contrib.id"
            :class="[
              'hover:bg-gray-100',
              {
                'text-gray-500 bg-gray-200': contrib.published !== 'P',
                'text-gray-900 hover:bg-gray-100': contrib.published === 'P',
              },
            ]"
          >
            <td class="px-5 py-5 border-b border-gray-200">
              <p class="text-gray-900">{{ contrib.id }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              {{
                contrib.collaborator_name
                  ? contrib.collaborator_name + " " + contrib.collaborator_surname
                  : "Anônimo"
              }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900">{{ contrib.created_at }}</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p
                :class="{
                  'text-gray-900': contrib.published === 'P',
                  'text-green-600 font-semibold': contrib.published === 'A',
                  'text-red-700 font-semibold': contrib.published === 'R',
                }"
              >
                {{
                  contrib.published === "P"
                    ? "Pendente"
                    : contrib.published === "A"
                    ? "Aprovado"
                    : "Reprovado"
                }}
              </p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <p class="text-gray-900 cursor-pointer" @click="openModal(i)">
                {{ contrib.published === "P" ? "Avaliar" : "Visualizar" }}
              </p>
            </td>
          </tr>
        </template>
      </base-table>
      <pagination
        v-if="contributions.length"
        :current="parseInt(pagination.currentPage)"
        :last="parseInt(pagination.lastPage)"
        @change-page="paginate"
      />
    </card>
  </base-template>
  <teleport to="body">
    <modal
      v-show="isModalActive"
      :title="'Detalhes da Contribuição #' + this.contribution.id"
      size="w-4/5 lg:w-2/4 lg:w-1/4"
      :key="this.contribution.id"
      @close="closeModal"
    >
      <contribution-detailed
        :fill-data="contribution"
        @form-response="showInformation"
        @form-data="updateContribution"
      />
    </modal>
  </teleport>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseTable from '../components/BaseTable.vue';
import Modal from '../components/Modal.vue';
import Pagination from '../components/Pagination.vue';
import ContributionDetailed from '../components/forms/ContributionDetailed.vue';

import Contribution from '../services/Contribution';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    BaseTable,
    Modal,
    Pagination,
    ContributionDetailed,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      isModalActive: false,

      contributions: [],
      pagination: {},

      contribution: {},
      index: null,
    };
  },
  methods: {
    openModal(index) {
      this.contribution = this.contributions[index];
      this.index = index;

      this.isModalActive = true;
    },
    closeModal() {
      this.step = false;
      this.isModalActive = false;
    },
    updateContribution(contribution) {
      this.closeModal();
      this.contributions[this.index] = contribution;
    },
    async paginate(page = 0) {
      const result = await Contribution.indexDetailed(this.$store.getters.token, page);

      if (result.success) {
        this.contributions = result.contribution.data;
        this.pagination = result.contribution.pagination;
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
