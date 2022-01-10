<template>
  <base-template>
    <card>
      <base-table>
        <template #header>
          <tr>
            <th class="px-5 py-3 border-b-2 border-gray-200">Assunto</th>
            <th class="px-5 py-3 border-b-2 border-gray-200  hidden md:table-cell">Email</th>
            <th class="px-5 py-3 border-b-2 border-gray-200  hidden md:table-cell">Data</th>
            <th class="px-5 py-3 border-b-2 border-gray-200" />
            <th class="px-5 py-3 border-b-2 border-gray-200">Ação</th>
          </tr>
        </template>
        <template #body>
          <tr
            v-for="(ctt, i) in contacts"
            :key="ctt.id"
            :class="
              ctt.is_visualized ? 'text-gray-500 bg-gray-200' : 'text-gray-900 hover:bg-gray-100'
            "
          >
            <td class="px-5 py-5 border-b border-gray-200">
              <span class="">{{ ctt.subject }}</span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200  hidden md:table-cell">
              <a :href="`mailto:${ctt.email}`" class="">{{ ctt.email }}</a>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
              <span class="">{{ new Date(ctt.created_at).toLocaleDateString() }}</span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <span class="hover:text-cerulean-600 cursor-pointer" @click="openModal(i)">
                Detalhes
              </span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200">
              <span
                class="hover:text-red-500 cursor-pointer"
                @click="openModal(i, true)"
              >
                Deletar
              </span>
            </td>
          </tr>
        </template>
      </base-table>
      <pagination
        v-if="contacts.length"
        :current="parseInt(pagination.currentPage)"
        :last="parseInt(pagination.lastPage)"
        @change-page="paginate"
      />
    </card>
  </base-template>
  <modal
    v-show="isModalVisualizationActive"
    title="Visualização de Mensagem"
    size="w-4/5 md:w-2/4 lg:w-2/4"
    @close="closeModal()"
  >
    <contact-form
      :key="contact.id"
      @form-response="showInformation"
      @form-data="updateContact"
      :fill-data="contact"
      :is-visualization="true"
    />
  </modal>
  <modal
    v-show="isModalDeleteActive"
    title="Deletar Mensagem"
    size="w-4/5 md:w-2/4 lg:w-1/4"
    @close="closeModal(true)"
  >
    <p>Tem certeza que deseja deletar "{{ contact.subject }}"?</p>
    <button :disabled="blockAction" @click="deleteContact">Sim</button>
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import BaseTable from '../components/BaseTable.vue';
import ContactForm from '../components/forms/ContactForm.vue';
import Pagination from '../components/Pagination.vue';
import Modal from '../components/Modal.vue';

import Contact from '../services/Contact';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    BaseTable,
    ContactForm,
    Pagination,
    Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      blockAction: false,

      isModalDeleteActive: false,
      isModalVisualizationActive: false,

      contacts: [],
      pagination: {},

      contact: {},
      index: null,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async paginate(page = 0) {
      const result = await Contact.index(this.token, page);

      if (result.success) {
        this.contacts = result.contact.data;
        this.pagination = result.contact.pagination;
      } else {
        this.showInformation(3, result.message);
      }
    },
    updateContact(contact) {
      this.contacts[this.index] = contact;
    },
    async deleteContact() {
      this.blockAction = true;
      const result = await Contact.delete(this.token, this.contact.id);

      if (result.success) {
        this.contacts.splice(this.index, 1);
        this.showInformation(1, result.message);
      } else {
        this.showInformation(3, result.message);
      }

      this.isModalDeleteActive = false;
      this.blockAction = false;
    },
    openModal(index, isDelete = false) {
      this.index = index;
      this.contact = this.contacts[index];

      if (isDelete) {
        this.isModalDeleteActive = true;
      } else this.isModalVisualizationActive = true;
    },
    closeModal(isDelete = false) {
      if (isDelete) {
        this.isModalDeleteActive = false;
      } else this.isModalVisualizationActive = false;
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
