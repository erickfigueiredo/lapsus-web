<template>
  <card class="mt-8 mb-4">
    <div class="xl:flex xl:flex-row-reverse">
      <div class="flex xl:w-1/4">
        <button class="btn-primary ml-auto my-4" @click="openModal">Cadastrar Usuário</button>
      </div>
      <hr class="xl:hidden" />
      <div class="xl:w-3/4">
        <form class="xl:flex" @submit.prevent="submitSearch">
          <div class="xl:w-6/12">
            <label for="search" class="block my-2 text-gray-500 font-semibold"> Pesquisar </label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Buscar em administradores"
              class="form-control xl:rounded-r-none"
              v-model="search"
            />
          </div>
          <div class="flex xl:w-6/12">
            <div class="w-1/3">
              <label for="who" class="block my-2 text-gray-500 font-semibold"> Status </label>
              <select
                id="who"
                name="who"
                v-model="who"
                class="form-control rounded-r-none xl:rounded-l-none"
              >
                <option value="both" selected>Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
            </div>
            <div class="w-1/3">
              <label for="order" class="block my-2 text-gray-500 font-semibold"> Ordem </label>
              <select id="order" name="order" v-model="order" class="form-control rounded-none">
                <option value="asc" selected>Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>
            <div class="w-1/3">
              <button
                class="form-control font-semibold mt-10 rounded-l-none truncate hover:bg-gray-600
                hover:text-lemon-400 hover:border-gray-600 transition duration-300"
              >
                <font-awesome :icon="['fas', 'search']" />
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <hr class="my-4" />
    <base-table>
      <template #header>
        <tr>
          <th class="px-5 py-3 border-b-2 border-gray-200">Nome</th>
          <th class="px-5 py-3 border-b-2 border-gray-200">Sobrenome</th>
          <th class="px-5 py-3 border-b-2 border-gray-200">E-mail</th>
          <th class="px-5 py-3 border-b-2 border-gray-200">Data Criação</th>
          <th class="px-5 py-3 border-b-2 border-gray-200">Status</th>
        </tr>
      </template>
      <template #body>
        <tr v-for="adm in admins" :key="adm.id" class="hover:bg-gray-100">
          <td class="px-5 py-5 border-b border-gray-200">
            <span class="text-gray-900">{{ adm.name }}</span>
          </td>
          <td class="px-5 py-5 border-b border-gray-200">
            <span class="text-gray-900">{{ adm.surname }}</span>
          </td>
          <td class="px-5 py-5 border-b border-gray-200">
            <a :href="`mailto:${adm.email}`" class="text-gray-900">{{ adm.email }}</a>
          </td>
          <td class="px-5 py-5 border-b border-gray-200 hidden md:table-cell">
            <span class="text-gray-900">{{ adm.created_at }} </span>
          </td>
          <td class="px-5 py-5 border-b border-gray-200">
            <span
              class="font-semibold"
              :class="adm.is_active ? 'text-green-600' : 'text-red-700'"
              >{{ adm.is_active ? "Ativo" : "Desativado" }}</span
            >
          </td>
        </tr>
      </template>
    </base-table>
    <div v-if="!admins.length" class="bg-gray-100 rounded-md p-6">
      <div class="flex font-semibold text-center text-gray-400 h-full">
        <p class="mx-auto my-auto">Não há usuários para serem exibidos</p>
      </div>
    </div>
    <pagination
      v-if="admins.length"
      :current="parseInt(pagination.currentPage)"
      :last="parseInt(pagination.lastPage)"
      @change-page="paginate"
    />
  </card>
  <modal
    v-show="isModalActive"
    title="Cadastrar Administrador"
    size="w-4/5 md:w-2/4 lg:w-1/4"
    @close="closeModal"
  >
    <user-form
      user-type="A"
      :to-update="false"
      @form-response="showInformation"
      @form-data="addUser"
    />
  </modal>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import { mapGetters } from 'vuex';

import BaseCard from '../../components/BaseCard.vue';
import BaseTable from '../../components/BaseTable.vue';
import Pagination from '../../components/Pagination.vue';
import Modal from '../../components/Modal.vue';
import UserForm from '../../components/forms/UserForm.vue';

import Admin from '../../services/users/Admin';

export default {
  components: {
    Card: BaseCard,
    BaseTable,
    Pagination,
    Modal,
    UserForm,
  },
  computed: {
    ...mapGetters(['token']),
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      search: '',
      who: 'both',
      order: 'asc',

      admins: [],
      pagination: {},

      changeSearchParams: false,

      isModalActive: false,

      blockAction: false,

      user: {},
      index: null,
    };
  },
  watch: {
    search() {
      this.changeSearchParams = true;
    },
    who() {
      this.changeSearchParams = true;
    },
    order() {
      this.changeSearchParams = true;
    },
  },
  methods: {
    addUser(user) {
      if (this.search === '' && this.who !== 'inactive' && (this.pagination.currentPage || 0) < 2) {
        const compAsc = (userA, userB) => {
          const comp = userA.name.localeCompare(userB.name, 'pt-BR', { sensitivity: 'base' });
          if (!comp) {
            return userA.surname.localeCompare(userB.surname, 'pt-BR', { sensitivity: 'base' });
          }
          return comp;
        };

        const compDsc = (userA, userB) => {
          const comp = userB.name.localeCompare(userA.name, 'pt-BR', { sensitivity: 'base' });
          if (!comp) {
            return userB.surname.localeCompare(userA.surname, 'pt-BR', { sensitivity: 'base' });
          }
          return comp;
        };

        this.admins.push(user);
        this.admins.sort(this.order === 'asc' ? compAsc : compDsc);

        if (this.admins.length > this.pagination.perPage) {
          this.admins.pop();

          if (this.pagination.currentPage === this.pagination.lastPage) {
            this.pagination.lastPage += 1;
          }
        }
      }
    },
    openModal() {
      this.isModalActive = true;
    },
    closeModal() {
      this.isModalActive = false;
    },
    async submitSearch() {
      if (this.changeSearchParams) {
        this.changeSearchParams = false;
        await this.paginate();
      }
    },
    async paginate(page = 0) {
      const result = await Admin.index(this.token, page, this.search, this.who, this.order);

      if (result.success) {
        this.admins = result.user.data;
        this.pagination = result.user.pagination;
      } else {
        this.showInformation(3, result.message);

        if (this.admins.length) {
          this.admins = [];
          this.pagination = {};
        }
      }
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
    await this.paginate();
  },
};
</script>
