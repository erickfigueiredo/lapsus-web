<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="flex justify-between">
      <span class="text-gray-500 font-semibold"
        >Modo de {{ isEnabled ? "Edição" : "Visualização" }}</span
      >
      <input id="mode" name="mode" type="checkbox" class="toggle" v-model="isEnabled" />
    </div>
    <div class="my-4">
      <label for="sys_name" class="block my-2 text-gray-500 font-semibold">
        Nome da Instância do Sistema
      </label>
      <input
        id="sys_name"
        type="text"
        name="sys_name"
        v-model="name"
        placeholder="Informe o nome do sistema"
        spellcheck="true"
        class="form-control"
        :disabled="!isEnabled"
        required
      />
    </div>
    <div class="my-4">
      <label for="sys_uuid" class="block my-2 text-gray-500 font-semibold">
        Identificador do Sistema (UUID)
      </label>
      <input
        id="sys_uuid"
        type="text"
        name="sys_uuid"
        v-model="uuid"
        placeholder="Informe o uuid do sistema"
        spellcheck="true"
        class="form-control"
        :disabled="!isEnabled"
        required
      />
    </div>
    <base-button v-show="isEnabled" :isBlocked="blockAction">
      Atualizar Configurações
    </base-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';

import Settings from '../../services/Settings';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response'],
  props: {
    fillData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.fillData.name,
      uuid: this.fillData.uuid,

      isEnabled: false,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    async submitForm() {
      this.blockAction = true;

      const result = await Settings.update(this.token, {
        name: this.name,
        uuid: this.uuid,
      });

      if (result.success) {
        this.isEnabled = false;
        this.$emit('form-response', 1, 'Configurações Atualizadas!');
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
};
</script>
