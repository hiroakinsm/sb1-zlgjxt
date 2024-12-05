<template>
  <BaseChart
    :title="title"
    type="radar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from '../BaseChart.vue'

export default {
  name: 'ModernizationSummaryChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'モダン化総合評価'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: [
          'アプリケーション複雑度',
          'コード品質',
          'ドキュメント水準',
          'テスト容易性',
          '保守性'
        ],
        datasets: [{
          label: 'モダン化適性',
          data: [
            this.data.applicationComplexity || 0,
            this.data.codeQuality || 0,
            this.data.documentationLevel || 0,
            this.data.testability || 0,
            this.data.maintainability || 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    }
  }
}
</script>