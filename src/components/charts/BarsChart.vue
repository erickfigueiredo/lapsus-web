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
    label: {
      type: String,
      required: true,
    },
    legend: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.renderChart(
      {
        labels: this.legend,
        datasets: [
          {
            label: this.label,
            backgroundColor: this.color,
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
                stepSize: 1,
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
