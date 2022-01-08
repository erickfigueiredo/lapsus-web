<template>
  <router-view />
</template>

<style>
::-webkit-scrollbar {
  width: 12px;               /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;        /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: #cecece;    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */
  border: 2px solid #f1f1f1;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #505f77;
}

textarea {
  resize: none;
}
</style>
