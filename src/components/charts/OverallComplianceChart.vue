<template>
  <div class="h-full">
    <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
    <div class="h-[calc(100%-2rem)]">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto'

export default {
  name: 'OverallComplianceChart',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      const ctx = this.$refs.chart.getContext('2d')
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            '命名規則',
            'フォーマット',
            'ドキュメント',
            'エラー処理',
            'モジュール化'
          ],
          datasets: [{
            data: [
              this.data.namingConventions || 0,
              this.data.formatting || 0,
              this.data.documentation || 0,
              this.data.errorHandling || 0,
              this.data.modularization || 0
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)'
            ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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
      })
    }
  },
  watch: {
    data: {
      handler() {
        if (this.chart) {
          this.chart.destroy()
        }
        this.createChart()
      },
      deep: true
    }
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>