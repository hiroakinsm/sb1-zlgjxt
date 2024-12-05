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
import { radarChartOptions } from '../../config/chartConfig'

export default {
  name: 'SystemIntegrationChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'システム間連携分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        databaseInterfaces: 0,
        fileInterfaces: 0,
        apiInterfaces: 0,
        screenInterfaces: 0,
        batchInterfaces: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'データベース連携',
          'ファイル連携',
          'API連携',
          '画面連携',
          'バッチ連携'
        ],
        datasets: [{
          label: '連携度',
          data: [
            metrics.databaseInterfaces ?? 0,
            metrics.fileInterfaces ?? 0,
            metrics.apiInterfaces ?? 0,
            metrics.screenInterfaces ?? 0,
            metrics.batchInterfaces ?? 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          fill: true
        }]
      }
    },
    chartOptions() {
      return {
        ...radarChartOptions,
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}件`
              }
            }
          }
        }
      }
    }
  }
}
</script>