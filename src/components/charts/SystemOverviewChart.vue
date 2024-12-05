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
  name: 'SystemOverviewChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'システム概要分析'
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
          'プログラム数',
          'モジュール数',
          'インターフェース数',
          'データベース数',
          'ファイル数'
        ],
        datasets: [{
          label: '数量',
          data: [
            this.data.programCount || 0,
            this.data.moduleCount || 0,
            this.data.interfaceCount || 0,
            this.data.databaseCount || 0,
            this.data.fileCount || 0
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