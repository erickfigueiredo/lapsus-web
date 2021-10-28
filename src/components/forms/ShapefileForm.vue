<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="name" class="block my-2 text-gray-500 font-semibold">
        Título
      </label>
      <input
        id="name"
        type="text"
        name="name"
        v-model="title"
        placeholder="Informe um Título"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
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
        rows="5"
        placeholder="Informe uma breve descrição"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        required
      />
    </div>
    <div v-if="!toUpdate" class="my-4">
      <label for="desc" class="block my-2 text-gray-500 font-semibold">
        Arquivo
      </label>
      <input
        id="shape"
        type="file"
        name="shape"
        ref="file"
        accept=".zip"
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
import Shapefile from '../../services/Shapefile';

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
          title: '',
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
      id: this.fillData.id,
      title: this.fillData.title,
      desc: this.fillData.desc,

      blockAction: false,
    };
  },
  methods: {
    clearForm() {
      this.title = '';
      this.desc = '';
      this.$refs.file.value = null;
    },
    async submitForm() {
      this.blockAction = true;

      const data = {
        title: this.title,
        desc: this.desc,
      };

      if (this.toUpdate) {
        data.id = this.id;

        const result = await Shapefile.update(data);
        if (result.success) {
          this.name = result.shapefile.title;
          this.desc = result.shapefile.desc;

          this.$emit('form-response', 1, 'Categoria atualizada com sucesso!');
          this.$emit('form-data', result.shapefile);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        data.added_by = '1';

        const formData = new FormData();

        formData.append('file', this.$refs.file.files[0]);
        formData.append('data', JSON.stringify(data));

        const result = await Shapefile.create(formData);

        if (result.success) {
          this.$emit('form-response', 1, 'Shapefile implantado com sucesso!');
          this.$emit('form-data', result.shapefile);
        } else {
          this.$emit('fomr-response', 3, result.message);
        }

        this.clearForm();
      }

      this.blockAction = false;
    },
  },
};
</script>
