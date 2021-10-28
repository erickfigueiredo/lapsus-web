<template>
  <div class="flex h-screen">
    <section class="hidden lg:block lg:flex-1 bg-cerulean-900"></section>
    <section class="flex w-full lg:flex-1 justify-center items-center bg-cerulean-200">
      <div class="w-10/12 md:w-2/3 p-4 items-center bg-white rounded-lg shadow-lg">
        <slot name="form"/>
      </div>
    </section>
  </div>
</template>
