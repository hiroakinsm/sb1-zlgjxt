<template>
  <BaseChart
    :title="title"
    type="matrix"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'

export default {
  name: 'DataDependencyMatrixChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'データ依存関係マトリクス'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        items: [],
        dependencies: []
      })
    }
  },
  computed: {
    chartData() {
      const { items, dependencies } = this.data
      const matrix = items.map(item => 
        items.map(target => {
          const dep = dependencies.find(d => 
            d.source === item.id && d.target === target.id
          )
          return dep ? dep.strength : 0
        })
      )

      return {
        labels: items.map(item => item.name),
        datasets: [{
          data: matrix,
          backgroundColor: (context) => {
            const value = context.dataset.data[context.dataIndex]
            return `rgba(54, 162, 235, ${value / 100})`
          }
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 90
            }
          },
          y: {
            display: true
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.dataset.data[context.dataIndex]
                return `依存度: ${value}%`
              }
            }
          }
        }
      }
    }
  }
}
</script>