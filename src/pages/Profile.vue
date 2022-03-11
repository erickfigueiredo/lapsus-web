<template>
  <base-template>
    <section>
      <template v-if="user">
        <div class="flex my-4">
          <div class="mx-auto bg-white p-2 rounded-full">
            <img
              :src="profilePic"
              :alt="user.name"
              :title="`${user.name} ${user.surname}`"
              class="rounded-full"
            />
          </div>
        </div>
        <card>
          <h2 class="font-bold text-gray-500">Informações Pessoais</h2>
          <hr class="my-4" />
          <profile-form
            :fill-data="user"
            @form-response="showInformation"
            @form-data="updateUser"
          />
        </card>
        <card class="mt-8">
          <h2 class="font-bold text-gray-500">Opções da Conta</h2>
          <hr class="my-4" />
          <p class="text-gray-500 text-justify">
            <b>Importante:</b> Ao desativar sua conta, esta só poderá ser reativada pelos
            administradores do sistema. Portanto, caso tenha interesse em desativar esteja ciente
            que para uma futura reativação, é necessário o contato com os administradores dessa
            instância do sistema Lapsus.
          </p>
          <div class="flex">
            <button
              class="ml-auto my-4 p-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition
              duration-300 ease-in-out"
              @click="openModal"
            >
              Desativar Conta
            </button>
          </div>
        </card>
      </template>
      <card v-else>
        <h2 class="font-bold text-gray-500">Informações Pessoais</h2>
        <hr class="my-4" />
        <div class="flex p-6 rounded-md bg-gray-100 font-semibold text-center text-gray-400 h-full">
          <p class="mx-auto my-auto">Não foi possível carregar as informações do perfil</p>
        </div>
      </card>
    </section>
  </base-template>
  <teleport to="body">
    <modal
      v-if="user"
      v-show="isModalDeactivateOpen"
      title="Desativar conta"
      size="w-4/5 md:w-2/4 lg:w-1/4"
      @close="closeModal"
    >
      <p>{{ user.name }}, você está prestes a desativar sua conta, deseja continuar?</p>
      <button :disabled="blockAction" @click="deactivateAccount">Sim</button>
    </modal>
  </teleport>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import ProfileForm from '../components/forms/ProfileForm.vue';
import Modal from '../components/Modal.vue';

import User from '../services/users/User';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    ProfileForm,
    Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      isModalDeactivateOpen: false,

      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token', 'user', 'profilePic']),
  },
  methods: {
    ...mapMutations({ updateUser: 'setUser' }),
    ...mapActions(['logout']),
    openModal() {
      this.isModalDeactivateOpen = true;
    },
    closeModal() {
      this.isModalDeactivateOpen = false;
    },
    async deactivateAccount() {
      this.blockAction = true;

      const result = await User.deactivate(this.token, this.user.id);
      if (result.success) {
        this.logout();
        this.$router.replace('/login');
      } else {
        this.closeModal();
        this.showInformation(2, result.message);
      }

      this.blockAction = false;
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
};
</script>
