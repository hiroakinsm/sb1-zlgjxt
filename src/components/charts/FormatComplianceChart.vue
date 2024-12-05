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
  name: 'FormatComplianceChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'フォーマット準拠性'
    },
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['インデント', '空行', '行長', 'ブロック構造', 'コメント配置'],
        datasets: [{
          label: '準拠率',
          data: [
            this.data.indentation || 0,
            this.data.blankLines || 0,
            this.data.lineLength || 0,
            this.data.blockStructure || 0,
            this.data.commentPlacement || 0
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