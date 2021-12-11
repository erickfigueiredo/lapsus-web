<template>
  <div class="p-4">
    <emsi-form
    :categoryList="category"
    :causeList="cause"
    :riskList="risk"
    :scaleList="scale"
    :statusList="status"
    :casualtiesList="casualties"
    :typeList="type"
    :loctypeList="loctype"
    :weatherList="weather"
    :actorList="actor"
    :contributionList="contribution"
    />
  </div>
</template>

<script>
import EMSIForm from '../components/forms/EMSIForm.vue';

import EMSI from '../services/EMSI';

export default {
  components: {
    'emsi-form': EMSIForm,
  },
  data() {
    return {
      category: [],
      cause: [],
      risk: [],
      scale: [],
      status: [],
      casualties: [],
      contribution: [],
      type: {},
      loctype: {},
      weather: {},
      actor: {},
    };
  },
  async mounted() {
    const a = await EMSI.list();

    this.category = a.category;
    this.cause = a.cause;
    this.risk = a.risk;
    this.scale = a.scale;
    this.status = a.status;
    this.loctype = a.loctype;
    this.actor = a.actor;
    this.contribution = a.contribution;
    this.type = a.type;
    this.casualties = a.casualties;
    this.weather = a.weather;
  },
};
</script>
