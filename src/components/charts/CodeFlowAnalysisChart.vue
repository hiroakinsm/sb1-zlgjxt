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
  name: 'CodeFlowAnalysisChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'コードフロー分析'
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
          '制御フロー',
          'データフロー',
          '例外処理',
          'モジュール間連携',
          'エラーハンドリング'
        ],
        datasets: [{
          label: '分析スコア',
          data: [
            this.data.controlFlow || 0,
            this.data.dataFlow || 0,
            this.data.exceptionHandling || 0,
            this.data.moduleInteraction || 0,
            this.data.errorHandling || 0
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