<template>
  <BaseChart
    :title="title"
    type="doughnut"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from '../BaseChart.vue'

export default {
  name: 'ApiCallsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'API呼び出し分析'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['REST', 'SOAP', 'カスタム'],
        datasets: [{
          data: [
            this.data.rest || 0,
            this.data.soap || 0,
            this.data.custom || 0
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
        }]
      }
    },
    chartOptions() {
      return {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    }
  }
}
</script>