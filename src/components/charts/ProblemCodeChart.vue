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
  name: 'ProblemCodeChart',
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
        gotoStatements: 0,
        deadCode: 0,
        unusedVariables: 0,
        duplicateCode: 0,
        complexConditions: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'GOTO文',
          'デッドコード',
          '未使用変数',
          '重複コード',
          '複雑な条件'
        ],
        datasets: [{
          label: '検出数',
          data: [
            metrics.gotoStatements ?? 0,
            metrics.deadCode ?? 0,
            metrics.unusedVariables ?? 0,
            metrics.duplicateCode ?? 0,
            metrics.complexConditions ?? 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        ...barChartOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.raw}箇所検出`
              }
            }
          }
        }
      }
    }
  }
}
</script>