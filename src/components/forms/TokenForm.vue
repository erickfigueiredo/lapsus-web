<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="email-reset" class="block my-2 text-gray-500 font-semibold"> E-mail </label>
      <input
        id="email-reset"
        type="email-reset"
        name="email-reset"
        v-model="email"
        placeholder="email@exemplo.com"
        class="form-control"
        required
      />
    </div>
    <base-button :isBlocked="blockAction">
      Enviar e-mail
    </base-button>
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';

import Access from '../../services/users/Access';

export default {
  emits: ['form-response', 'form-action'],
  components: {
    BaseButton,
  },
  data() {
    return {
      email: '',
      blockAction: false,
    };
  },
  methods: {
    async submitForm() {
      this.blockAction = true;
      const result = await Access.sendTokenResetPassword({ email: this.email });

      if (result.success) {
        this.$emit('form-response', 1, result.message);
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.$emit('form-action');

      this.email = '';
      this.blockAction = false;
    },
  },
};
</script>
