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
  name: 'InterfaceAnalysisChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'インターフェース分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        protocolDetection: 0,
        dataFormat: 0,
        systemDependency: 0,
        screenControl: 0,
        terminalIO: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'プロトコル検出',
          'データフォーマット',
          'システム依存関係',
          '画面制御',
          '端末I/O'
        ],
        datasets: [{
          label: 'インターフェース評価',
          data: [
            metrics.protocolDetection ?? 0,
            metrics.dataFormat ?? 0,
            metrics.systemDependency ?? 0,
            metrics.screenControl ?? 0,
            metrics.terminalIO ?? 0
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
                return `${context.label}: ${context.raw}点`
              }
            }
          }
        }
      }
    }
  }
}
</script>