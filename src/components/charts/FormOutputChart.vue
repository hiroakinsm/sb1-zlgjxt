<template>
  <BaseChart
    :title="title"
    type="pie"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from '../BaseChart.vue'

export default {
  name: 'FormOutputChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'フォーム出力分析'
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
          'オンライン帳票',
          'バッチ帳票',
          'スプール出力',
          'プリンタ出力',
          'ファイル出力'
        ],
        datasets: [{
          data: [
            this.data.onlineForms || 0,
            this.data.batchForms || 0,
            this.data.spoolOutput || 0,
            this.data.printerOutput || 0,
            this.data.fileOutput || 0
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