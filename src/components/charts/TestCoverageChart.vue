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
  name: 'TestCoverageChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'テストカバレッジ'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        unitTest: 0,
        integrationTest: 0,
        systemTest: 0,
        regressionTest: 0
      })
    }
  },
  computed: {
    chartData() {
      const metrics = this.data || {}
      return {
        labels: ['ユニットテスト', '結合テスト', 'システムテスト', '回帰テスト'],
        datasets: [{
          data: [
            metrics.unitTest ?? 0,
            metrics.integrationTest ?? 0,
            metrics.systemTest ?? 0,
            metrics.regressionTest ?? 0
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
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
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`
              }
            }
          }
        }
      }
    }
  }
}
</script>