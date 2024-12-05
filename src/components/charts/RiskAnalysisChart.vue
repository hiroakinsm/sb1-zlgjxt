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
  name: 'RiskAnalysisChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'リスク分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        businessRisk: 0,
        technicalRisk: 0,
        securityRisk: 0,
        operationalRisk: 0,
        complianceRisk: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'ビジネスリスク',
          '技術リスク',
          'セキュリティリスク',
          '運用リスク',
          'コンプライアンスリスク'
        ],
        datasets: [{
          label: 'リスクレベル',
          data: [
            metrics.businessRisk ?? 0,
            metrics.technicalRisk ?? 0,
            metrics.securityRisk ?? 0,
            metrics.operationalRisk ?? 0,
            metrics.complianceRisk ?? 0
          ],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
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