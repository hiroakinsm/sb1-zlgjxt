<template>
  <BaseChart
    :title="title"
    type="doughnut"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from '../BaseChart.vue'

export default {
  name: 'InterfaceSummaryChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'インターフェース総合分析'
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
          'データベース連携',
          'ファイル連携',
          'API連携',
          '画面連携',
          'バッチ連携'
        ],
        datasets: [{
          data: [
            this.data.databaseInterfaces || 0,
            this.data.fileInterfaces || 0,
            this.data.apiInterfaces || 0,
            this.data.screenInterfaces || 0,
            this.data.batchInterfaces || 0
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ]
        }]
      }
    },
    chartOptions() {
      return {
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 11
              }
            }
          }
        }
      }
    }
  }
}
</script>