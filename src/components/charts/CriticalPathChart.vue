<template>
  <BaseChart
    :title="title"
    type="bar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { barChartOptions } from '../../config/chartConfig'

export default {
  name: 'CriticalPathChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'クリティカルパス分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        paths: [
          { name: 'メインフロー', complexity: 75 },
          { name: 'エラー処理', complexity: 45 },
          { name: 'データ検証', complexity: 60 },
          { name: 'DB更新', complexity: 55 },
          { name: '帳票出力', complexity: 40 }
        ]
      })
    }
  },
  computed: {
    chartData() {
      const paths = this.data.paths || []
      return {
        labels: paths.map(p => p.name),
        datasets: [{
          label: '複雑度',
          data: paths.map(p => p.complexity),
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        ...barChartOptions,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: '複雑度'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `複雑度: ${context.raw}点`
              }
            }
          }
        }
      }
    }
  }
}
</script>