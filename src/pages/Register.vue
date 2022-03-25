<template>
  <facade-template>
    <template #form>
      <div class="flex justify-center mb-8">
        <div>
          <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
        </div>
      </div>
      <register-form @form-response="showInformation" />
      <router-link to="/login" class="block text-sm text-center text-gray-400 hover:text-lemon-500">
        Já possui uma conta? Faça login
      </router-link>
    </template>
  </facade-template>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import FacadeTemplate from '../templates/FacadeTemplate.vue';
import RegisterForm from '../components/forms/RegisterForm.vue';

export default {
  components: {
    FacadeTemplate,
    RegisterForm,
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
