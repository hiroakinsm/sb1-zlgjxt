<template>
  <div class="space-y-6">
    <!-- 複雑度メトリクス -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">複雑度メトリクス</h4>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="metric in complexityMetrics" :key="metric.id"
             class="bg-gray-50 rounded-lg p-4">
          <dt class="text-sm font-medium text-gray-500">{{ metric.label }}</dt>
          <dd class="mt-1">
            <div class="flex items-center">
              <div class="text-lg font-semibold text-gray-900">
                {{ metric.value }}
              </div>
              <div class="ml-2 flex-shrink-0">
                <span :class="getMetricBadgeClass(metric.evaluation)"
                      class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ metric.evaluation }}
                </span>
              </div>
            </div>
            <div class="mt-2 text-xs text-gray-500">
              {{ metric.description }}
            </div>
          </dd>
        </div>
      </div>
    </div>

    <!-- 複雑度分布 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">複雑度分布</h4>
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="h-40">
          <canvas ref="distributionChart"></canvas>
        </div>
      </div>
    </div>

    <!-- 改善推奨事項 -->
    <div v-if="recommendations.length > 0">
      <h4 class="text-sm font-medium text-gray-900 mb-3">改善推奨事項</h4>
      <div class="space-y-3">
        <div v-for="(rec, index) in recommendations" :key="index"
             class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span :class="getRecommendationIconClass(rec.priority)"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" 
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                        clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <div class="ml-3">
              <h5 class="text-sm font-medium text-gray-900">{{ rec.title }}</h5>
              <p class="mt-1 text-sm text-gray-500">{{ rec.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      cyclomaticComplexity: 0,
      nestingDepth: 0,
      conditionalComplexity: 0,
      dataFlowComplexity: 0,
      maintainabilityIndex: 0
    })
  }
})

const distributionChart = ref(null)

const complexityMetrics = computed(() => [
  {
    id: 'cyclomatic',
    label: 'サイクロマチック複雑度',
    value: props.data.cyclomaticComplexity,
    evaluation: evaluateComplexity(props.data.cyclomaticComplexity),
    description: '制御フローの複雑さを示す指標'
  },
  {
    id: 'nesting',
    label: 'ネスト深度',
    value: props.data.nestingDepth,
    evaluation: evaluateNestingDepth(props.data.nestingDepth),
    description: 'コードのネストの深さ'
  },
  {
    id: 'conditional',
    label: '条件分岐複雑度',
    value: props.data.conditionalComplexity,
    evaluation: evaluateComplexity(props.data.conditionalComplexity),
    description: '条件分岐の複雑さ'
  },
  {
    id: 'dataflow',
    label: 'データフロー複雑度',
    value: props.data.dataFlowComplexity,
    evaluation: evaluateComplexity(props.data.dataFlowComplexity),
    description: 'データの流れの複雑さ'
  }
])

const recommendations = computed(() => {
  const recs = []
  
  if (props.data.cyclomaticComplexity > 10) {
    recs.push({
      title: 'モジュール分割の検討',
      description: 'サイクロマチック複雑度が高いため、機能の分割を推奨します',
      priority: 'high'
    })
  }
  
  if (props.data.nestingDepth > 4) {
    recs.push({
      title: 'ネストの簡素化',
      description: 'ネストが深すぎるため、条件式の見直しや関数抽出を推奨します',
      priority: 'medium'
    })
  }
  
  return recs
})

const evaluateComplexity = (value) => {
  if (value <= 10) return '良好'
  if (value <= 20) return '要注意'
  return '改善必要'
}

const evaluateNestingDepth = (value) => {
  if (value <= 3) return '良好'
  if (value <= 5) return '要注意'
  return '改善必要'
}

const getMetricBadgeClass = (evaluation) => {
  switch (evaluation) {
    case '良好':
      return 'bg-green-100 text-green-800'
    case '要注意':
      return 'bg-yellow-100 text-yellow-800'
    case '改善必要':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getRecommendationIconClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-600'
    case 'medium':
      return 'bg-yellow-100 text-yellow-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

onMounted(() => {
  const ctx = distributionChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-5', '6-10', '11-15', '16-20', '21+'],
      datasets: [{
        label: '複雑度分布',
        data: [5, 8, 3, 2, 1], // 実際のデータから計算する必要があります
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'モジュール数'
          }
        },
        x: {
          title: {
            display: true,
            text: '複雑度'
          }
        }
      }
    }
  })
})
</script>
```