<template>
  <BaseChart
    :title="title"
    type="doughnut"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { pieChartOptions } from '../../config/chartConfig'

export default {
  name: 'DivisionRatioChart',
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
        identification: 0,
        environment: 0,
        data: 0,
        procedure: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'IDENTIFICATION DIVISION',
          'ENVIRONMENT DIVISION',
          'DATA DIVISION',
          'PROCEDURE DIVISION'
        ],
        datasets: [{
          data: [
            metrics.identification ?? 0,
            metrics.environment ?? 0,
            metrics.data ?? 0,
            metrics.procedure ?? 0
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        ...pieChartOptions,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`
              }
            }
          }
        }
      }
    }
  }
}
</script>