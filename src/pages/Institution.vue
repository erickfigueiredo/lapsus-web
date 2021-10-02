<template>
  <base-layout>
    <section class="md:flex md:space-x-4 md:h-4/5">
      <card responsivity="mb-4 md:mb-0 md:w-1/2 lg:w-2/6">
        <h2 class="font-bold text-gray-500">Cadastro de Instituições</h2>
        <hr class="my-4" />
        <institution-form />
      </card>
    </section>
  </base-layout>
</template>

<script>
import Base from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';
import InstitutionForm from '../components/forms/InstitutionForm.vue';

export default {
  components: {
    BaseLayout: Base,
    Card: BaseCard,
    InstitutionForm,
  },
};
</script>
