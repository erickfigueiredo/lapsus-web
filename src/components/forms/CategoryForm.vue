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
        class="form-control"
        required
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
        rows="9"
        placeholder="Informe uma breve descrição"
        spellcheck="true"
        class="form-control"
      />
    </div>
    <base-button :isBlocked="blockAction">
      {{ toUpdate ? "Atualizar" : "Cadastrar" }}
    </base-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';
import Category from '../../services/Category';

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
          desc: '',
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
      desc: this.fillData.desc,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    clearForm() {
      this.name = '';
      this.desc = '';
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        name: this.name,
        desc: this.desc,
      };

      if (this.toUpdate) {
        data.id = this.id;

        const result = await Category.update(this.token, data);
        if (result.success) {
          this.name = result.category.name;
          this.desc = result.category.desc;

          this.$emit('form-response', 1, 'Categoria atualizada com sucesso!');
          this.$emit('form-data', result.category);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        if (!data.desc) data.desc = undefined;

        const result = await Category.create(this.token, data);

        if (result.success) {
          this.clearForm();

          this.$emit('form-response', 1, 'Categoria cadastrada com sucesso!');
          this.$emit('form-data', result.category);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      }
      this.blockAction = false;
    },
  },
};
</script>
