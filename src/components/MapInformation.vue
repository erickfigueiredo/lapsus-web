<template>
  <aside
    class="hidden p-4 w-72 transition duration-300 transform bg-gray-700 overflow-y-auto
    lg:translate-x-0 lg:block"
  >
    <h3 class="text-white font-semibold mb-2">Legenda</h3>
    <section v-if="legend.length" class="h-4/6 p-2 rounded-lg bg-white overflow-y-auto">
      <ul>
        <li v-for="(l, i) in legend" class="mb-1" :key="i">
          <img class="float-left" :src="url + l.uri" alt="{{l.title}}" />
          <span class="ml-1">{{ l.title }}</span>
        </li>
      </ul>
      <p>Não há legenda para ser exibida</p>
    </section>
    <div v-else class="flex font-semibold text-center rounded-lg bg-gray-100 text-gray-400 h-3/6">
      <p class="mx-auto my-auto">
        Não há legenda para ser exibida
      </p>
    </div>
    <h3 class="text-white font-semibold mt-8 mb-2">Contatos de Emergência</h3>
    <section v-if="contacts.length" class="h-1/6 overflow-y-auto text-white">
      <ul>
        <li v-for="(c, i) in contacts" class="mb-1" :key="i">
          <span class="ml-1">{{ `${c.name}: ${formatPhone(c.phone)}` }}</span>
        </li>
      </ul>
    </section>
    <div v-else class="flex font-semibold text-center rounded-lg bg-gray-100 text-gray-400 h-2/6">
      <p class="mx-auto my-auto">
        Não há contatos para serem exibidos
      </p>
    </div>
  </aside>
</template>

<script>
import { apiURL } from '../services/AxiosSettings';

import genericMask from '../utils/genericMask';

export default {
  props: {
    contacts: {
      type: Array,
      required: true,
    },
    legend: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      url: apiURL,
    };
  },
  methods: {
    formatPhone(phone) {
      return genericMask(phone, phone.length === 10 ? '(##) ####-####' : '(##) #####-####');
    },
  },
};
</script>
