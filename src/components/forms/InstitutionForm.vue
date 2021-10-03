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
    <div class="my-0 md:my-4 md:flex md:space-x-4">
      <div className="my-4 md:my-0 md:w-full">
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
      <div className="my-4 md:my-0 md:w-full">
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
        required
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

import genericMask from '../../utils/genericMask';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response'],
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
    clearForm() {},
    formatPhone() {
      const formated = genericMask(this.phone, '(##)####-####');
      if (formated) {
        this.phone = formated;
      } else {
        const formatedCell = genericMask(this.phone, '(##)#####-####');
        if (formated) {
          this.phone = formatedCell;
        }
      }
    },
    async submitForm() {
      this.blockAction = true;

      const result = await Institution.create({
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        added_by: 1,
      });

      if (result.success) {
        this.$emit('form-response', 1, 'Instituição cadastrada com sucesso!');
        // this.$emit('form-data', result.category);
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
};
</script>
