<template>
  <facade-template>
    <template #form>
      <div class="flex justify-center mb-8">
        <div>
          <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
        </div>
      </div>
      <login-form @form-response="showInformation" />
    </template>
  </facade-template>
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

export default {
  components: {
    FacadeTemplate,
    LoginForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
    };
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
  },
};
</script>
