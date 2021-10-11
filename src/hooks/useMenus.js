import { reactive, toRefs } from 'vue';

const state = reactive({
  isActiveNav: false,
  isActiveMenu: false,
});

const useMenus = () => ({ ...toRefs(state) });

export default useMenus;
