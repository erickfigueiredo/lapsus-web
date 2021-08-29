<template>
  <h1 class="text-center">Teste de envio de formulário</h1>
  <input type="file" id="file" @change="handleFileUpload()"/>

</template>

<script>
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFileUpload() {
      // console.log(e.target.files[0]);

    },
    submitForm() {

    },
  },
};
</script>
