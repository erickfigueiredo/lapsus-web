<template>
  <div class="flex h-screen">
    <section className="hidden lg:block lg:w-1/2 bg-gray-700"></section>
    <section className="flex w-full lg:w-1/2 justify-center items-center bg-lemon-500">
      <div className=" w-10/12 md:w-2/3 p-4 items-center bg-white rounded-lg shadow-lg">
        <register-form />
      </div>
    </section>
  </div>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import RegisterForm from '../components/forms/RegisterForm.vue';

export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
    };
  },
  methods: {
    methods: {
      showInformation(flag, message) {
        this.floatData.flag = flag;
        this.floatData.message = message;

        setTimeout(() => {
          this.floatData.flag = 0;
          this.floatData.message = '';
        }, 3000);
      },
    },
  },
};
</script>
