<template>
  <BaseChart
    :title="title"
    type="bar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { barChartOptions } from '../../config/chartConfig'

export default {
  name: 'CodeMetricsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        totalLines: 0,
        codeLines: 0,
        commentLines: 0,
        emptyLines: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: ['総行数', 'コード行数', 'コメント行数', '空行数'],
        datasets: [{
          data: [
            metrics.totalLines ?? 0,
            metrics.codeLines ?? 0,
            metrics.commentLines ?? 0,
            metrics.emptyLines ?? 0
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ]
        }]
      }
    },
    chartOptions() {
      return {
        ...barChartOptions,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 100
            }
          }
        }
      }
    }
  }
}
</script>