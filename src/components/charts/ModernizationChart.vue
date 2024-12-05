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
  name: 'ModernizationChart',
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
        applicationComplexity: 0,
        codeQuality: 0,
        documentationLevel: 0,
        testability: 0,
        maintainability: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'アプリケーション複雑度',
          'コード品質',
          'ドキュメント水準',
          'テスト容易性',
          '保守性'
        ],
        datasets: [{
          label: 'モダン化適性',
          data: [
            metrics.applicationComplexity ?? 0,
            metrics.codeQuality ?? 0,
            metrics.documentationLevel ?? 0,
            metrics.testability ?? 0,
            metrics.maintainability ?? 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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