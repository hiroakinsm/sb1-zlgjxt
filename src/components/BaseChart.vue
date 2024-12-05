<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <div class="h-[calc(100%-4rem)]">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Chart from 'chart.js/auto'

export default {
  name: 'BaseChart',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const chartRef = ref(null)
    let chart = null

    const createChart = () => {
      if (!chartRef.value) return

      if (chart) {
        chart.destroy()
      }

      const ctx = chartRef.value.getContext('2d')
      if (!ctx) return

      const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 750,
          easing: 'easeInOutQuart'
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              font: {
                size: 11
              },
              padding: 15
            }
          }
        }
      }

      chart = new Chart(ctx, {
        type: props.type,
        data: props.data,
        options: {
          ...defaultOptions,
          ...props.options
        }
      })
    }

    onMounted(() => {
      requestAnimationFrame(createChart)
    })

    watch(() => [props.data, props.type, props.options], () => {
      requestAnimationFrame(createChart)
    }, { deep: true })

    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy()
        chart = null
      }
    })

    return {
      chartRef
    }
  }
}
</script>