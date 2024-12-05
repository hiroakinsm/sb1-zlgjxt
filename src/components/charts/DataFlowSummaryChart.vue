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
  name: 'DataFlowSummaryChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'データフロー総合分析'
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
          'データ入力',
          'データ処理',
          'データ出力',
          'データ変換',
          'データ検証'
        ],
        datasets: [{
          label: 'データフロー評価',
          data: [
            this.data.dataInput || 0,
            this.data.dataProcessing || 0,
            this.data.dataOutput || 0,
            this.data.dataTransformation || 0,
            this.data.dataValidation || 0
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