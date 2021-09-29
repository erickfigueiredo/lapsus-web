<template>
  <div class="fixed z-30 top-0 left-0 h-screen w-full bg-black opacity-50"></div>
  <dialog open class="fixed top-10 z-40 bg-white rounded-md" :class="size">
    <p class="text-gray-400 text-right cursor-pointer" @click="$emit('close')">
      <font-awesome :icon="['fas', 'times']"/>
    </p>
    <header>
      <h2 class="text-xl">{{title}}</h2>
      <hr class="my-2">
    </header>
    <section>
      <slot />
    </section>
  </dialog>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
};
</script>
