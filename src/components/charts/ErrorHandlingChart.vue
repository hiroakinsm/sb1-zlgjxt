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
  name: 'ErrorHandlingChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'エラー処理分析'
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
          '例外処理',
          'エラーログ',
          'リカバリー処理',
          'バリデーション',
          'エラーメッセージ'
        ],
        datasets: [{
          label: '評価スコア',
          data: [
            this.data.exceptionHandling || 0,
            this.data.errorLogging || 0,
            this.data.recoveryProcess || 0,
            this.data.validation || 0,
            this.data.errorMessages || 0
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