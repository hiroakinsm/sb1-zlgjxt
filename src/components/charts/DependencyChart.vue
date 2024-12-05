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
  name: 'DependencyChart',
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
        externalCalls: 0,
        commonModules: 0,
        fileReferences: 0,
        dbReferences: 0,
        systemCalls: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          '外部呼出',
          '共通モジュール',
          'ファイル参照',
          'DB参照',
          'システム呼出'
        ],
        datasets: [{
          label: '依存関係数',
          data: [
            metrics.externalCalls ?? 0,
            metrics.commonModules ?? 0,
            metrics.fileReferences ?? 0,
            metrics.dbReferences ?? 0,
            metrics.systemCalls ?? 0
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        ...barChartOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}件`
              }
            }
          }
        }
      }
    }
  }
}
</script>