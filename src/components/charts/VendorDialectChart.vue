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
  name: 'VendorDialectChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'メーカー方言分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        ibmExtensions: 0,
        fujitsuExtensions: 0,
        hitachiExtensions: 0,
        necExtensions: 0,
        otherExtensions: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: ['IBM', 'Fujitsu', 'Hitachi', 'NEC', 'その他'],
        datasets: [{
          data: [
            metrics.ibmExtensions ?? 0,
            metrics.fujitsuExtensions ?? 0,
            metrics.hitachiExtensions ?? 0,
            metrics.necExtensions ?? 0,
            metrics.otherExtensions ?? 0
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
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