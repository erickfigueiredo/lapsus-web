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
        placeholder="Informe um nome"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div className="my-4">
      <label for="desc" className="block my-2 text-gray-500 font-semibold">
        Descrição
      </label>
      <textarea
        id="desc"
        name="desc"
        v-model="desc"
        rows="10"
        placeholder="Informe uma breve descrição"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <base-button name="Cadastrar" :isBlocked="blockAction" />
  </form>
</template>

<script>
import BaseButton from '../BaseButton.vue';
import Category from '../../services/Category';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-data'],
  props: {
    data: {
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
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      id: this.data.id,
      name: this.data.name,
      desc: this.data.desc,

      blockAction: false,
    };
  },
  methods: {
    clearForm() {
      this.name = '';
      this.desc = '';
    },
    async submitForm() {
      this.blockAction = true;

      if (this.toUpdate) {
        console.log(this.toUpdate);
      } else {
        const result = await Category.create({
          name: this.name,
          desc: this.desc,
        });

        if (result.success) {
          this.$emit('form-response', 1, 'Categoria cadastrada com Successo!');
          this.$emit('form-data', result.category);
        } else {
          this.$emit('form-response', 3, result.message);
        }

        this.clearForm();
      }

      this.blockAction = false;
    },
  },
};
</script>
