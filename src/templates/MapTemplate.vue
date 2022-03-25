<template>
  <div class="flex h-screen">
    <navbar @click="isActiveMenu = false" />
    <div class="flex-1 flex flex-col overflow-hidden bg-cerulean-100">
      <head-bar :instance-name="name"/>
      <main @click="isActiveMenu = false" class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="h-full flex">
          <slot />
          <map-information :contacts="contacts" :legend="legends" />
        </div>
      </main>
    </div>
  </div>
  <float-info :flag="floatData.flag" :message="floatData.message" />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Header from '../components/Header.vue';
import useMenus from '../hooks/useMenus';

import MapInformation from '../components/MapInformation.vue';

import Settings from '../services/Settings';
import EmergencyContact from '../services/EmergencyContact';
import MapLegend from '../services/MapLegend';

export default {
  components: {
    HeadBar: Header,
    MapInformation,
    Navbar,
  },
  setup() {
    const { isActiveMenu } = useMenus();
    return { isActiveMenu };
  },
  data() {
    return {
      floatData: {
        flag: 0,
        message: '',
      },
      name: '',
      contacts: [],
      legends: [],
    };
  },
  methods: {
    showInformation(flag, message) {
      this.floatData.flag = flag;
      this.floatData.message = message;

      setTimeout(() => {
        this.floatData.flag = 0;
        this.floatData.message = '';
      }, 5000);
    },
  },
  async mounted() {
    const org = await Settings.getOrg();
    if (org.success) {
      this.name = org.org.name;
    }

    const ctt = await EmergencyContact.index();
    if (ctt.success) {
      this.contacts = ctt.emContact;
    }

    const legend = await MapLegend.index();
    if (legend.success) {
      this.legends = legend.legendItems;
    }

    if (!legend.success && !ctt.success && !org.success) {
      this.showInformation(3, 'Os recursos da legenda não puderam ser carregados!');
    } else if (!org.success) {
      this.showInformation(3, org.message);
    } else if (!legend.success) {
      this.showInformation(3, legend.message);
    } else if (!ctt.success) {
      this.showInformation(3, ctt.message);
    }
  },
};
</script>
