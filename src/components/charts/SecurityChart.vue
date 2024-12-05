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
  name: 'SecurityChart',
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
        sqlInjection: 0,
        bufferOverflow: 0,
        fileOperation: 0,
        errorHandling: 0,
        inputValidation: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'SQLインジェクション対策',
          'バッファオーバーフロー対策',
          'ファイル操作セキュリティ',
          'エラー処理',
          '入力検証'
        ],
        datasets: [{
          label: 'セキュリティスコア',
          data: [
            metrics.sqlInjection ?? 0,
            metrics.bufferOverflow ?? 0,
            metrics.fileOperation ?? 0,
            metrics.errorHandling ?? 0,
            metrics.inputValidation ?? 0
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