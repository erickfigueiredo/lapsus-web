<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="flex-none md:flex md:my-4 md:space-x-4">
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="name" class="block my-2 text-gray-500 font-semibold">
          Nome
        </label>
        <input
          id="name"
          type="text"
          name="name"
          v-model="name"
          placeholder="Seu nome"
          class="form-control"
          required
        />
      </div>
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="surname" class="block my-2 text-gray-500 font-semibold">
          Sobrenome
        </label>
        <input
          id="surname"
          type="text"
          name="surname"
          v-model="surname"
          placeholder="Sobrenome"
          class="form-control"
          required
        />
      </div>
    </div>
    <div class="my-4">
      <label for="email" class="block my-2 text-gray-500 font-semibold">
        E-mail
      </label>
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
    <div class="flex-none md:flex md:my-4 md:space-x-4">
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="name" class="block my-2 text-gray-500 font-semibold">
          Senha
        </label>
        <input
          id="password"
          :type="passwordVisible ? 'text' : 'password'"
          name="password"
          v-model="password"
          placeholder="Sua senha"
          class="form-control"
          required
        />
      </div>
      <div class="my-4 md:w-1/2 md:my-0">
        <label for="passwordConf" class="block my-2 text-gray-500 font-semibold">
          Confirme a senha
        </label>
        <input
          id="passwordConf"
          :type="passwordVisible ? 'text' : 'password'"
          name="passwordConf"
          v-model="passwordConf"
          placeholder="Digite novamente"
          class="form-control"
          required
        />
      </div>
    </div>
    <p class="text-sm text-right text-gray-400 cursor-pointer my-2" @click="toggleVisiblePassword">
      {{ passwordVisible ? "Ocultar" : "Mostrar" }} senha
    </p>
    <div v-if="passwordConflict" class="border-2 border-red-500 bg-red-300 p-2 rounded-lg">
      <p class="text-sm text-red-500">
        As senhas não coincidem!
      </p>
    </div>
    <base-button :isBlocked="blockAction || passwordConflict">
      Cadastrar
    </base-button>
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';

import User from '../../services/users/User';

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
        const result = await User.create({
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
        this.$emit('form-response', 2, 'As senhas não coincidem!');
      }

      this.blockAction = false;
    },
  },
};
</script>
