<script>
import { Bar } from 'vue3-chart-v2';

export default {
  name: 'DoughnutChart',
  extends: Bar,
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
    this.renderChart(
      {
        labels: this.legend,
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.data,
          },
        ],
      },
      {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    );
  },
};
</script>
