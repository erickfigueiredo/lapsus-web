<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="category" class="block my-2 text-gray-500 font-semibold">
        Tipo de Evento
      </label>
      <select
        id="category"
        name="category"
        v-model="id_category"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400
        capitalize truncate"
      >
        <option
          v-for="cat in categoryList"
          :key="cat.id"
          :value="cat.id"
          class="capitalize truncate"
          >{{ cat.name }}</option
        >
      </select>
    </div>
    <div class="flex my-4 ">
      <label for="risk" class="text-gray-500 font-semibold">
        Risco de Dano à Pessoas ou Materiais:
      </label>
      <span class="mx-2">{{ risk ? "Sim" : "Não" }}</span>
      <input id="risk" name="risk" type="checkbox" class="toggle" v-model="risk" />
    </div>
    <div class="flex my-4 ">
      <label for="victims" class="text-gray-500 font-semibold">
        Pessoas Feridas ou Desaparecidas:
      </label>
      <span class="mx-2">{{ victims ? "Sim" : "Não" }}</span>
      <input id="victims" name="victims" type="checkbox" class="toggle" v-model="victims" />
    </div>
    <div class="my-4">
      <label for="occurrence" class="block my-2 text-gray-500 font-semibold">
        Momento da Ocorrência
      </label>
      <input
        id="occurrence"
        name="occurrence"
        v-model="occurrence"
        type="datetime-local"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
      />
    </div>
    <div class="my-4">
      <label for="annexes" class="block my-2 text-gray-500 font-semibold">
        Anexos
      </label>
      <input
        id="annexes"
        name="annexes"
        type="file"
        ref="files"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        multiple
      />
    </div>
    <div class="my-4">
      <label for="desc" class="block my-2 text-gray-500 font-semibold">
        Descrição
      </label>
      <textarea
        id="desc"
        name="desc"
        v-model="desc"
        rows="4"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
      />
    </div>
    <base-button name="Cadastrar Contribuição" :isBlocked="blockAction" />
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';

import Contribution from '../../services/Contribution';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response'],
  props: {
    categoryList: {
      type: Array,
      required: true,
    },
    coords: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id_category: null,
      occurrence: null,
      desc: '',
      risk: false,
      victims: false,

      blockAction: false,
    };
  },
  methods: {
    clearForm() {
      this.id_category = null;
      this.occurrence = null;
      this.desc = '';
      this.risk = false;
      this.victims = false;
      this.$refs.files.value = null;
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        id_category: this.id_category,
        occurrence: this.occurrence,
        desc: this.desc,
        risk_damage: this.risk,
        victims: this.victims,
        local: this.coords,
        id_collaborator: 2,
      };

      const formData = new FormData();
      for (let i = 0; i < this.$refs.files.files.length; i += 1) {
        formData.append('file', this.$refs.files.files[i]);
      }

      formData.append('data', JSON.stringify(data));

      const result = await Contribution.create(formData);
      if (result.success) {
        this.clearForm();
        this.$emit('form-response', 1, 'Categoria cadastrada com sucesso!');
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
