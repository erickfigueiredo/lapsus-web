<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="flex justify-between">
      <span class="text-gray-500 font-semibold"
        >Modo de {{ isEnabled ? "Edição" : "Visualização" }}</span
      >
      <input id="mode" name="mode" type="checkbox" class="toggle" v-model="isEnabled" />
    </div>
    <div class="my-4">
      <label for="sys_name">
        Nome da Instância do Sistema
      </label>
      <input
        id="sys_name"
        type="text"
        name="sys_name"
        v-model="name"
        placeholder="Informe o nome do sistema"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        :disabled="!isEnabled"
        required
      />
    </div>
    <div class="my-4">
      <label for="sys_name">
        Identificador do Sistema (UUID)
      </label>
      <input
        id="sys_uuid"
        type="text"
        name="sys_uuid"
        v-model="uuid"
        placeholder="Informe o uuid do sistema"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        :disabled="!isEnabled"
        required
      />
    </div>
    <base-button v-show="isEnabled" name="Atualizar Configurações" :isBlocked="blockAction" />
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

      const result = await Settings.update(
        this.token,
        {
          name: this.name,
          uuid: this.uuid,
        },
      );

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

<style>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

input[type="checkbox"]:focus {
  outline: 0;
}

.toggle {
  height: 32px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid #4b5563;
  background: linear-gradient(180deg, #2d2f39 0%, #1f2027 100%);
  transition: all 0.2s ease;
}

.toggle:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle:checked {
  border-color: #e4ee3f;
  background: #e4ee3f;
}
.toggle:checked:after {
  transform: translatex(20px);
}
</style>
