<template>
  <BaseChart
    :title="title"
    type="doughnut"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'
import { pieChartOptions } from '../../config/chartConfig'

export default {
  name: 'QualityMetricsChart',
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
        commentRatio: 0,
        testability: 0,
        codeQuality: 0,
        documentationQuality: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'コメント率',
          'テスト容易性',
          'コード品質',
          'ドキュメント品質'
        ],
        datasets: [{
          data: [
            metrics.commentRatio ?? 0,
            metrics.testability ?? 0,
            metrics.codeQuality ?? 0,
            metrics.documentationQuality ?? 0
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
        }]
      }
    },
    chartOptions() {
      return {
        ...pieChartOptions,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              padding: 8,
              font: {
                size: 11
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`
              }
            }
          }
        }
      }
    }
  }
}
</script>