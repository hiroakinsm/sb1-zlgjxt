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
  name: 'FileOperationsChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'ファイル操作分析'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['入力', '出力', '更新'],
        datasets: [{
          label: '操作回数',
          data: [
            this.data.input || 0,
            this.data.output || 0,
            this.data.update || 0
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }
    },
    chartOptions() {
      return {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 5
            }
          }
        }
      }
    }
  }
}
</script>