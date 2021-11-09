<template>
  <div>
    <contribution-form :category-list="categories" />
    <input type="text" v-model="valor" @keyup="brlMoneyFormat" />
  </div>
  <test-form :a="aa" :key="ab"/>
  <button @click="teste">Clique</button>
</template>

<script>
import ContributionForm from '../components/forms/ContributionForm.vue';
import TestForm from '../components/TestForm.vue';

import Category from '../services/Category';

export default {
  components: {
    ContributionForm,
    TestForm,
  },
  data() {
    return {
      categories: [],
      valor: '',
      aa: '',
      ab: 0,
    };
  },
  methods: {
    teste() {
      this.aa += 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
      this.ab += 1;

      console.log(this.ab);
    },
    brlMoneyFormat() {
      let v = this.valor.replace(/\D/g, '');
      v = `${(v / 100).toFixed(2)}`;
      v = v.replace('.', ',');
      v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
      v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
      this.valor = v;
    },
  },
  async mounted() {
    const result = await Category.index();

    if (result.success) {
      this.categories = result.category;
    }
  },
};
</script>
