<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="name" class="block my-2 text-gray-500 font-semibold">
        Nome
      </label>
      <input
        id="name"
        type="text"
        name="name"
        v-model="name"
        placeholder="Informe um nome"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div class="my-4">
      <label for="phone" class="block my-2 text-gray-500 font-semibold">
        Telefone
      </label>
      <input
        id="phone"
        type="tel"
        name="phone"
        v-model="phone"
        placeholder="Informe o telefone"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <base-button :name="toUpdate ? 'Atualizar' : 'Cadastrar'" :isBlocked="blockAction" />
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';
import EmergencyContact from '../../services/EmergencyContact';

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
          phone: '',
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
      phone: this.fillData.phone,

      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    clearForm() {
      this.name = '';
      this.phone = '';
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        name: this.name,
        phone: this.phone,
      };

      if (this.toUpdate) {
        data.id = this.id;

        const result = await EmergencyContact.update(this.token, data);
        if (result.success) {
          this.name = result.emContact.name;
          this.phone = result.emContact.phone;

          this.$emit('form-response', 1, 'Contato atualizado com sucesso!');
          this.$emit('form-data', result.emContact);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        const result = await EmergencyContact.create(this.token, data);

        if (result.success) {
          this.clearForm();

          this.$emit('form-response', 1, 'Contato cadastrado com sucesso!');
          this.$emit('form-data', result.emContact);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      }
      this.blockAction = false;
    },
  },
};
</script>
