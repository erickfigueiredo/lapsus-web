<template>
  <base-template>
    <h2 class="text-2xl my-4 text-gray-600">{{ greeting }}</h2>
    <section class="flex space-x-8 mt-8 mb-8">
      <card>{{ count.categories || 0 }} Categorias</card>
      <card>{{ count.institutions || 0 }} Instituições </card>
      <card>{{ count.shapefiles || 0 }} Shapefiles </card>
    </section>
    <section class="flex">
      <card title="Relação de Tipos de Usuário">
        <doughnut-chart
          :data="[1, 2, 4, 8]"
          :legend="['Admins', 'Moderadores', 'Registrados', 'Técnicos']"
          :colours="['#ffd6a5', '#99d98c', '#4361ee', '#f72585']"
        />
      </card>
    </section>
  </base-template>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseTemplate from '../templates/BaseTemplate.vue';
import Card from '../components/BaseCard.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';

export default {
  components: {
    BaseTemplate,
    Card,
    DoughnutChart,
  },
  data() {
    return {
      period: 'Olá',
      intervalId: null,

      count: {},
      user: {},
    };
  },

  computed: {
    ...mapGetters(['token', 'userName']),
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
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>
