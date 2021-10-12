<template>
  <form>
    <div v-for="c in count" :key="c">
      <label>Campo {{ c }}</label>
      <input type="text" :ref="'teste'+c"/>
    </div>
  </form>
  <button @click="addButton">+</button>
  <button @click="removeButton">-</button>
  <button @click="submitForm">Enviar</button>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addButton() {
      this.count += 1;
    },
    removeButton() {
      if (this.count >= 1) this.count -= 1;
    },
    submitForm() {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.count; i++) {
        console.log(this.$refs[`teste${i + 1}`].value);
      }
    },
  },
};
</script>
