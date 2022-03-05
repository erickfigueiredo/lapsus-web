<script>
import { Doughnut } from 'vue3-chart-v2';

export default {
  name: 'PieChart',
  extends: Doughnut,
  props: {
    data: {
      type: Array,
      required: true,
    },
    legend: {
      type: Array,
      required: true,
    },
    colours: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.renderChart({
      labels: this.legend,
      datasets: [
        {
          backgroundColor: this.colours,
          data: this.data,
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
};
</script>
