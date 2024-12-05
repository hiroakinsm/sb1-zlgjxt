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
  name: 'DataQualityChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'データ品質メトリクス'
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
          'データ整合性',
          'データ正規化',
          'データ一貫性',
          'データ完全性',
          'データ精度'
        ],
        datasets: [{
          label: '品質スコア',
          data: [
            this.data.dataIntegrity || 0,
            this.data.dataNormalization || 0,
            this.data.dataConsistency || 0,
            this.data.dataCompleteness || 0,
            this.data.dataAccuracy || 0
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