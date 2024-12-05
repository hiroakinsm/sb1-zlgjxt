<template>
  <BaseChart
    :title="title"
    type="pie"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { pieChartOptions } from '../../config/chartConfig'

export default {
  name: 'CharacterCodeChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '文字コード分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        shiftJIS: 0,
        ebcdic: 0,
        utf8: 0,
        ascii: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: ['Shift-JIS', 'EBCDIC', 'UTF-8', 'ASCII'],
        datasets: [{
          data: [
            metrics.shiftJIS ?? 0,
            metrics.ebcdic ?? 0,
            metrics.utf8 ?? 0,
            metrics.ascii ?? 0
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
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