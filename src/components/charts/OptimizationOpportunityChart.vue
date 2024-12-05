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
  name: 'OptimizationOpportunityChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '最適化機会分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        moduleSplit: 0,
        codeReuse: 0,
        algorithmImprovement: 0,
        resourceUsage: 0,
        errorHandling: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'モジュール分割',
          'コード再利用',
          'アルゴリズム改善',
          'リソース使用',
          'エラー処理'
        ],
        datasets: [{
          label: '最適化可能性',
          data: [
            metrics.moduleSplit ?? 0,
            metrics.codeReuse ?? 0,
            metrics.algorithmImprovement ?? 0,
            metrics.resourceUsage ?? 0,
            metrics.errorHandling ?? 0
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
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