<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="email" class="block my-2 text-gray-500 font-semibold"> E-mail </label>
      <input
        id="email"
        type="email"
        name="email"
        v-model="email"
        placeholder="email@exemplo.com"
        class="form-control"
        required
      />
    </div>
    <div class="my-4">
      <label for="password" class="block my-2 text-gray-500 font-semibold"> Senha </label>
      <input
        id="password"
        type="password"
        name="password"
        v-model="password"
        placeholder="********"
        class="form-control"
        required
      />
    </div>
    <base-button :isBlocked="blockAction"> Login </base-button>
  </form>
  <router-link to="/cadastro" class="block text-sm text-center text-gray-400 hover:text-lemon-500">
    Não tem uma conta? Cadastre-se
  </router-link>
  <span
    v-show="showResetPass"
    class="cursor-pointer block text-sm text-center text-gray-400 hover:text-lemon-500"
    @click="$emit('form-action')"
  >
    Esqueci a senha
  </span>
</template>

<script>
import BaseButton from '../BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-action'],
  data() {
    return {
      email: '',
      password: '',

      showResetPass: false,
      blockAction: false,
    };
  },
  methods: {
    async submitForm() {
      this.blockAction = true;

      const result = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });

      if (result.success) {
        this.$router.replace('/home');
      } else {
        this.showResetPass = true;
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
};
</script>
