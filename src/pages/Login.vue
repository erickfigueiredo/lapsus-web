<template>
  <facade>
    <template #form>
      <login-form @form-response="showInformation" />
    </template>
  </facade>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Facade from '../templates/FacadeTemplate.vue';
import LoginForm from '../components/forms/LoginForm.vue';

export default {
  components: {
    Facade,
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
      }, 3000);
    },
  },
};
</script>
