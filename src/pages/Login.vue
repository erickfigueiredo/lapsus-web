<template>
  <div class="flex h-screen">
    <section className="hidden lg:block lg:w-1/2 bg-gray-700"></section>
    <section className="flex w-full lg:w-1/2 justify-center items-center bg-lemon-200">
      <div className=" w-11/12 md:w-1/2 p-4 items-center bg-white rounded-lg shadow-lg">
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
            />
          </div>
          <button
          className="w-full mt-4 p-2 bg-gray-700 text-yellow-600 hover:bg-yellow-600
          hover:text-white rounded-md cursor-pointer font-semibold transition delay-75
          duration-300 ease-in-out"
          :disabled="blockAction"
          >Login</button>
        </form>
        <router-link to="/cadastro"
        class="block text-sm text-center text-gray-400 hover:text-yellow-600"
        >Não tem uma conta? Cadastre-se</router-link>
      </div>
    </section>
  </div>
  <div class="absolute bg-white shadow-lg rounded-lg p-4 bottom-8 right-8">
    <p>Absolute child aaa</p>
  </div>
</template>

<script>
import Access from '../services/Access';

export default {
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

      const result = await Access.login({ email: this.email, password: this.password });
      console.log(result);
      this.blockAction = false;
    },
  },
};
</script>
