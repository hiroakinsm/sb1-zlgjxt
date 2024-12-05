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
  name: 'PerformanceMetricsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'パフォーマンスメトリクス'
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
          'CPU使用率',
          'メモリ効率',
          'I/O効率',
          'レスポンス時間',
          'スループット'
        ],
        datasets: [{
          label: 'パフォーマンススコア',
          data: [
            this.data.cpuUsage || 0,
            this.data.memoryEfficiency || 0,
            this.data.ioEfficiency || 0,
            this.data.responseTime || 0,
            this.data.throughput || 0
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