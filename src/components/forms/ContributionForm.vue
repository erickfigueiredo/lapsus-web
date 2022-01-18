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
        class="form-control
        capitalize truncate"
        required
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
      <input id="risk" name="risk" type="checkbox" class="toggle" v-model="risk"/>
    </div>
    <div class="flex my-4 ">
      <label for="victims" class="text-gray-500 font-semibold">
        Pessoas Feridas ou Desaparecidas:
      </label>
      <span class="mx-2">{{ victims ? "Sim" : "Não" }}</span>
      <input id="victims" name="victims" type="checkbox" class="toggle" v-model="victims"/>
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
        class="form-control"
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
        class="form-control"
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
        class="form-control"
      />
    </div>
    <base-button :isBlocked="blockAction">
      Cadastrar Contribuição
    </base-button>
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';

import Contribution from '../../services/Contribution';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'next-action'],
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
        id_category: this.id_category || undefined,
        occurrence: this.occurrence || undefined,
        desc: this.desc || undefined,
        risk_damage: this.risk,
        victims: this.victims,
        local: this.coords,
        id_collaborator: this.$store.getters.user?.id,
      };

      const formData = new FormData();
      for (let i = 0; i < this.$refs.files.files.length; i += 1) {
        formData.append('file', this.$refs.files.files[i]);
      }

      formData.append('data', JSON.stringify(data));

      const result = await Contribution.create(formData);
      if (result.success) {
        this.clearForm();
        this.$emit('next-action');
        this.$emit('form-response', 1, 'Contribuição cadastrada com sucesso!');
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
};
</script>
