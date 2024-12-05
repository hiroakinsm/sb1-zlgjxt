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
  name: 'MigrationPriorityChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '移行優先度評価'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        businessValue: 0,
        technicalUrgency: 0,
        resourceAvailability: 0,
        riskLevel: 0,
        costEfficiency: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'ビジネス価値',
          '技術的緊急度',
          'リソース利用可能性',
          'リスクレベル',
          'コスト効率'
        ],
        datasets: [{
          label: '移行優先度',
          data: [
            metrics.businessValue ?? 0,
            metrics.technicalUrgency ?? 0,
            metrics.resourceAvailability ?? 0,
            metrics.riskLevel ?? 0,
            metrics.costEfficiency ?? 0
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