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
  name: 'ComplexityChart',
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
        cyclomaticComplexity: 0,
        nestingDepth: 0,
        conditionalComplexity: 0,
        dataFlowComplexity: 0,
        maintainabilityIndex: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          '循環的複雑度',
          'ネスト深度',
          '条件分岐複雑度',
          'データフロー複雑度',
          '保守性指標'
        ],
        datasets: [{
          label: '複雑度メトリクス',
          data: [
            metrics.cyclomaticComplexity ?? 0,
            metrics.nestingDepth ?? 0,
            metrics.conditionalComplexity ?? 0,
            metrics.dataFlowComplexity ?? 0,
            metrics.maintainabilityIndex ?? 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
        }]
      }
    },
    chartOptions() {
      return radarChartOptions
    }
  }
}
</script>