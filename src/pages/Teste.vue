<template>
  <h1 class="text-center">Teste de envio de formulário</h1>
  <input type="file" id="file" @change="handleFileUpload()"/>
  <ul>
    <li v-for="q in a" :key="q.index">
      {{ q.value}}
    </li>
  </ul>
  <button @click="teste()">Clique aqui</button>
</template>

<script>
export default {
  data() {
    return {
      a: [
        { index: 1, value: 'a' },
        { index: 2, value: 'b' },
        { index: 3, value: 'c' },
      ],
      file: null,
    };
  },
  methods: {
    handleFileUpload() {
      // console.log(e.target.files[0]);

    },
    teste() {
      this.a.push({ index: 4, value: 'd' });
    },
    submitForm() {

    },
  },
};
</script>
