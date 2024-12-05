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
  name: 'DiagnosticsEvaluationChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '診断分析の総合評価'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        modernization: 0,
        risk: 0,
        security: 0,
        migration: 0,
        maintenance: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'モダン化適性',
          'リスク評価',
          'セキュリティ',
          '移行容易性',
          '保守性'
        ],
        datasets: [{
          label: '総合評価',
          data: [
            metrics.modernization ?? 0,
            metrics.risk ?? 0,
            metrics.security ?? 0,
            metrics.migration ?? 0,
            metrics.maintenance ?? 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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