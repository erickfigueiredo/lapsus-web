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
          v-model="form.name"
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
          v-model="form.surname"
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
        v-model="form.email"
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
          type="password"
          name="password"
          v-model="form.password"
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
          type="password"
          name="passwordConf"
          v-model="passwordConf"
          placeholder="Digite novamente"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
              outline-none border-2 border-gray-200 focus:border-gray-400"
          required
        />
      </div>
    </div>
    <div v-if="passwordConflict" class="border-2 border-red-500 bg-red-300 p-2 rounded-lg">
      <p class="text-sm text-red-500">
        As senhas não coincidem!
      </p>
    </div>
    <button
      className="w-full mt-4 p-2 bg-gray-700 text-yellow-600 hover:bg-yellow-600
          hover:text-white rounded-md cursor-pointer font-semibold transition delay-75
          duration-300 ease-in-out"
      :disabled="blockAction || passwordConflict"
    >
      Cadastrar
    </button>
  </form>
  <router-link to="/login" class="block text-sm text-center text-gray-400 hover:text-yellow-600"
    >Já possui uma conta? Faça login</router-link
  >
</template>

<script>
export default {
  emits: {},
  data() {
    return {
      form: {
        name: '',
        surname: '',
        email: '',
        password: '',
      },

      passwordConf: '',
      passwordConflict: false,

      blockAction: false,
    };
  },
  watch: {
    passwordConf() {
      if (
        this.form.password
        && this.passwordConf.length > 0
        && this.form.password !== this.passwordConf
      ) {
        this.passwordConflict = true;
      } else {
        this.passwordConflict = false;
      }
    },
    // eslint-disable-next-line
    'form.password': function () {
      if (
        this.passwordConf
        && this.form.password.length > 0
        && this.form.password !== this.passwordConf
      ) {
        this.passwordConflict = true;
      } else {
        this.passwordConflict = false;
      }
    },
  },
};
</script>
