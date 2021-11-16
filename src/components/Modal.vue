<template>
  <div>
    <div class="fixed z-30 top-0 left-0 h-screen w-full bg-black opacity-50"></div>
    <dialog open class="fixed top-10 md:inset-1/4 z-40 bg-white rounded-md" :class="size">
      <header class="flex">
        <h2 class="text-xl">{{ title }}</h2>
        <span class="ml-auto mr-2 text-gray-400 cursor-pointer" @click="$emit('close')">
          <font-awesome :icon="['fas', 'times']" />
        </span>
      </header>
      <hr class="my-2" />
      <section class="overflow-y-auto">
        <slot />
      </section>
    </dialog>
  </div>
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
