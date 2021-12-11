<template>
  <form>
    <button type="button" @click="addField"> Adicionar + </button>
    <div v-for="n in numFields" :key="n">
      <select
        :ref="'field'+n"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
      >
        <option value="Opção1">Opção Selecinada</option>
        <option value="Opção2">Opção Selecinada1</option>
        <option value="Opção3">Opção Selecinada2</option>
      </select>
    </div>
    <button type="button" @click="removeField()"> Diminuir - </button>
    <button type="button" @click="showInfo">Clique aqui</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      numFields: 0,
    };
  },
  methods: {
    addField() {
      this.info.push({ a: '' });
      this.numFields += 1;
    },
    removeField() {
      if (this.numFields > 0) { this.numFields -= 1; }
    },
    showInfo() {
      for (let i = 0; i < this.numFields; i += 1) {
        console.log(this.$refs[`field${i + 1}`].value);
      }
    },
  },
};
</script>
