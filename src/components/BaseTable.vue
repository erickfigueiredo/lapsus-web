<template>
  <table class="table-auto text-center w-full">
    <thead class="bg-cerulean-100 text-xs font-semibold text-gray-600 uppercase">
      <slot name="header" />
    </thead>
    <tbody class="bg-white text-sm">
      <slot name="body"/>
    </tbody>
  </table>
</template>
