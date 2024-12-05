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
  name: 'CodeQualityChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'コード品質分析'
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
          'コードの一貫性',
          'モジュール化',
          'コメント品質',
          'エラー処理',
          'テスト容易性'
        ],
        datasets: [{
          label: '品質スコア',
          data: [
            this.data.codeConsistency || 0,
            this.data.modularization || 0,
            this.data.commentQuality || 0,
            this.data.errorHandling || 0,
            this.data.testability || 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
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