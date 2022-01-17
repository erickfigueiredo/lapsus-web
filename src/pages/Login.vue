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
    class="fixed right-2 md:right-8 rounded-lg bottom-2 md:bottom-8 p-2 bg-cerulean-700
    hover:bg-green-500 animate-bounce transition duration-200"
  >
    <router-link to="/contribuicao" class="text-white font-semibold">
      Faça uma contribuição no mapa!
    </router-link>
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
