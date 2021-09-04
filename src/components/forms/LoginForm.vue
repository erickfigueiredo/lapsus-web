<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div className="my-4">
      <label for="email" className="block my-2 text-gray-500 font-semibold">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        name="email"
        v-model="email"
        placeholder="email@exemplo.com"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div className="my-4">
      <label for="password" className="block my-2 text-gray-500 font-semibold">
        Senha
      </label>
      <input
        id="password"
        type="password"
        name="password"
        v-model="password"
        placeholder="********"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <base-button name="Login" :isBlocked="blockAction" />
  </form>
  <router-link to="/cadastro" class="block text-sm text-center text-gray-400 hover:text-lemon-500">
    Não tem uma conta? Cadastre-se
  </router-link>
</template>

<script>
import BaseButton from '../BaseButton.vue';
import Access from '../../services/Access';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response'],
  data() {
    return {
      email: '',
      password: '',

      blockAction: false,
    };
  },
  methods: {
    async submitForm() {
      this.blockAction = true;

      const result = await Access.login({
        email: this.email,
        password: this.password,
      });

      if (!result.success) {
        this.$emit('form-response', 3, result.message);
      } else {
        this.$router.push('/cadastro');
      }

      this.blockAction = false;
    },
  },
};
</script>
