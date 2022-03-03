<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="new-pass" class="block my-2 text-gray-500 font-semibold"> Nova senha </label>
      <input
        id="new-pass"
        :type="passwordVisible ? 'text' : 'password'"
        name="new-pass"
        v-model="password"
        placeholder="Informe a nova senha"
        spellcheck="true"
        class="form-control"
        required
      />
    </div>
    <div class="my-4">
      <label for="conf-new-pass" class="block my-2 text-gray-500 font-semibold">
        Confirme a nova senha
      </label>
      <input
        id="conf-new-pass"
        :type="passwordVisible ? 'text' : 'password'"
        name="conf-new-pass"
        v-model="passwordConf"
        placeholder="Confirme a nova senha"
        spellcheck="true"
        class="form-control"
        required
      />
    </div>
    <p class="text-sm text-right text-gray-400 cursor-pointer my-2" @click="toggleVisiblePassword">
      {{ passwordVisible ? "Ocultar" : "Mostrar" }} senha
    </p>
    <div v-if="passwordConflict" class="border-2 border-red-500 bg-red-300 p-2 rounded-lg">
      <p class="text-sm text-red-500">As senhas não coincidem!</p>
    </div>
    <base-button :isBlocked="blockAction || passwordConflict">Confirmar nova senha</base-button>
  </form>
  <router-link to="/login" class="block text-sm text-center text-gray-400 hover:text-lemon-500">
    Faça login
  </router-link>
</template>

<script>
import BaseButton from '../BaseButton.vue';
import Access from '../../services/users/Access';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-action'],
  props: {
    idUser: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      password: '',
      passwordConf: '',
      passwordVisible: false,
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
    async submitForm() {
      this.blockAction = true;
      if (!this.passwordConflict) {
        const result = await Access.resetUserPassword({
          password: this.password,
          id_user: this.idUser,
          token: this.token,
        });

        if (result.success) {
          this.$emit('form-response', 1, result.message);
          this.$emit('form-action');
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        this.$emit('form-response', 3, 'As senhas não coincidem!');
      }
      this.blockAction = false;
    },
  },
};
</script>
