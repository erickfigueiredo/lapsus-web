<script>
import { Pie } from 'vue3-chart-v2';

export default {
  name: 'PieChart',
  extends: Pie,
  props: {
    data: {
      type: Array,
      required: true,
    },
    legend: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderChart({
      labels: this.legend,
      datasets: [
        {
          backgroundColor: this.colors,
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
