<template>
  <base-layout>
    <section class="md:flex md:space-x-4 md:h-4/5">
      <card class="mb-4 md:mb-0 md:w-1/2">

      </card>
      <card class="md:w-1/2">
        <table-data></table-data>
      </card>
    </section>
  </base-layout>
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import TableData from '../components/TableData.vue';

export default {
  components: {
    BaseLayout: Base,
    Card: BaseCard,
    TableData,
  },
};
</script>
