<template>
  <BaseChart
    :title="title"
    type="radar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { radarChartOptions } from '../../config/chartConfig'

export default {
  name: 'IntegratedFlowChart',
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
        controlFlow: 0,
        dataFlow: 0,
        errorHandling: 0,
        moduleInteraction: 0,
        optimization: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          '制御フロー',
          'データフロー',
          'エラー処理',
          'モジュール間連携',
          '最適化機会'
        ],
        datasets: [{
          label: '統合フロー評価',
          data: [
            metrics.controlFlow ?? 0,
            metrics.dataFlow ?? 0,
            metrics.errorHandling ?? 0,
            metrics.moduleInteraction ?? 0,
            metrics.optimization ?? 0
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: true
        }]
      }
    },
    chartOptions() {
      return {
        ...radarChartOptions,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}点`
              }
            }
          }
        }
      }
    }
  }
}
</script>