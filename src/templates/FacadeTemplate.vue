<template>
  <div class="flex h-screen">
    <section className="hidden lg:block lg:w-1/2 bg-gray-700"></section>
    <section className="flex w-full lg:w-1/2 justify-center items-center bg-lemon-500">
      <div className="w-10/12 md:w-2/3 p-4 items-center bg-white rounded-lg shadow-lg">
        <slot name="form"/>
      </div>
    </section>
  </div>
</template>
