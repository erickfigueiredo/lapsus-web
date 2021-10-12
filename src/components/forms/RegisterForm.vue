<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="flex-none md:flex md:my-4 md:space-x-4">
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="name" className="block my-2 text-gray-500 font-semibold">
          Nome
        </label>
        <input
          id="name"
          type="text"
          name="name"
          v-model="name"
          placeholder="Seu nome"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
          required
        />
      </div>
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="surname" className="block my-2 text-gray-500 font-semibold">
          Sobrenome
        </label>
        <input
          id="surname"
          type="text"
          name="surname"
          v-model="surname"
          placeholder="Sobrenome"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
          required
        />
      </div>
    </div>
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
    <div class="flex-none md:flex md:my-4 md:space-x-4">
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="name" className="block my-2 text-gray-500 font-semibold">
          Senha
        </label>
        <input
          id="password"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          v-model="password"
          placeholder="Sua senha"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
          required
        />
      </div>
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="passwordConf" className="block my-2 text-gray-500 font-semibold">
          Confirme a senha
        </label>
        <input
          id="passwordConf"
          :type="passwordVisible ? 'text' : 'password'"
          name="passwordConf"
          v-model="passwordConf"
          placeholder="Digite novamente"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
          required
        />
      </div>
    </div>
    <p class="text-sm text-right text-gray-400 cursor-pointer" @click="toggleVisiblePassword">
      {{ passwordVisible ? "Ocultar" : "Mostrar" }} senha
    </p>
    <div v-if="passwordConflict" class="border-2 border-red-500 bg-red-300 p-2 rounded-lg">
      <p class="text-sm text-red-500">
        As senhas não coincidem!
      </p>
    </div>
    <base-button name="Cadastrar" :isBlocked="blockAction || passwordConflict" />
  </form>
  <router-link to="/login" class="block text-sm text-center text-gray-400 hover:text-lemon-500">
    Já possui uma conta? Faça login
  </router-link>
</template>

<script>
import BaseButton from '../BaseButton.vue';

import Registered from '../../services/users/Registered';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response'],
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',

      passwordVisible: false,

      passwordConf: '',
      passwordConflict: false,

      blockAction: false,
    };
  },
  watch: {
    passwordConf() {
      if (this.password && this.passwordConf && this.password !== this.passwordConf) {
        this.passwordConflict = true;
      } else {
        this.passwordConflict = false;
      }
    },
    password() {
      if (this.passwordConf && this.password && this.password !== this.passwordConf) {
        this.passwordConflict = true;
      } else {
        this.passwordConflict = false;
      }
    },
  },
  methods: {
    toggleVisiblePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    clearForm() {
      this.name = '';
      this.surname = '';
      this.email = '';
      this.password = '';
      this.passwordConf = '';
    },
    async submitForm() {
      this.blockAction = true;
      if (this.password === this.passwordConf) {
        const result = await Registered.create({
          name: this.name,
          surname: this.surname,
          email: this.email,
          password: this.password,
        });
        if (result.success) {
          this.clearForm();

          this.$emit('form-response', 1, 'Cadastro Realizado com sucesso!');
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        this.$emit('form-response', 2, 'As senhas não coincidem');
      }

      this.blockAction = false;
    },
  },
};
</script>
