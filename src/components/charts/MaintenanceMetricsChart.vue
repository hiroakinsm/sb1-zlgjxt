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
  name: 'MaintenanceMetricsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: '保守性メトリクス'
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
          '可読性',
          '変更容易性',
          'テスト容易性',
          '安定性',
          '分析容易性'
        ],
        datasets: [{
          label: '保守性スコア',
          data: [
            this.data.readability || 0,
            this.data.changeability || 0,
            this.data.testability || 0,
            this.data.stability || 0,
            this.data.analyzability || 0
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