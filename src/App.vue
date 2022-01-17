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
  border: 2px solid #4b5563;
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
  border-color: #e4ee3f;
  background: #e4ee3f;
}
.toggle:checked:after {
  transform: translatex(20px);
}
</style>
