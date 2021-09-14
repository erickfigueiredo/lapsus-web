<template>
  <base-layout>
    <section class="md:flex md:space-x-4 md:h-4/5">
      <card responsivity="mb-4 md:mb-0 md:w-2/6">
        <h2 class="font-bold text-gray-500">Cadastro de Categorias</h2>
        <hr class="my-4" />
        <category-form @form-response="showInformation" @form-data="addCategory" />
      </card>
      <card responsivity="md:w-4/6">
        <div class="bg-gray-100 rounded-md p-6 h-full overflow-y-auto">
          <ul>
            <template v-for="(cat, i) in categories" :key="cat.id">
              <li
                v-if="i === 0 || cat.name[0] !== categories[i - 1].name[0]"
                class="capitalize p-2 rounded-md bg-cerulean-400 text-white my-2"
              >
                {{ cat.name[0] }}
              </li>
              <li class="capitalize my-1 mx-6">
                {{ cat.name + " " + cat.id }} - <span @click="openModal(i)">Atualizar</span> -
                <span @click="openModal(i, true)">Deletar</span>
              </li>
            </template>
          </ul>
        </div>
      </card>
    </section>
  </base-layout>
  <modal v-if="isModalUpdateActive" title="Atualizar Categoria" size="w-1/4" @close="closeModal">
    <category-form
      @form-response="showInformation"
      @form-data="updateCategory"
      :fill-data="category"
      :to-update="true"
    />
  </modal>
  <modal
    v-if="isModalDeleteActive"
    title="Deletar Categoria"
    size="w-1/4"
    @close="closeModal(true)"
  >
    <p>Tem certeza que deseja deletar "{{ category.name }}"?</p>
    <button :disabled="blockAction" @click="deleteCategory">Sim</button>
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import CategoryForm from '../components/forms/CategoryForm.vue';
import Modal from '../components/Modal.vue';

import Category from '../services/Category';

export default {
  components: {
    BaseLayout: Base,
    Card: BaseCard,
    CategoryForm,
    Modal,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      blockAction: false,

      isModalUpdateActive: false,
      isModalDeleteActive: false,

      categories: [],

      category: null,
      index: null,
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    addOrdered(array, begin, end, cat) {
      const index = Math.floor((begin + end) / 2);

      if (array[index].name === cat.name || begin === end) {
        if (array[index].name <= cat.name) {
          array.splice(index + 1, 0, cat);
        } else {
          array.splice(index, 0, cat);
        }
        return null;
      }

      if (array[index].name < cat.name) {
        this.addOrdered(array, index + 1, end, cat);
      } else {
        this.addOrdered(array, begin, index, cat);
      }
    },
    addCategory(category) {
      this.addOrdered(this.categories, 0, this.categories.length - 1, category);
    },
    updateCategory(category) {
      this.categories[this.index] = category;
    },
    async deleteCategory() {
      this.blockAction = true;
      const result = await Category.delete(this.category.id);

      if (result.success) {
        this.categories.splice(this.index, 1);
        this.showInformation(1, result.message);
      } else {
        this.showInformation(3, result.message);
      }

      this.isModalDeleteActive = false;
      this.blockAction = false;
    },
    openModal(index, isDelete = false) {
      this.category = this.categories[index];
      this.index = index;

      if (isDelete) {
        this.isModalDeleteActive = true;
      } else this.isModalUpdateActive = true;
    },
    closeModal(isDelete = false) {
      if (isDelete) {
        this.isModalDeleteActive = false;
      } else this.isModalUpdateActive = false;
    },
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 3000);
    },
  },
  async mounted() {
    const result = await Category.index();

    if (result.success) {
      this.categories = result.category;
    } else {
      this.showInformation(3, result.message);
    }
  },
};
</script>
