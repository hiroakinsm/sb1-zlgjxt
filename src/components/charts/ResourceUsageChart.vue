<template>
  <BaseChart
    :title="title"
    type="bar"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from '../BaseChart.vue'

export default {
  name: 'ResourceUsageChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'リソース使用状況'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['CPU', 'メモリ', 'ディスクI/O', 'ネットワーク', 'データベース'],
        datasets: [{
          label: '使用率',
          data: [
            this.data.cpuUsage || 0,
            this.data.memoryUsage || 0,
            this.data.diskIO || 0,
            this.data.networkUsage || 0,
            this.data.databaseUsage || 0
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        scales: {
          y: {
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