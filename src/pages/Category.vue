<template>
  <base-layout name="Categoria">
    <section class="md:flex space-x-4 h-4/5">
      <div class="bg-white w-full md:w-2/6 p-4 rounded-lg">
        <h2 class="font-bold text-gray-500">Cadastro de Categorias</h2>
        <hr class="my-4" />
        <category-form @form-response="showInformation" @form-data="attachCategory" />
      </div>
      <div class="w-full md:w-4/6 bg-white p-4 rounded-lg shadow-md overflow-auto">
        <ul>
          <li v-for="(cat, index) in categories" :key="cat.id">
            {{ cat.name }} - <span @click="openModal(index)">OpenModal</span>
          </li>
        </ul>
      </div>
    </section>
  </base-layout>

  <modal v-if="isModalActive" title="Teste">
    <category-form @form-response="showInformation" @form-data="attachCategory" :data="category" />
  </modal>

  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import CategoryForm from '../components/forms/CategoryForm.vue';
import Modal from '../components/Modal.vue';
// import TableData from '../components/TableData.vue';

import Category from '../services/Category';

export default {
  components: {
    BaseLayout: Base,
    CategoryForm,
    Modal,
    // TableData,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      isModalActive: false,
      categories: [],

      index: null,
      category: null,
    };
  },
  methods: {
    attachCategory(category) {
      // Melhorar metodo
      this.categories.push(category);
    },
    updateCategory() {

    },
    openModal(index) {
      this.isModalActive = true;

      this.category = this.categories[index];
    },
    closeModal() {
      console.log('Chamou');
      this.isModalActive = false;
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

    console.log(result);

    this.categories = result.category;
    // console.log(result.category.pagination);
  },
};
</script>
