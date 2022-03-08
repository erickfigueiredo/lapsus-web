<template>
  <facade-template>
    <template #form>
      <div class="flex justify-center mb-8">
        <div>
          <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
        </div>
      </div>
      <login-form @form-action="openModal" @form-response="showInformation" />
    </template>
  </facade-template>
  <teleport to="body">
    <modal
      v-show="isModalActive"
      title="Redefinição de Senha"
      size="w-4/5 lg:w-2/4 lg:w-1/4"
      @close="closeModal"
    >
      <token-form @form-action="closeModal" @form-response="showInformation" />
    </modal>
  </teleport>
  <div
    class="fixed bottom-2 lg:bottom-8 right-2 lg:right-8 animate-bounce rounded-md shadow-md
    text-white bg-cerulean-600 p-2"
  >
    <router-link to="/contribuicao">Não tem cadastro?<br />Contribua de forma anônima!</router-link>
  </div>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import FacadeTemplate from '../templates/FacadeTemplate.vue';
import LoginForm from '../components/forms/LoginForm.vue';
import TokenForm from '../components/forms/TokenForm.vue';
import Modal from '../components/Modal.vue';

export default {
  components: {
    FacadeTemplate,
    LoginForm,
    Modal,
    TokenForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      isModalActive: false,
    };
  },
  methods: {
    openModal() {
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
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
