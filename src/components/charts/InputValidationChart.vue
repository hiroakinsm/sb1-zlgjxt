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

export default {
  name: 'InputValidationChart',
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
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: [
          '入力検証',
          'データ型チェック',
          '範囲チェック',
          'フォーマット検証',
          'セキュリティ検証'
        ],
        datasets: [{
          label: '検証スコア',
          data: [
            this.data.inputValidation || 0,
            this.data.typeChecking || 0,
            this.data.rangeChecking || 0,
            this.data.formatValidation || 0,
            this.data.securityValidation || 0
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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