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
  name: 'ControlFlowChart',
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
        sequenceComplexity: 0,
        branchingComplexity: 0,
        loopComplexity: 0,
        nestingDepth: 0,
        errorHandling: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          '順次処理複雑度',
          '分岐複雑度',
          'ループ複雑度',
          'ネスト深度',
          'エラー処理'
        ],
        datasets: [{
          label: '制御フロー評価',
          data: [
            metrics.sequenceComplexity ?? 0,
            metrics.branchingComplexity ?? 0,
            metrics.loopComplexity ?? 0,
            metrics.nestingDepth ?? 0,
            metrics.errorHandling ?? 0
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