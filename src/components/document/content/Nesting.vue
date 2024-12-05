```vue
<template>
  <div class="space-y-6">
    <!-- ネスト分析サマリ -->
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-50 rounded-lg p-4">
        <dt class="text-sm font-medium text-gray-500">最大ネスト深度</dt>
        <dd class="mt-1">
          <div class="flex items-center">
            <div class="text-2xl font-semibold text-gray-900">
              {{ getMaxNestingDepth() }}
            </div>
            <div class="ml-2 text-sm text-gray-500">レベル</div>
          </div>
          <div class="mt-1">
            <span :class="getNestingLevelBadgeClass(getMaxNestingDepth())"
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
              {{ getNestingLevelLabel(getMaxNestingDepth()) }}
            </span>
          </div>
        </dd>
      </div>
      <div class="bg-gray-50 rounded-lg p-4">
        <dt class="text-sm font-medium text-gray-500">平均ネスト深度</dt>
        <dd class="mt-1">
          <div class="flex items-center">
            <div class="text-2xl font-semibold text-gray-900">
              {{ getAverageNestingDepth().toFixed(1) }}
            </div>
            <div class="ml-2 text-sm text-gray-500">レベル</div>
          </div>
        </dd>
      </div>
      <div class="bg-gray-50 rounded-lg p-4">
        <dt class="text-sm font-medium text-gray-500">深いネストの箇所数</dt>
        <dd class="mt-1">
          <div class="flex items-center">
            <div class="text-2xl font-semibold text-gray-900">
              {{ getDeepNestingCount() }}
            </div>
            <div class="ml-2 text-sm text-gray-500">箇所</div>
          </div>
        </dd>
      </div>
    </div>

    <!-- ネスト詳細 -->
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              場所
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              深度
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              複雑度
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              評価
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="item in sortedNestingData" :key="item.location">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
              {{ item.location }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex items-center">
                <div class="space-x-1">
                  <span v-for="n in item.depth" :key="n"
                        class="inline-block w-1.5 h-4"
                        :class="getNestingBarClass(n)">
                  </span>
                </div>
                <span class="ml-2">{{ item.depth }}</span>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ item.complexity }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm">
              <span :class="getComplexityBadgeClass(item.complexity)"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {{ getComplexityLabel(item.complexity) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 改善推奨事項 -->
    <div v-if="hasImprovementSuggestions" class="bg-white rounded-lg shadow p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">改善推奨事項</h4>
      <div class="space-y-4">
        <div v-for="(suggestion, index) in improvementSuggestions" :key="index"
             class="flex items-start">
          <div class="flex-shrink-0">
            <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100">
              <svg class="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" 
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" 
                      clip-rule="evenodd" />
              </svg>
            </span>
          </div>
          <div class="ml-4">
            <h5 class="text-sm font-medium text-gray-900">{{ suggestion.title }}</h5>
            <p class="mt-1 text-sm text-gray-500">{{ suggestion.description }}</p>
            <div v-if="suggestion.example" class="mt-2">
              <div class="bg-gray-50 rounded p-3">
                <pre class="text-xs text-gray-700 whitespace-pre-wrap font-mono">{{ suggestion.example }}</pre>
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

const sortedNestingData = computed(() => {
  return [...props.data].sort((a, b) => b.depth - a.depth)
})

const getMaxNestingDepth = () => {
  return Math.max(...props.data.map(item => item.depth), 0)
}

const getAverageNestingDepth = () => {
  if (props.data.length === 0) return 0
  const sum = props.data.reduce((acc, item) => acc + item.depth, 0)
  return sum / props.data.length
}

const getDeepNestingCount = () => {
  return props.data.filter(item => item.depth > 3).length
}

const getNestingLevelBadgeClass = (depth) => {
  if (depth <= 3) return 'bg-green-100 text-green-800'
  if (depth <= 5) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getNestingLevelLabel = (depth) => {
  if (depth <= 3) return '適切'
  if (depth <= 5) return '要注意'
  return '改善必要'
}

const getNestingBarClass = (level) => {
  if (level <= 2) return 'bg-green-500'
  if (level <= 4) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getComplexityBadgeClass = (complexity) => {
  if (complexity < 10) return 'bg-green-100 text-green-800'
  if (complexity < 20) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

const getComplexityLabel = (complexity) => {
  if (complexity < 10) return '低'
  if (complexity < 20) return '中'
  return '高'
}

const hasImprovementSuggestions = computed(() => {
  return getMaxNestingDepth() > 3 || getDeepNestingCount() > 0
})

const improvementSuggestions = computed(() => {
  const suggestions = []

  if (getMaxNestingDepth() > 3) {
    suggestions.push({
      title: 'ネストの深さを削減',
      description: 'ネストが深いコードは理解が難しく、保守性が低下します。条件式の見直しや関数の抽出を検討してください。',
      example: `* 改善前:
       IF A = 1
          IF B = 1
             IF C = 1
                IF D = 1
                   PERFORM PROC-A
                END-IF
             END-IF
          END-IF
       END-IF

* 改善後:
       IF NOT VALID-CONDITIONS(A, B, C, D)
          EXIT
       END-IF
       PERFORM PROC-A`
    })
  }

  if (getDeepNestingCount() > 0) {
    suggestions.push({
      title: 'EVALUATE文の活用',
      description: '複数のIF文が連続する場合は、EVALUATE文の使用を検討してください。',
      example: `* 改善前:
       IF TYPE = "A"
          IF STATUS = "1"
             PERFORM PROC-A
          ELSE
             PERFORM PROC-B
          END-IF
       END-IF

* 改善後:
       EVALUATE TRUE
          WHEN TYPE = "A" AND STATUS = "1"
             PERFORM PROC-A
          WHEN TYPE = "A"
             PERFORM PROC-B
       END-EVALUATE`
    })
  }

  return suggestions
})
</script>
```