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
  name: 'ProcessDataRelationChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '処理とデータの関連性分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        dataAccess: 0,
        dataTransformation: 0,
        dataValidation: 0,
        errorHandling: 0,
        businessLogic: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'データアクセス',
          'データ変換',
          'データ検証',
          'エラー処理',
          'ビジネスロジック'
        ],
        datasets: [{
          label: '関連性評価',
          data: [
            metrics.dataAccess ?? 0,
            metrics.dataTransformation ?? 0,
            metrics.dataValidation ?? 0,
            metrics.errorHandling ?? 0,
            metrics.businessLogic ?? 0
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