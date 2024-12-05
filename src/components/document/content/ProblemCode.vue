```vue
<template>
  <div class="space-y-6">
    <!-- 問題コードサマリ -->
    <div class="grid grid-cols-3 gap-4">
      <div v-for="summary in problemSummary" :key="summary.type"
           class="bg-gray-50 rounded-lg p-4">
        <dt class="text-sm font-medium text-gray-500">{{ summary.label }}</dt>
        <dd class="mt-1">
          <div class="flex items-center">
            <div class="text-2xl font-semibold text-gray-900">
              {{ summary.count }}
            </div>
            <div class="ml-2 text-sm text-gray-500">件</div>
          </div>
          <div class="mt-1">
            <span :class="getSeverityBadgeClass(summary.severity)"
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
              {{ getSeverityLabel(summary.severity) }}
            </span>
          </div>
        </dd>
      </div>
    </div>

    <!-- 問題コード一覧 -->
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              場所
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              種類
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              説明
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              重要度
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="problem in data" :key="problem.location">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
              {{ problem.location }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ problem.type }}
            </td>
            <td class="px-3 py-4 text-sm text-gray-500">
              {{ problem.description }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm">
              <span :class="getSeverityBadgeClass(problem.severity)"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {{ getSeverityLabel(problem.severity) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 改善提案 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">改善提案</h4>
      <div class="space-y-3">
        <div v-for="(improvement, index) in improvements" :key="index"
             class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clip-rule="evenodd" />
                </svg>
              </span>
            </div>
            <div class="ml-3">
              <h5 class="text-sm font-medium text-gray-900">{{ improvement.title }}</h5>
              <p class="mt-1 text-sm text-gray-500">{{ improvement.description }}</p>
              <div class="mt-2">
                <h6 class="text-xs font-medium text-gray-900">改善例:</h6>
                <div class="mt-1 bg-gray-800 rounded-lg p-3">
                  <pre class="text-xs text-white font-mono">{{ improvement.example }}</pre>
                </div>
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

const problemSummary = computed(() => [
  {
    type: 'goto',
    label: 'GOTO文',
    count: props.data.filter(p => p.type === 'GOTO').length,
    severity: 'high'
  },
  {
    type: 'dead',
    label: 'デッドコード',
    count: props.data.filter(p => p.type === 'DEAD_CODE').length,
    severity: 'medium'
  },
  {
    type: 'complex',
    label: '複雑な条件',
    count: props.data.filter(p => p.type === 'COMPLEX_CONDITION').length,
    severity: 'medium'
  }
])

const improvements = computed(() => {
  const improvements = []

  // GOTO文の改善提案
  if (props.data.some(p => p.type === 'GOTO')) {
    improvements.push({
      title: 'GOTO文の除去',
      description: 'GOTO文を構造化プログラミングの制御構造に置き換えることで、コードの可読性と保守性が向上します。',
      example: `* 改善前:
       IF AMOUNT > 0
          GOTO PROCESS-A.
       GOTO PROCESS-B.
       
* 改善後:
       IF AMOUNT > 0
          PERFORM PROCESS-A
       ELSE
          PERFORM PROCESS-B
       END-IF.`
    })
  }

  // 複雑な条件の改善提案
  if (props.data.some(p => p.type === 'COMPLEX_CONDITION')) {
    improvements.push({
      title: '条件式の簡素化',
      description: '複雑な条件式を中間フラグや関数に分割することで、理解しやすいコードになります。',
      example: `* 改善前:
       IF A = 1 AND B = 2 OR A = 2 AND B = 1 OR
          (A = 3 AND B = 3 AND C = 1)
          
* 改善後:
       EVALUATE TRUE
          WHEN VALID-COND-1(A, B)
          WHEN VALID-COND-2(A, B)
          WHEN VALID-COND-3(A, B, C)
       END-EVALUATE.`
    })
  }

  return improvements
})

const getSeverityBadgeClass = (severity) => {
  switch (severity) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getSeverityLabel = (severity) => {
  switch (severity) {
    case 'high':
      return '高'
    case 'medium':
      return '中'
    case 'low':
      return '低'
    default:
      return '不明'
  }
}
</script>
```