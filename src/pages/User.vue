<template>
  <base-template>
    <card>
      <h2 class="font-bold text-gray-500">Níveis de Usuário</h2>
      <hr class="my-4" />
      <p class="text-gray-500 text-center mb-4">
        Selecione um dos níveis de usuário abaixo.
      </p>
      <nav class="flex flex-wrap justify-between md:justify-center md:space-x-4">
        <div class="my-4">
          <router-link to="/usuarios/cadastrados" class="btn-primary w-full">
            Cadastrados <font-awesome :icon="['fas', 'user']" class="text-xl ml-2"
          /></router-link>
        </div>
        <div class="my-4">
          <router-link to="/usuarios/moderadores" class="btn-primary w-full">
            Moderadores <font-awesome :icon="['fas', 'user-shield']" class="text-xl ml-2"
          /></router-link>
        </div>
        <div class="my-4">
          <router-link to="/usuarios/tecnicos" class="btn-primary w-full">
            Técnicos <font-awesome :icon="['fas', 'user-cog']" class="text-xl ml-2"
          /></router-link>
        </div>
        <div class="my-4">
          <router-link to="/usuarios/administradores" class="btn-primary w-full"
            >Administradores <font-awesome :icon="['fas', 'user-tie']" class="text-xl ml-2"
          /></router-link>
        </div>
      </nav>
    </card>
    <router-view />
  </base-template>
</template>

<script>
import BaseTemplate from '../templates/BaseTemplate.vue';
import BaseCard from '../components/BaseCard.vue';

export default {
  components: {
    BaseTemplate,
    Card: BaseCard,
  },
};
</script>
