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
        rows="5"
        placeholder="Informe uma breve descrição"
        spellcheck="true"
        class="form-control"
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
        class="form-control"
        required
      />
    </div>
    <base-button :isBlocked="blockAction">
      {{ toUpdate ? 'Atualizar' : 'Cadastrar' }}
    </base-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters(['token']),
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

        const result = await Shapefile.update(this.token, data);
        if (result.success) {
          this.name = result.shapefile.title;
          this.desc = result.shapefile.desc;

          this.$emit('form-response', 1, 'Categoria atualizada com sucesso!');
          this.$emit('form-data', result.shapefile);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      } else {
        const formData = new FormData();

        if (!data.desc) delete data.desc;

        formData.append('file', this.$refs.file.files[0]);
        formData.append('data', JSON.stringify(data));

        const result = await Shapefile.create(this.token, formData);

        if (result.success) {
          this.clearForm();
          this.$emit('form-response', 1, 'Shapefile implantado com sucesso!');
          this.$emit('form-data', result.shapefile);
        } else {
          this.$emit('form-response', 3, result.message);
        }
      }

      this.blockAction = false;
    },
  },
};
</script>
