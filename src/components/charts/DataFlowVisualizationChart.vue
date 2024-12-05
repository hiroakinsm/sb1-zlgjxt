<template>
  <BaseChart
    :title="title"
    type="sankey"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import BaseChart from './BaseChart.vue'

export default {
  name: 'DataFlowVisualizationChart',
  components: {
    BaseChart
  },
  props: {
    title: {
      type: String,
      default: 'データフロー可視化'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        nodes: [],
        links: []
      })
    }
  },
  computed: {
    chartData() {
      const { nodes, links } = this.data
      return {
        datasets: [{
          data: nodes.map(node => ({
            id: node.id,
            label: node.name,
            category: node.type
          })),
          links: links.map(link => ({
            source: link.source,
            target: link.target,
            value: link.value
          }))
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const node = context.raw
                return `${node.label} (${node.category})`
              }
            }
          }
        }
      }
    }
  }
}
</script>