<template>
  <form @submit.prevent="submitForm">
    <div class="flex-none md:flex md:my-4 md:space-x-4">
      <div class="my-4 md:w-1/2 md:my-0">
        <label :for="`name-${i}`" class="block my-2 text-gray-500 font-semibold">
          Nome
        </label>
        <input
          :id="`name-${i}`"
          type="text"
          name="name"
          v-model="name"
          placeholder="Nome"
          class="form-control"
          required
        />
      </div>
      <div class="my-4 md:w-1/2 md:my-0">
        <label :for="`surname-${i}`" class="block my-2 text-gray-500 font-semibold">
          Sobrenome
        </label>
        <input
          :id="`surname-${i}`"
          type="text"
          name="surname"
          v-model="surname"
          placeholder="Sobrenome"
          class="form-control"
          required
        />
      </div>
    </div>
    <div v-if="toUpdate === true && (userType === 'R' || userType === 'M')" class="my-4">
      <label :for="`type-${i}`" class="block my-2 text-gray-500 font-semibold">
        Tipo
      </label>
      <select :id="`type-${i}`" name="type" v-model="type" class="form-control" required>
        <option value="R">Cadastrado</option>
        <option value="M">Moderador</option>
      </select>
    </div>
    <div v-if="userType === 'T'" class="my-4">
      <label :for="`institution-${i}`" class="block my-2 text-gray-500 font-semibold">
        Instituição
      </label>
      <select
        :id="`institution-${i}`"
        name="institution"
        v-model="id_institution"
        class="form-control"
        required
      >
        <option v-for="inst in institutionList" :key="inst.id" :value="inst.id">{{
          inst.name
        }}</option>
      </select>
    </div>
    <div class="my-4">
      <label :for="`email-${i}`" class="block my-2 text-gray-500 font-semibold">
        E-mail
      </label>
      <input
        :id="`email-${i}`"
        type="email"
        name="email"
        v-model="email"
        placeholder="email@exemplo.com"
        class="form-control"
        required
      />
    </div>
    <div v-if="toUpdate" class="flex my-4 ">
      <label :for="`change-pass-${i}`" class="text-gray-500 font-semibold">
        Deseja alterar a senha?
      </label>
      <span class="mx-2">{{ changePass ? "Sim" : "Não" }}</span>
      <input
        :id="`change-pass-${i}`"
        name="change-pass"
        type="checkbox"
        class="toggle ml-auto"
        v-model="changePass"
      />
    </div>
    <div v-if="!toUpdate || changePass" class="my-4">
      <label :for="`password-${i}`" class="block my-2 text-gray-500 font-semibold">
        Senha
      </label>
      <input
        :id="`password-${i}`"
        :type="passwordVisible ? 'text' : 'password'"
        name="password"
        v-model="password"
        placeholder="Senha"
        class="form-control"
        required
      />
      <p
        class="text-sm text-right text-gray-400 cursor-pointer my-2"
        @click="toggleVisiblePassword"
      >
        {{ passwordVisible ? "Ocultar" : "Mostrar" }} senha
      </p>
    </div>
    <base-button :is-blocked="blockAction">{{ toUpdate ? "Atualizar" : "Cadastrar" }}</base-button>
  </form>
</template>
<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';

import Admin from '../../services/users/Admin';
import Moderator from '../../services/users/Moderator';
import Registered from '../../services/users/Registered';
import Technician from '../../services/users/Technician';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-data'],
  props: {
    i: {
      type: Number,
      default: 0,
    },
    userType: {
      type: String,
      validator(value) {
        return ['A', 'T', 'M', 'R'].includes(value);
      },
      required: true,
    },
    toUpdate: {
      type: Boolean,
      required: true,
    },
    fillData: {
      type: Object,
      default() {
        return {
          id: null,
          name: '',
          surname: '',
          email: '',
          type: '',
          id_institution: null,
        };
      },
    },
    institutionList: {
      type: Array,
    },
  },
  data() {
    return {
      id: this.fillData.id,
      name: this.fillData.name,
      surname: this.fillData.surname,
      type: this.fillData.type,
      email: this.fillData.email,
      id_institution: this.fillData.id_institution,
      password: '',

      changePass: false,
      passwordVisible: false,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['user', 'token']),
  },
  methods: {
    clearForm() {
      this.name = '';
      this.surname = '';
      this.type = '';
      this.email = '';
      this.password = '';
      this.id_institution = null;
    },
    toggleVisiblePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    async submitForm() {
      this.blockAction = true;
      // Adicionar evento next action para fechar modal
      const requestOptions = {
        create: {
          A: Admin.create,
          T: Technician.create,
          M: Moderator.create,
          R: Registered.create,
        },
        update: {
          T: Technician.update,
          M: Moderator.update,
          R: Registered.update,
        },
      };

      const data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password || undefined,
      };

      if (this.userType === 'T') {
        data.id_institution = this.id_institution;
      }

      if (this.toUpdate) {
        data.id = this.id;

        if (this.userType === 'M' || this.userType === 'R') {
          data.type = this.type;
        }

        const result = await requestOptions.update[this.userType](this.token, data);
        if (result.success) {
          this.$emit('form-response', 1, 'Usuário atualizado com sucesso!');
          this.$emit('form-data', result.user);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        const result = await requestOptions.create[this.userType](this.token, data);
        if (result.success) {
          this.clearForm();

          this.$emit('form-response', 1, 'Usuário cadastrado com sucesso!');
          this.$emit('form-data', result.user);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      }

      this.blockAction = false;
    },
  },
};
</script>
