<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div v-if="toUpdate" class="flex justify-between">
      <span class="text-gray-500 font-semibold"
        >Modo de {{ isEnabled ? "Edição" : "Visualização" }}</span
      >
      <input id="mode" name="mode" type="checkbox" class="toggle" v-model="isEnabled" />
    </div>
    <div class="my-4">
      <label for="name" class="block my-2 text-gray-500 font-semibold">
        Nome
      </label>
      <input
        id="name"
        type="text"
        name="name"
        v-model="name"
        placeholder="Nome da Instituição"
        spellcheck="true"
        class="form-control"
        :disabled="!isEnabled"
        required
      />
    </div>
    <div class="my-0 md:my-4 md:flex md:space-x-4">
      <div class="my-4 md:my-0 md:w-full">
        <label for="email" class="block my-2 text-gray-500 font-semibold">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          v-model="email"
          placeholder="E-mail da Instituição"
          class="form-control"
          :disabled="!isEnabled"
          required
        />
      </div>
      <div class="my-4 md:my-0 md:w-full">
        <label for="phone" class="block my-2 text-gray-500 font-semibold">
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
          :disabled="!isEnabled"
          required
        />
      </div>
    </div>
    <div class="my-0 md:my-4 md:flex md:space-x-4">
      <div class="w-full my-4 md:my-0 md:w-2/5">
        <label for="street" class="block my-2 text-gray-500 font-semibold">
          Logradouro
        </label>
        <input
          id="street"
          type="text"
          name="street"
          v-model="street"
          placeholder="Logradouro"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled || foundAddress || isSearching"
          required
        />
      </div>
      <div class="w-full my-4 md:my-0 md:w-2/5">
        <label for="neighborhood" class="block my-2 text-gray-500 font-semibold">
          Bairro
        </label>
        <input
          id="neighborhood"
          type="text"
          name="neighborhood"
          v-model="neighborhood"
          placeholder="Bairro"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled || foundAddress || isSearching"
          required
        />
      </div>
      <div class="w-full my-4 md:my-0 md:w-1/5">
        <label for="zipcode" class="block my-2 text-gray-500 font-semibold">
          CEP
        </label>
        <input
          id="zipcode"
          type="text"
          name="zipcode"
          v-model="zipcode"
          placeholder="CEP"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled || isSearching"
          required
        />
      </div>
    </div>
    <div class="my-0 md:my-4 md:flex md:space-x-4">
      <div class="w-full my-4 md:my-0 md:w-1/4">
        <label for="number" class="block my-2 text-gray-500 font-semibold">
          Número
        </label>
        <input
          id="number"
          type="text"
          name="number"
          v-model="number"
          placeholder="Número"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled"
          required
        />
      </div>
      <div class="w-full my-4 md:my-0 md:w-2/4">
        <label for="city" class="block my-2 text-gray-500 font-semibold">
          Cidade
        </label>
        <input
          id="city"
          type="text"
          name="city"
          v-model="city"
          placeholder="Cidade"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled || foundAddress || isSearching"
          required
        />
      </div>
      <div class="w-full my-4 md:my-0 md:w-1/4">
        <label for="state" class="block my-2 text-gray-500 font-semibold">
          Estado
        </label>
        <select
          name="state"
          id="state"
          v-model="state"
          class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
          outline-none border-2 border-gray-200 focus:border-gray-400"
          :disabled="!isEnabled || foundAddress || isSearching"
          required
        >
          <option value="" disabled selected hidden>Selecione um Estado...</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RR">Roraima</option>
          <option value="RO">Rondônia</option>
          <option value="RO">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
      </div>
    </div>
    <base-button
      v-show="!toUpdate || isEnabled"
      :isBlocked="blockAction"
    >
      {{ toUpdate ? 'Atualizar' : 'Cadastrar' }}
    </base-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';
import Institution from '../../services/Institution';

import ViaCep from '../../services/ViaCep';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-data'],
  props: {
    fillData: {
      type: Object,
      default() {
        return {
          id: null,
          name: '',
          email: '',
          phone: '',
          street: '',
          neighborhood: '',
          number: '',
          city: '',
          state: '',
          zipcode: '',
        };
      },
    },
    toUpdate: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: this.fillData.id,
      name: this.fillData.name,
      email: this.fillData.email,
      phone: this.fillData.phone,
      street: this.fillData.street,
      neighborhood: this.fillData.neighborhood,
      number: this.fillData.number,
      city: this.fillData.city,
      state: this.fillData.state,
      zipcode: this.fillData.zipcode,

      isSearching: false,
      foundAddress: false,
      isEnabled: false,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  watch: {
    async zipcode(value) {
      // eslint-disable-next-line radix
      const num = parseInt(value);

      if (!Number.isNaN(num) && num.toString().length === 8 && this.isEnabled) {
        this.isSearching = true;

        const result = await ViaCep.getAddressByCEP(value);
        this.isSearching = false;

        if (result.erro || !result.success) {
          this.foundAddress = false;
          this.$emit('form-response', 3, result.message);
        } else {
          this.foundAddress = true;

          this.street = result.address.logradouro;
          this.neighborhood = result.address.bairro;
          this.city = result.address.localidade;
          this.state = result.address.uf;
        }
      }
    },
  },
  methods: {
    clearForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.street = '';
      this.neighborhood = '';
      this.number = '';
      this.city = '';
      this.state = '';
      this.zipcode = '';
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        street: this.street,
        neighborhood: this.neighborhood,
        number: this.number,
        city: this.city,
        state: this.state,
        zipcode: this.zipcode,
      };

      if (this.toUpdate) {
        data.id = this.id;

        const result = await Institution.update(this.token, data);
        if (result.success) {
          this.name = result.institution.name;
          this.email = result.institution.email;
          this.phone = result.institution.phone;
          this.street = result.institution.street;
          this.neighborhood = result.institution.neighborhood;
          this.number = result.institution.number;
          this.city = result.institution.city;
          this.state = result.institution.state;
          this.zipcode = result.institution.zipcode;

          this.isEnabled = false;

          this.$emit('form-response', 1, 'Instituição atualizada com sucesso!');
          this.$emit('form-data', result.institution);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        const result = await Institution.create(this.token, data);

        if (result.success) {
          this.clearForm();

          this.$emit('form-response', 1, 'Instituição cadastrada com sucesso!');
          this.$emit('form-data', result.institution);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      }
      this.blockAction = false;
    },
  },
  beforeMount() {
    if (!this.toUpdate) this.isEnabled = true;
  },
};
</script>
