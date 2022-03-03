<template>
  <facade-template>
    <template #form>
      <div class="flex justify-center mb-8">
        <div>
          <img src="../assets/lapsus_logo.png" alt="Sistema Lapsus" class="w-32" />
        </div>
      </div>
      <form-load v-if="isLoading" />
      <template v-else>
        <reset-password-form
          v-if="status === 'PENDING'"
          :idUser="idUser"
          :token="token"
          @form-response="showInformation"
          @form-action="status = 'OK'"
        />
        <div
          v-else-if="status === 'REJECT'"
          class="font-semibold text-center text-gray-400 h-full"
        >
          <p class="mx-auto my-auto">O token informado é inválido</p>
          <p>
            <router-link
              to="/login"
              class="mt-4 block text-sm text-center text-gray-400 hover:text-lemon-500"
            >
              Faça login
            </router-link>
          </p>
        </div>
        <div v-else class="font-semibold text-center text-gray-400 h-full">
          <p class="mx-auto my-auto">Senha alterada</p>
          <router-link
            to="/login"
            class="mt-4 block text-sm text-center text-gray-400 hover:text-lemon-500"
          >
            Faça login
          </router-link>
        </div>
      </template>
    </template>
  </facade-template>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>
<script>
import FacadeTemplate from '../templates/FacadeTemplate.vue';
import ResetPasswordForm from '../components/forms/ResetPasswordForm.vue';
import FormLoad from '../components/loads/FormLoad.vue';

import Access from '../services/users/Access';

export default {
  components: {
    FacadeTemplate,
    FormLoad,
    ResetPasswordForm,
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      isLoading: true,
      status: 'REJECT',
      token: '',
      idUser: null,
    };
  },
  methods: {
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 5000);
    },
  },
  async beforeMount() {
    const result = await Access.checkTokenValidity(this.$route.query.token);

    this.isLoading = false;
    if (result.success) {
      this.token = result.token_data.token;
      this.idUser = result.token_data.id_user;

      this.status = 'PENDING';
    } else {
      this.showInformation(3, result.message);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!to.query.token) {
      if (from.path !== to.path) return next(from);

      return next('/login');
    }

    return next();
  },
};
</script>
