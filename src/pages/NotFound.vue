<template>
  <div class="h-screen bg-cerulean-900 flex">
    <section class="mx-auto my-auto text-white text-center">
      <h1 class="text-4xl md:text-8xl text-lemon-400">404</h1>
      <p class="my-4 text-2xl md:text-4xl truncate">
        Ops...
      </p>
      <p class="my-4 text-2xl md:text-4xl truncate">
        A página informada não existe!
      </p>
      <router-link to="/" exact class="font-bold">
        <p class="text-center">voltar para a Home</p>
      </router-link>
    </section>
  </div>
</template>
