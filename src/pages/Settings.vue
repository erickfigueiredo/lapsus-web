<template>
  <base-template>
    <section class="lg:flex lg:space-x-4">
      <card responsivity="mb-4 lg:mb-0 lg:w-2/3">
        <h2 class="font-bold text-gray-500">Definições do Sistema</h2>
        <hr class="my-4" />
        <form-load v-if="isSettingsLoading" />
        <template v-else>
          <settings-form
            v-if="settings.success"
            :fill-data="settings.org"
            @form-response="showInformation"
          />
          <div v-else class="bg-gray-100 rounded-md p-6">
            <div class="flex font-semibold text-center text-gray-400 h-full">
              <p class="mx-auto my-auto">Não foi possível carregar as configurações</p>
            </div>
          </div>
        </template>
      </card>
      <card responsivity="mb-4 lg:mb-0 lg:w-1/3">
        <h2 class="font-bold text-gray-500">Contatos de Emergência</h2>
        <hr class="my-4" />
        <button
          class="w-full p-2 rounded-md ease-in-out bg-gray-600 font-semibold hover:text-white
          text-lemon-400 hover:bg-lemon-500"
          @click="openModal('c')"
          type="button"
        >
          + Adicionar Contato
        </button>
        <hr class="my-4" />
        <section class="h-4/5">
          <list-load v-if="isContactLoading" />
          <div v-else class="bg-gray-100 rounded-md p-6 overflow-y-auto">
            <ul v-if="emergencyContacts.length">
              <li
                v-for="(em, index) in emergencyContacts"
                :key="em.id"
                class="py-2 px-4 mb-4 text-white bg-cerulean-400 rounded-lg"
              >
                <p class="capitalize truncate">
                  <font-awesome :icon="['fas', 'phone-alt']" class="mr-2" />
                  {{ em.name }}: <a :href="'tel:' + em.phone">{{ em.phone }}</a>
                </p>
                <span class="cursor-pointer" @click="openModal('u', index)">Atualizar</span> |
                <span class="cursor-pointer hover:text-red-600" @click="openModal('d', index)"
                  >Deletar</span
                >
              </li>
            </ul>
            <div v-else class="bg-gray-100 rounded-md p-6">
              <div class="flex font-semibold text-center text-gray-400 h-full">
                <p class="mx-auto my-auto">Não há contatos de emergência para serem exibidos</p>
              </div>
            </div>
          </div>
        </section>
      </card>
    </section>
  </base-template>
  <float-info :flag="floatData.flag" :message="floatData.message" />
  <modal
    v-show="isModalCreateActive"
    title="Adicionar Contato"
    size="w-4/5 lg:w-2/4 lg:w-1/4"
    @close="closeModal"
  >
    <em-contact-form @form-response="showInformation" @form-data="addContact" />
  </modal>
  <modal
    v-show="isModalUpdateActive"
    title="Atualizar Contato"
    size="w-4/5 lg:w-2/4 lg:w-1/4"
    @close="closeModal('u')"
  >
    <em-contact-form
      :key="emCtt.id"
      @form-response="showInformation"
      @form-data="updateContact"
      :fill-data="emCtt"
      :to-update="true"
    />
  </modal>
  <modal
    v-show="isModalDeleteActive"
    title="Deletar Contato"
    size="w-4/5 lg:w-2/4 lg:w-1/4"
    @close="closeModal(true)"
  >
    <p>Tem certeza que deseja deletar "{{ emCtt.name }}"?</p>
    <button :disabled="blockAction" @click="deleteContact">Sim</button>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import SettingsForm from '../components/forms/SettingsForm.vue';
import EmContactForm from '../components/forms/EmContactForm.vue';
import Modal from '../components/Modal.vue';
import ListLoad from '../components/loads/ListLoad.vue';
import FormLoad from '../components/loads/FormLoad.vue';

import Settings from '../services/Settings';
import EmergencyContact from '../services/EmergencyContact';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    SettingsForm,
    EmContactForm,
    Modal,
    ListLoad,
    FormLoad,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      isModalCreateActive: false,
      isModalUpdateActive: false,
      isModalDeleteActive: false,

      settings: null,
      emergencyContacts: [],

      blockAction: false,

      emCtt: {},
      index: null,

      isSettingsLoading: true,
      isContactLoading: true,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 5000);
    },
    addContact(ctt) {
      this.emergencyContacts.unshift(ctt);
      this.closeModal();
    },
    updateContact(ctt) {
      this.emergencyContacts[this.index] = ctt;
    },
    async deleteContact() {
      this.blockAction = true;
      const result = await EmergencyContact.delete(this.token, this.emCtt.id);

      if (result.success) {
        this.emergencyContacts.splice(this.index, 1);
        this.showInformation(1, result.message);
      } else {
        this.showInformation(3, result.message);
      }

      this.isModalDeleteActive = false;
      this.blockAction = false;
    },
    openModal(m = 'c', index = '0') {
      if (m === 'c') this.isModalCreateActive = true;
      else if (m === 'u') {
        this.index = index;
        this.emCtt = this.emergencyContacts[index];

        this.isModalUpdateActive = true;
      } else {
        this.index = index;
        this.emCtt = this.emergencyContacts[index];

        this.isModalDeleteActive = true;
      }
    },
    closeModal(m = 'c') {
      if (m === 'c') this.isModalCreateActive = false;
      else if (m === 'u') this.isModalUpdateActive = false;
      else this.isModalDeleteActive = false;
    },
  },
  async mounted() {
    this.settings = await Settings.getOrg();
    this.isSettingsLoading = false;

    if (!this.settings.success) {
      this.showInformation(3, this.settings.message);
    }

    const emContact = await EmergencyContact.index();
    this.isContactLoading = false;

    if (emContact.success) {
      this.emergencyContacts = emContact.emContact;
    } else {
      this.showInformation(3, emContact.message);
    }
  },
};
</script>
