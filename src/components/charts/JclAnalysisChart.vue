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
  name: 'JclAnalysisChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'JCL分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        jobDependencies: 0,
        datasetUsage: 0,
        conditionCodes: 0,
        resourceUtilization: 0,
        errorHandling: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'ジョブ依存関係',
          'データセット使用状況',
          '条件コード分析',
          'リソース使用状況',
          'エラー処理'
        ],
        datasets: [{
          label: 'JCL評価',
          data: [
            metrics.jobDependencies ?? 0,
            metrics.datasetUsage ?? 0,
            metrics.conditionCodes ?? 0,
            metrics.resourceUtilization ?? 0,
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