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
  name: 'OverallStructureChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '全体構造分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        programStructure: 0,
        codeQuality: 0,
        dependencies: 0,
        integration: 0,
        maintainability: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'プログラム構造',
          'コード品質',
          '依存関係',
          '統合性',
          '保守性'
        ],
        datasets: [{
          label: '全体評価',
          data: [
            metrics.programStructure ?? 0,
            metrics.codeQuality ?? 0,
            metrics.dependencies ?? 0,
            metrics.integration ?? 0,
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