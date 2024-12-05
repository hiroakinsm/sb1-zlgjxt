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
  name: 'SpecialAnalysisChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '特異点総合分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        vendorDialect: 0,
        characterCode: 0,
        specialSyntax: 0,
        platformDependency: 0,
        compatibility: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'メーカー方言',
          '文字コード',
          '特殊構文',
          'プラットフォーム依存',
          '互換性'
        ],
        datasets: [{
          label: '特異点評価',
          data: [
            metrics.vendorDialect ?? 0,
            metrics.characterCode ?? 0,
            metrics.specialSyntax ?? 0,
            metrics.platformDependency ?? 0,
            metrics.compatibility ?? 0
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