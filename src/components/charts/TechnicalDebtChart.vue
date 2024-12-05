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
  name: 'TechnicalDebtChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '技術的負債分析'
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
          'コード品質',
          'アーキテクチャ',
          'テスト',
          'ドキュメント',
          '技術スタック'
        ],
        datasets: [{
          label: '技術的負債',
          data: [
            this.data.codeDebt || 0,
            this.data.architectureDebt || 0,
            this.data.testDebt || 0,
            this.data.documentationDebt || 0,
            this.data.technologyDebt || 0
          ],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
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