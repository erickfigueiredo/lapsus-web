<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="md:flex md:space-x-4">
      <div class="my-4 md:my-0 md:w-full">
        <label for="sender" class="block my-2 text-gray-500 font-semibold">
          Remetente
        </label>
        <input
          id="sender"
          type="text"
          name="sender"
          v-model="sender"
          placeholder="Informe seu nome"
          spellcheck="true"
          class="form-control"
          :disabled="isVisualization || isLoggedIn"
          required
        />
      </div>
      <div class="my-4 md:my-0 md:w-full">
        <label for="email" class="block my-2 text-gray-500 font-semibold">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          v-model="email"
          placeholder="Informe seu e-mail"
          class="form-control"
          :disabled="isVisualization || isLoggedIn"
          required
        />
      </div>
    </div>
    <div class="my-4">
      <label for="subject" class="block my-2 text-gray-500 font-semibold">
        Assunto
      </label>
      <input
        id="subject"
        type="text"
        name="subject"
        v-model="subject"
        placeholder="Informe o assunto"
        spellcheck="true"
        class="form-control"
        :disabled="isVisualization"
        required
      />
    </div>
    <div class="my-4">
      <label for="body" class="block my-2 text-gray-500 font-semibold">
        Corpo da Mensagem
      </label>
      <textarea
        id="body"
        name="body"
        v-model="body"
        rows="6"
        placeholder="Escreva sua mensagem..."
        spellcheck="true"
        class="form-control"
        :disabled="isVisualization"
        required
      />
    </div>
    <base-button :isBlocked="blockAction">
      {{
        !isVisualization
          ? "Enviar Mensagem"
          : is_visualized
          ? "Marcar com Não Lido"
          : "Marcar como Lido"
      }}
    </base-button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseButton from '../BaseButton.vue';

import Contact from '../../services/Contact';

export default {
  components: {
    BaseButton,
  },
  emits: ['form-response', 'form-data'],
  props: {
    fillData: {
      type: Object,
      default() {
        return {
          id: null,
          sender: '',
          email: '',
          subject: '',
          body: '',
          is_visualized: '',
        };
      },
    },
    isVisualization: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: this.fillData.id,
      sender: this.fillData.sender,
      email: this.fillData.email,
      subject: this.fillData.subject,
      body: this.fillData.body,
      is_visualized: this.fillData.is_visualized,
      blockAction: false,
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user', 'token']),
  },
  methods: {
    clearForm() {
      if (!this.isLoggedIn) {
        this.sender = '';
        this.email = '';
      }

      this.subject = '';
      this.body = '';
    },
    async submitForm() {
      this.blockAction = true;

      let result;
      if (this.isVisualization) {
        result = await Contact.toggleVisualization(this.token, this.id);
      } else {
        result = await Contact.create({
          sender: this.sender,
          email: this.email,
          subject: this.subject,
          body: this.body,
        });
      }

      if (result.success) {
        if (!this.isVisualization) {
          this.clearForm();
          this.$emit('form-response', 1, 'Mensagem enviada com sucesso!');
        } else {
          this.is_visualized = !this.is_visualized;
          this.$emit('form-response', 1, 'Status alterado com sucesso!');
          this.$emit('form-data', result.contact);
        }
      } else {
        this.$emit('form-response', 3, result.message);
      }

      this.blockAction = false;
    },
  },
  mounted() {
    if (!this.isVisualization && this.isLoggedIn) {
      this.sender = `${this.user.name} ${this.user.surname}`;
      this.email = this.user.email;
    }
  },
};
</script>
