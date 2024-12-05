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
  name: 'ModularizationChart',
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
        type: 'bar',
        data: {
          labels: ['関数分割', '再利用性', '凝集度', '結合度', 'インターフェース'],
          datasets: [{
            label: '評価スコア',
            data: [
              this.data.functionSplit || 0,
              this.data.reusability || 0,
              this.data.cohesion || 0,
              this.data.coupling || 0,
              this.data.interface || 0
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
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