```vue
<template>
  <div class="space-y-6">
    <!-- 操作種別サマリ -->
    <div class="grid grid-cols-3 gap-4">
      <div v-for="operation in operationSummary" :key="operation.type"
           class="bg-gray-50 rounded-lg p-4">
        <dt class="text-sm font-medium text-gray-500">{{ operation.label }}</dt>
        <dd class="mt-1 flex justify-between items-baseline">
          <div class="flex items-baseline">
            <div class="text-2xl font-semibold text-gray-900">
              {{ operation.count }}
            </div>
            <div class="ml-2 text-sm text-gray-500">回</div>
          </div>
          <div :class="getChangeIndicatorClass(operation.trend)"
               class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium">
            <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4"
                 :class="operation.trend > 0 ? 'text-green-500' : 'text-red-500'"
                 fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" 
                    :d="operation.trend > 0 
                        ? 'M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        : 'M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'"
                    clip-rule="evenodd" />
            </svg>
            <span>{{ operation.trend > 0 ? '+' : '' }}{{ operation.trend }}%</span>
          </div>
        </dd>
      </div>
    </div>

    <!-- 操作詳細 -->
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              操作種別
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              件数
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              場所
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="operation in data" :key="operation.type">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
              {{ operation.type }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ operation.count }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              <div class="flex flex-wrap gap-1">
                <span v-for="location in operation.locations" :key="location"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {{ location }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 操作パターン分析 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">操作パターン分析</h4>
      <div class="space-y-3">
        <div v-for="pattern in operationPatterns" :key="pattern.id"
             class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span :class="getPatternIconClass(pattern.type)"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <div class="ml-3">
              <h5 class="text-sm font-medium text-gray-900">{{ pattern.title }}</h5>
              <p class="mt-1 text-sm text-gray-500">{{ pattern.description }}</p>
              <div v-if="pattern.recommendation" class="mt-2">
                <p class="text-sm font-medium text-indigo-600">推奨事項:</p>
                <p class="mt-1 text-sm text-gray-500">{{ pattern.recommendation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
})

const operationSummary = computed(() => [
  {
    type: 'MOVE',
    label: 'MOVE文',
    count: props.data.filter(op => op.type === 'MOVE').reduce((sum, op) => sum + op.count, 0),
    trend: 5
  },
  {
    type: 'COMPUTE',
    label: 'COMPUTE文',
    count: props.data.filter(op => op.type === 'COMPUTE').reduce((sum, op) => sum + op.count, 0),
    trend: -2
  },
  {
    type: 'STRING',
    label: '文字列操作',
    count: props.data.filter(op => op.type === 'STRING').reduce((sum, op) => sum + op.count, 0),
    trend: 3
  }
])

const operationPatterns = computed(() => {
  const patterns = []
  
  // MOVE文の連続使用パターン
  const moveOperations = props.data.filter(op => op.type === 'MOVE')
  if (moveOperations.length > 0) {
    patterns.push({
      id: 'consecutive-moves',
      type: 'warning',
      title: 'MOVE文の連続使用',
      description: `${moveOperations.length}箇所でMOVE文の連続使用が検出されました`,
      recommendation: 'INITIALIZE文やGROUP MOVEの使用を検討してください'
    })
  }

  // COMPUTE文の複雑な計算パターン
  const computeOperations = props.data.filter(op => op.type === 'COMPUTE')
  if (computeOperations.length > 0) {
    patterns.push({
      id: 'complex-compute',
      type: 'info',
      title: '計算ロジックの集中',
      description: `${computeOperations.length}箇所で計算処理が集中しています`,
      recommendation: '計算ロジックの共通化を検討してください'
    })
  }

  return patterns
})

const getChangeIndicatorClass = (trend) => {
  return trend > 0 
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'
}

const getPatternIconClass = (type) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-100 text-yellow-600'
    case 'info':
      return 'bg-blue-100 text-blue-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}
</script>
```