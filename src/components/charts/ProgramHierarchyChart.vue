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
  name: 'ProgramHierarchyChart',
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
        mainModules: 0,
        subModules: 0,
        utilityModules: 0,
        commonModules: 0,
        externalModules: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'メインモジュール',
          'サブモジュール',
          'ユーティリティ',
          '共通モジュール',
          '外部モジュール'
        ],
        datasets: [{
          label: 'モジュール数',
          data: [
            metrics.mainModules ?? 0,
            metrics.subModules ?? 0,
            metrics.utilityModules ?? 0,
            metrics.commonModules ?? 0,
            metrics.externalModules ?? 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        ...barChartOptions,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'モジュール数'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw}個のモジュール`
              }
            }
          }
        }
      }
    }
  }
}
</script>