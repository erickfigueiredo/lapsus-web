<template>
  <facade-template>
    <template #form>
      <login-form @form-response="showInformation" />
    </template>
  </facade-template>
  <p @click="test" class="text-center">{{$store.state.counter}}</p>
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
    test() {
      this.$store.state.counter += 2;
    },
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
