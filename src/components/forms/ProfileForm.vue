<template>
  <form @submit.prevent="submitForm">
    <div class="flex justify-between">
      <span class="text-gray-500 font-semibold"
        >Modo de {{ isEnabled ? "Edição" : "Visualização" }}</span
      >
      <input id="mode" name="mode" type="checkbox" class="toggle" v-model="isEnabled" />
    </div>
    <div class="my-0 md:my-4 md:flex md:space-x-4">
      <div class="w-full my-4 md:my-0">
        <label for="name" class="block my-2 text-gray-500 font-semibold">
          Nome
        </label>
        <input
          id="name"
          type="text"
          name="name"
          v-model="name"
          placeholder="Seu nome"
          spellcheck="true"
          :disabled="!isEnabled"
          class="form-control"
          required
        />
      </div>
      <div class="w-full my-4 md:my-0">
        <label for="surname" class="block my-2 text-gray-500 font-semibold">
          Sobrenome
        </label>
        <input
          id="surname"
          type="text"
          name="surname"
          v-model="surname"
          placeholder="Seu sobrenome"
          spellcheck="true"
          :disabled="!isEnabled"
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
        placeholder="Seu endereço de e-mail"
        spellcheck="true"
        :disabled="!isEnabled"
        class="form-control"
        required
      />
    </div>
    <div v-show="isEnabled">
      <hr />
      <div class="flex my-4 ">
        <label for="change-pass" class="text-gray-500 font-semibold">
          Deseja alterar a senha?
        </label>
        <span class="mx-2">{{ changePass ? "Sim" : "Não" }}</span>
        <input
          id="change-pass"
          name="change-pass"
          type="checkbox"
          class="toggle"
          v-model="changePass"
        />
      </div>
      <div v-if="changePass" class="p-2 rounded-md border-2 border-gray-200">
        <div class="my-4">
          <label for="pass" class="block my-2 text-gray-500 font-semibold">
            Senha Atual
          </label>
          <input
            id="pass"
            :type="passwordVisible ? 'text' : 'password'"
            name="pass"
            v-model="pass"
            :disabled="!isEnabled"
            placeholder="Informe sua senha"
            class="form-control"
            required
          />
        </div>
        <div class="my-4 flex space-x-4">
          <div class="w-full">
            <label for="new-pass" class="block my-2 text-gray-500 font-semibold">
              Nova Senha
            </label>
            <input
              id="new-pass"
              :type="passwordVisible ? 'text' : 'password'"
              name="new-pass"
              v-model="newPass"
              :disabled="!isEnabled"
              placeholder="Nova senha"
              class="form-control"
              required
            />
          </div>
          <div class="w-full">
            <label for="new-pass-conf" class="block my-2 text-gray-500 font-semibold">
              Confirme a nova senha
            </label>
            <input
              id="new-pass-conf"
              :type="passwordVisible ? 'text' : 'password'"
              name="new-pass-conf"
              v-model="newPassConf"
              :disabled="!isEnabled"
              placeholder="Digite a novamente"
              class="form-control"
              required
            />
          </div>
        </div>
        <p
          class="text-sm text-right text-gray-400 cursor-pointer my-2"
          @click="toggleVisiblePassword"
        >
          {{ passwordVisible ? "Ocultar" : "Mostrar" }} senha
        </p>
        <div v-if="passwordConflict" class="border-2 border-red-500 bg-red-300 p-2 rounded-lg">
          <p class="text-sm text-red-500">
            As senhas não coincidem!
          </p>
        </div>
      </div>
    </div>
    <base-button v-show="isEnabled" :is-blocked="blockAction || passwordConflict"
      >Atualizar perfil</base-button
    >
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';

import User from '../../services/users/User';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-data'],
  props: {
    fillData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.fillData.id,
      name: this.fillData.name,
      surname: this.fillData.surname,
      email: this.fillData.email,
      pass: '',
      newPass: '',
      newPassConf: '',
      passwordConflict: false,
      passwordVisible: false,

      isEnabled: false,
      changePass: false,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  watch: {
    newPass() {
      if (this.newPass && this.newPassConf && this.newPass !== this.newPassConf) {
        this.passwordConflict = true;
      } else {
        this.passwordConflict = false;
      }
    },
    newPassConf() {
      if (this.newPassConf && this.newPass && this.newPass !== this.newPassConf) {
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
      this.changePass = false;

      this.pass = '';
      this.newPass = '';
      this.newPassConf = '';
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        id: this.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
      };

      if (this.passwordConflict) {
        this.$emit('form-response', 2, 'As senhas não coincidem!');
      } else {
        if (this.changePass) {
          data.password = this.pass;
          data.new_password = this.newPass;
        }

        const result = await User.update(this.token, data);
        if (result.success) {
          this.isEnabled = false;

          if (this.changePass) {
            this.clearForm();
          }

          this.$emit('form-data', result.user);
          this.$emit('form-response', 1, 'Perfil Atualizado!');
        } else {
          this.$emit('form-response', 3, result.message);
        }
        this.blockAction = false;
      }
    },
  },
};
</script>
