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
  name: 'SystemCouplingChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'システム結合度分析'
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
          'データ結合度',
          'インターフェース結合度',
          'モジュール結合度',
          'システム結合度',
          '外部依存度'
        ],
        datasets: [{
          label: '結合度',
          data: [
            this.data.dataCoupling || 0,
            this.data.interfaceCoupling || 0,
            this.data.moduleCoupling || 0,
            this.data.systemCoupling || 0,
            this.data.externalDependency || 0
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
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