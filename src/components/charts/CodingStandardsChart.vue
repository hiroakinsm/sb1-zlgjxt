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
  name: 'CodingStandardsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'コーディング規約準拠性'
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
          '命名規則',
          'インデント',
          'コメント',
          'モジュール化',
          'エラー処理'
        ],
        datasets: [{
          label: '準拠率',
          data: [
            this.data.namingConventions || 0,
            this.data.formatting || 0,
            this.data.documentation || 0,
            this.data.modularization || 0,
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