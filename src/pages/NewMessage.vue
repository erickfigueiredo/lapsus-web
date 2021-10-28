<template>
  <base-template>
    <card>
      <contact-form @form-response="showInformation" />
    </card>
  </base-template>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import ContactForm from '../components/forms/ContactForm.vue';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    ContactForm,
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
