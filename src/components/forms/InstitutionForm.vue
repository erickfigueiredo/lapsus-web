<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div className="my-4">
      <label for="name" className="block my-2 text-gray-500 font-semibold">
        Nome
      </label>
      <input
        id="name"
        type="text"
        name="name"
        v-model="name"
        placeholder="Nome da Instituição"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
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
        placeholder="E-mail da Instituição"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div className="my-4">
      <label for="phone" className="block my-2 text-gray-500 font-semibold">
        Telefone
      </label>
      <input
        id="phone"
        type="tel"
        name="phone"
        v-model="phone"
        placeholder="Telefone de Contato"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div className="my-4">
      <label for="address" className="block my-2 text-gray-500 font-semibold">
        Endereço
      </label>
      <textarea
        id="address"
        name="address"
        v-model="address"
        rows="2"
        placeholder="Informe o endereço"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
      />
    </div>
    <!-- Mudar Base button pra receber um slot -->
    <base-button name="Cadastrar" :isBlocked="blockAction" />
  </form>
</template>

<script>
// Name, phone, address, email, added_by

// Passar endereço para rua, bairro, estado, numero, complemento, cidade, país
import BaseButton from '../BaseButton.vue';
import Institution from '../../services/Institution';

export default {
  components: {
    BaseButton,
  },
  data() {
    return {
      id: null,
      name: '',
      email: '',
      phone: '',
      address: '',

      added_by: '',

      blockAction: false,
    };
  },
  methods: {
    async submitForm() {
      this.blockAction = true;

      const result = await Institution.create();
      console.log(result);

      this.blockAction = false;
    },

  },
};
</script>
