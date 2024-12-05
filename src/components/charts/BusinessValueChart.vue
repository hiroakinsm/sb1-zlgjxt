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
  name: 'BusinessValueChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'ビジネス価値分析'
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
          '業務重要度',
          '利用頻度',
          '変更要求',
          'コスト効率',
          '将来性'
        ],
        datasets: [{
          label: 'ビジネス価値',
          data: [
            this.data.businessImportance || 0,
            this.data.usageFrequency || 0,
            this.data.changeRequests || 0,
            this.data.costEfficiency || 0,
            this.data.futureValue || 0
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