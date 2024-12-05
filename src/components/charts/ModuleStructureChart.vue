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
  name: 'ModuleStructureChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'モジュール構造分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        mainModules: 0,
        subModules: 0,
        utilityModules: 0,
        commonModules: 0,
        externalModules: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: [
          'メインモジュール',
          'サブモジュール',
          'ユーティリティ',
          '共通モジュール',
          '外部モジュール'
        ],
        datasets: [{
          label: 'モジュール数',
          data: [
            metrics.mainModules ?? 0,
            metrics.subModules ?? 0,
            metrics.utilityModules ?? 0,
            metrics.commonModules ?? 0,
            metrics.externalModules ?? 0
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    }
  }
}
</script>