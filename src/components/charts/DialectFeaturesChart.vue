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
  name: 'DialectFeaturesChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'ダイアレクト特性分析'
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
          'IBM拡張機能',
          'Fujitsu拡張機能',
          'Hitachi拡張機能',
          'NEC拡張機能',
          'その他拡張機能'
        ],
        datasets: [{
          label: '使用率',
          data: [
            this.data.ibmExtensions || 0,
            this.data.fujitsuExtensions || 0,
            this.data.hitachiExtensions || 0,
            this.data.necExtensions || 0,
            this.data.otherExtensions || 0
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
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