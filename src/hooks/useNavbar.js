import { reactive, toRefs } from 'vue';

const state = reactive({
  isActive: false,
});

const useNavbar = () => ({ ...toRefs(state) });

export default useNavbar;
