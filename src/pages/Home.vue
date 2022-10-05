<template>
  <base-template>
    <h2 class="text-2xl my-4 text-gray-600">{{ greeting }}</h2>
    <section class="sm:flex sm:space-x-8 mt-8 mb-8">
      <card class="font-semibold text-gray-500">
        <font-awesome :icon="['fas', 'tasks']" class="text-xl mr-2" />
        {{ count.categories || 0 }} {{count.categories == 1 ? "Categoria" : "Categorias"}}
      </card>
      <card class="mt-4 sm:mt-0 font-semibold text-gray-500">
        <font-awesome :icon="['fas', 'landmark']" class="text-xl mr-2" />
        {{ count.institutions || 0 }} {{count.institutions == 1 ? "Instituição" : "Instituições"}}
      </card>
      <card class="mt-4 sm:mt-0 font-semibold text-gray-500">
        <font-awesome :icon="['fas', 'layer-group']" class="text-xl mr-2" />
        {{ count.shapefiles || 0 }} {{count.shapefiles == 1 ? "Shapefile" : "Shapefiles"}}
      </card>
    </section>
    <section class="lg:flex lg:space-x-4 lg:my-4 overflow-x-auto">
      <card
        v-if="['A', 'T'].includes(userType)"
        class="my-4 lg:my-0"
        title="Relação de Leitura de Mensagens"
      >
        <doughnut-chart
          v-if="contact.show"
          :data="contact.data"
          :legend="['Lidos', 'Pendentes']"
          :colors="['#4361ee', '#ade8f4']"
        />
        <div v-else class="bg-gray-100 rounded-md p-6">
          <div class="flex font-semibold text-center text-gray-400 h-full">
            <p class="mx-auto my-auto">Não há informações do relacionamento de leitura</p>
          </div>
        </div>
      </card>
      <card v-if="userType !== 'R'" class="my-4 lg:my-0" title="Relação de Contribuições">
        <doughnut-chart
          v-if="contribution.show"
          :data="contribution.data"
          :legend="['Aprovadas', 'Reprovadas', 'Pendentes']"
          :colors="['#99d98c', '#f72585', '#4a4e69']"
        />
        <div v-else class="bg-gray-100 rounded-md p-6">
          <div class="flex font-semibold text-center text-gray-400 h-full">
            <p class="mx-auto my-auto">Não há informações do relacionamento de contribuições</p>
          </div>
        </div>
      </card>
    </section>
    <template v-if="userType === 'A'">
      <section class="flex space-x-4 my-4">
        <card title="Relação de Usuários">
          <doughnut-chart
            v-if="userT.show"
            :data="userT.data"
            :legend="['Administradores', 'Moderadores', 'Registrados', 'Técnicos']"
            :colors="['#126782', '#5bba6f', '#ffdd00', '#9d4edd']"
          />
          <div v-else class="bg-gray-100 rounded-md p-6">
            <div class="flex font-semibold text-center text-gray-400 h-full">
              <p class="mx-auto my-auto">Não há informações do relacionamento de usuários</p>
            </div>
          </div>
        </card>
      </section>
      <section class="flex space-x-4 my-4">
        <card title="Cadastro Mensal de Usuários">
          <bars-chart
            v-if="userA.show"
            label="Novos usuários Mensalmente"
            :data="userA.data"
            :legend="userA.legend"
            color="#dddf00"
          />
          <div v-else class="bg-gray-100 rounded-md p-6">
            <div class="flex font-semibold text-center text-gray-400 h-full">
              <p class="mx-auto my-auto">Não há informações sobre a relação mensal de usuários</p>
            </div>
          </div>
        </card>
      </section>
    </template>
  </base-template>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import Card from '../components/BaseCard.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';
import BarsChart from '../components/charts/BarsChart.vue';

import Category from '../services/Category';
import Institution from '../services/Institution';
import Shapefile from '../services/Shapefile';
import Contact from '../services/Contact';
import Contribution from '../services/Contribution';
import User from '../services/users/User';

export default {
  components: {
    BaseTemplate,
    Card,
    DoughnutChart,
    BarsChart,
  },
  data() {
    return {
      period: 'Olá',
      intervalId: null,

      count: {
        category: 0,
        institution: 0,
        shapefile: 0,
      },
      contact: { show: false, data: [0, 0] },
      contribution: { show: false, data: [0, 0, 0] },
      userT: { show: false, data: [0, 0, 0, 0] },
      userA: { show: false, data: [], legend: [] },
    };
  },

  computed: {
    ...mapGetters(['token', 'userName', 'userType']),
    greeting() {
      return `${this.period}, ${this.userName}!`;
    },
  },
  methods: {
    setPeriod() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        this.period = 'Bom dia';
      } else if (hour >= 12 && hour < 18) {
        this.period = 'Boa tarde';
      } else {
        this.period = 'Boa noite';
      }
    },
  },
  async mounted() {
    this.setPeriod();
    this.intervalId = setInterval(this.setPeriod, 3_600_000);

    // Chama as estatisticas iniciais
    const cat = await Category.getAmount(this.token);
    if (cat.success) {
      this.count.categories = cat.amount;
    }

    const inst = await Institution.getAmount(this.token);
    if (inst.success) {
      this.count.institutions = inst.amount;
    }

    const shp = await Shapefile.getAmount(this.token);
    if (shp.success) {
      this.count.shapefiles = shp.amount;
    }

    // Estatisticas gráficas
    if (this.userT !== 'R') {
      const contrib = await Contribution.getPublishRelationship(this.token);
      if (contrib.success) {
        // eslint-disable-next-line no-restricted-syntax
        for (const c of contrib.contribution) {
          if (c.status === 'A') {
            this.contribution.data[0] = c.amount;
          } else if (c.status === 'R') {
            this.contribution.data[1] = c.amount;
          } else {
            this.contribution.data[2] = c.amount;
          }
        }

        this.contribution.show = true;
      }

      if (this.userType === 'A') {
        // Verifica se o usuário é ADMIN
        let user = await User.getTypeRelationship(this.token);
        if (user.success) {
          // eslint-disable-next-line no-restricted-syntax
          for (const u of user.user) {
            if (u.type === 'A') {
              this.userT.data[0] = u.amount;
            } else if (u.type === 'M') {
              this.userT.data[1] = u.amount;
            } else if (u.type === 'R') {
              this.userT.data[2] = u.amount;
            } else {
              this.userT.data[3] = u.amount;
            }
          }

          this.userT.show = true;
        }

        user = await User.getAmountUserMonthly(this.token);
        if (user.success) {
          // eslint-disable-next-line no-restricted-syntax
          for (const u of user.user) {
            this.userA.data.push(u.amount);
            this.userA.legend.push(`${u.month.toString().padStart(2, '0')}/${u.year}`);
          }

          this.userA.show = true;
        }
      }

      if (['A', 'T'].includes(this.userType)) {
        const ctt = await Contact.getReadRelationship(this.token);
        if (ctt.success) {
          if (ctt.contact.length === 2) {
            this.contact.data[0] = parseInt(ctt.contact[0].amount, 10);
            this.contact.data[1] = parseInt(ctt.contact[1].amount, 10);
          } else {
            this.contact.data[0] = parseInt(ctt.contact[0].amount, 10);
          }

          this.contact.show = true;
        }
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>
