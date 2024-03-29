<template>
  <base-template>
    <section class="md:flex md:space-x-4">
      <card title="Cadastro de Categorias" responsivity="mb-4 md:mb-0 md:w-1/2 lg:w-2/6">
        <category-form @form-response="showInformation" @form-data="addCategory" />
      </card>
      <card responsivity="md:w-1/2 lg:w-4/6">
        <list-load v-if="isLoading" />
        <div v-else class="bg-gray-100 rounded-md p-6 h-full overflow-y-auto">
          <ul v-if="categories.length">
            <template v-for="(cat, i) in categories" :key="cat.id">
              <li
                v-if="
                  i === 0 ||
                  cat.name[0].localeCompare(categories[i - 1].name[0], 'pt-BR', {
                    sensitivity: 'base',
                  })
                "
                class="capitalize p-2 rounded-md bg-cerulean-400 text-white my-2"
              >
                {{ normalizeIndex(cat.name[0]) }}
              </li>
              <li class="my-2 mx-6 lg:flex">
                <p class="my-2 capitalize truncate">
                  {{ cat.name }}
                </p>
                <div class="ml-auto flex">
                  <button
                    class="p-2 bg-cerulean-500 hover:bg-cerulean-700 text-white rounded-md
                    transition delay-50 duration-300 ease-in-out" @click="openModal(i)"
                  >
                    Atualizar
                  </button>
                  <button
                    class="ml-auto lg:ml-2 p-2 bg-red-500 hover:bg-red-700 text-white rounded-md
                    transition delay-50 duration-300 ease-in-out" @click="openModal(i, true)"
                  >
                    Deletar
                  </button>
                </div>
              </li>
              <hr
                v-if="
                  i < categories.length - 1 &&
                  !cat.name[0].localeCompare(categories[i + 1].name[0], 'pt-BR', {
                    sensitivity: 'base',
                  })
                "
              />
            </template>
          </ul>
          <div v-else class="flex font-semibold text-center text-gray-400 h-full">
            <p class="mx-auto my-auto">Não há categorias para serem exibidas</p>
          </div>
        </div>
      </card>
    </section>
  </base-template>
  <teleport to="body">
    <modal
      v-show="isModalUpdateActive"
      title="Atualizar Categoria"
      size="w-4/5 md:w-2/4 lg:w-1/4"
      @close="closeModal"
    >
      <category-form
        :key="category.id"
        @form-response="showInformation"
        @form-data="updateCategory"
        :fill-data="category"
        :to-update="true"
      />
    </modal>
    <modal
      v-show="isModalDeleteActive"
      title="Deletar Categoria"
      size="w-4/5 md:w-2/4 lg:w-1/4"
      @close="closeModal(true)"
    >
      <p>Tem certeza que deseja deletar "{{ category.name }}"?</p>
      <div class="flex">
        <button
          class="ml-auto p-2 bg-red-500 hover:bg-red-700 text-white rounded-md
          transition delay-50 duration-300 ease-in-out"
          :disabled="blockAction"
          @click="deleteCategory"
        >
          deletar
        </button>
      </div>
    </modal>
  </teleport>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import CategoryForm from '../components/forms/CategoryForm.vue';
import Modal from '../components/Modal.vue';
import ListLoad from '../components/loads/ListLoad.vue';

import Category from '../services/Category';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
    CategoryForm,
    Modal,
    ListLoad,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },

      blockAction: false,
      isLoading: true,

      isModalUpdateActive: false,
      isModalDeleteActive: false,

      categories: [],

      category: {},
      index: null,
    };
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {
    addOrdered(array, begin, end, cat) {
      const index = Math.floor((begin + end) / 2);

      if (
        !array[index].name.localeCompare(cat.name, 'pt-BR', { sensitivity: 'base' })
        || begin === end
      ) {
        if (array[index].name.localeCompare(cat.name, 'pt-BR', { sensitivity: 'base' }) <= 0) {
          array.splice(index + 1, 0, cat);
        } else {
          array.splice(index, 0, cat);
        }
        return null;
      }

      if (array[index].name.localeCompare(cat.name, 'pt-BR', { sensitivity: 'base' }) < 0) {
        return this.addOrdered(array, index + 1, end, cat);
      }
      return this.addOrdered(array, begin, index, cat);
    },
    addCategory(category) {
      if (!this.categories.length) {
        this.categories.push(category);
      } else {
        this.addOrdered(this.categories, 0, this.categories.length - 1, category);
      }
    },
    updateCategory(category) {
      if (this.categories[this.index].name !== category.name) {
        this.categories.splice(this.index, 1);
        this.addOrdered(this.categories, 0, this.categories.length - 1, category);
      } else {
        this.categories[this.index] = category;
      }
    },
    async deleteCategory() {
      this.blockAction = true;
      const result = await Category.delete(this.token, this.category.id);

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
      this.index = index;
      this.category = this.categories[index];

      if (isDelete) {
        this.isModalDeleteActive = true;
      } else this.isModalUpdateActive = true;
    },
    closeModal(isDelete = false) {
      if (isDelete) {
        this.isModalDeleteActive = false;
      } else this.isModalUpdateActive = false;
    },
    normalizeIndex(char) {
      return char.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 5000);
    },
  },
  async mounted() {
    const result = await Category.indexDetailed(this.token);

    if (result.success) {
      this.categories = result.category;
    } else {
      this.showInformation(3, result.message);
    }

    this.isLoading = false;
  },
};
</script>
