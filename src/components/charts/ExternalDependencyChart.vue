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
  name: 'ExternalDependencyChart',
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
        type: 'radar',
        data: {
          labels: [
            '外部呼出',
            '共通モジュール',
            'ファイル参照',
            'DB参照',
            'システム呼出'
          ],
          datasets: [{
            label: '依存度',
            data: [
              this.data.externalCalls || 0,
              this.data.commonModules || 0,
              this.data.fileReferences || 0,
              this.data.dbReferences || 0,
              this.data.systemCalls || 0
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              max: 20,
              ticks: {
                stepSize: 5
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