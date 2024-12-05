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
  name: 'DatabaseAccessChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'データベースアクセス分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        sqlStatements: 0,
        cursorOperations: 0,
        tableReferences: 0,
        joinComplexity: 0,
        transactionBoundary: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'SQL文',
          'カーソル操作',
          'テーブル参照',
          '結合複雑度',
          'トランザクション境界'
        ],
        datasets: [{
          label: 'データベースアクセス評価',
          data: [
            metrics.sqlStatements ?? 0,
            metrics.cursorOperations ?? 0,
            metrics.tableReferences ?? 0,
            metrics.joinComplexity ?? 0,
            metrics.transactionBoundary ?? 0
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