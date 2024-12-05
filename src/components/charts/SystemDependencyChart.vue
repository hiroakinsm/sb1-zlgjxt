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
  name: 'SystemDependencyChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'システム間連携の総合分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        programCoupling: 0,
        dataCoupling: 0,
        interfaceCoupling: 0,
        systemCoupling: 0,
        externalDependency: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'プログラム結合度',
          'データ結合度',
          'インターフェース結合度',
          'システム結合度',
          '外部依存度'
        ],
        datasets: [{
          label: '結合度評価',
          data: [
            metrics.programCoupling ?? 0,
            metrics.dataCoupling ?? 0,
            metrics.interfaceCoupling ?? 0,
            metrics.systemCoupling ?? 0,
            metrics.externalDependency ?? 0
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
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