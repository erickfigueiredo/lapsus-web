<template>
  <form @submit.prevent="submitForm" class="my-4">
    <div class="my-4">
      <label for="category" class="block my-2 text-gray-500 font-semibold">
        Tipo de Evento
      </label>
      <select
        name="category"
        id="category"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400
        capitalize truncate"
      >
        <option
          v-for="cat in categoryList"
          :key="cat.id"
          :value="cat.id"
          class="capitalize truncate"
          >{{ cat.name }}</option
        >
      </select>
    </div>
    <div class="flex my-4 ">
      <label class="text-gray-500 font-semibold">
        Risco de Dano à Pessoas ou Materiais:
      </label>
      <span class="mx-2">{{risk ? 'Sim' : 'Não'}}</span>
      <input type="checkbox" class="toggle" v-model="risk"/>
    </div>
    <div class="flex my-4 ">
      <label class="text-gray-500 font-semibold">
        Pessoas Feridas ou Desaparecidas:
      </label>
      <span class="mx-2">{{victims ? 'Sim' : 'Não'}}</span>
      <input type="checkbox" class="toggle" v-model="victims"/>
    </div>
    <div class="my-4">
      <label for="category" class="block my-2 text-gray-500 font-semibold">
        Momento da Ocorrência
      </label>
      <input
        name="category"
        id="category"
        type="datetime-local"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400" />
    </div>
    <div class="my-4">
      <label for="category" class="block my-2 text-gray-500 font-semibold">
        Anexos
      </label>
      <input
        name="category"
        id="category"
        type="file"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
        multiple
      />
    </div>
    <div class="my-4">
      <label for="category" class="block my-2 text-gray-500 font-semibold">
        Descrição
      </label>
      <textarea
        name="category"
        id="category"
        rows="4"
        spellcheck="true"
        class="w-full p-2 bg-gray-100 text-gray-600 rounded-md
        outline-none border-2 border-gray-200 focus:border-gray-400"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    categoryList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      risk: false,
      victims: false,
    };
  },
};
</script>

<style>
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}

input[type="checkbox"]:focus {
  outline: 0;
}

.toggle {
  height: 32px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid #4B5563;
  background: linear-gradient(180deg, #2d2f39 0%, #1f2027 100%);
  transition: all 0.2s ease;
}

.toggle:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}
.toggle:checked {
  border-color: #E4EE3F;
  background: #E4EE3F;
}
.toggle:checked:after {
  transform: translatex(20px);
}
</style>
