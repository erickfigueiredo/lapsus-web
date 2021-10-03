<template>
  <div>
    <button>Anterior</button>
    <button>Próximo</button>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
};
</script>
