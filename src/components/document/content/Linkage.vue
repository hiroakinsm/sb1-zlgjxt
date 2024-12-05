```vue
<template>
  <div class="space-y-6">
    <!-- データ項目一覧 -->
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table class="min-w-full divide-y divide-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              項目名
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              型
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              方向
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white">
          <tr v-for="item in data" :key="item.name">
            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
              {{ item.name }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {{ item.type }}
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span :class="getDirectionBadgeClass(item.direction)"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                {{ getDirectionLabel(item.direction) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- パラメータサマリ -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">パラメータサマリ</h4>
      <dl class="grid grid-cols-3 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">総パラメータ数</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ data.length }}
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">入力パラメータ</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ getDirectionCount('input') }}
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">出力パラメータ</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ getDirectionCount('output') }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- データ型分布 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">データ型分布</h4>
      <div class="space-y-3">
        <div v-for="(count, type) in dataTypeDistribution" :key="type"
             class="bg-gray-50 rounded-lg p-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900">{{ type }}</span>
            <span class="text-sm text-gray-500">{{ count }}項目</span>
          </div>
          <div class="mt-1 relative pt-1">
            <div class="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div :style="{ width: `${(count / data.length * 100)}%` }"
                   class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 注意事項 -->
    <div v-if="hasWarnings" class="bg-yellow-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-yellow-800 mb-3">注意事項</h4>
      <ul class="space-y-2">
        <li v-if="hasBidirectionalParams" class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clip-rule="evenodd" />
            </svg>
          </div>
          <p class="ml-2 text-sm text-yellow-700">
            双方向パラメータが検出されました。入出力の分離を検討してください。
          </p>
        </li>
      </ul>
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

const getDirectionBadgeClass = (direction) => {
  switch (direction) {
    case 'input':
      return 'bg-green-100 text-green-800'
    case 'output':
      return 'bg-blue-100 text-blue-800'
    case 'both':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getDirectionLabel = (direction) => {
  switch (direction) {
    case 'input':
      return '入力'
    case 'output':
      return '出力'
    case 'both':
      return '双方向'
    default:
      return '不明'
  }
}

const getDirectionCount = (direction) => {
  return props.data.filter(item => item.direction === direction).length
}

const dataTypeDistribution = computed(() => {
  const distribution = {}
  props.data.forEach(item => {
    distribution[item.type] = (distribution[item.type] || 0) + 1
  })
  return distribution
})

const hasBidirectionalParams = computed(() => {
  return props.data.some(item => item.direction === 'both')
})

const hasWarnings = computed(() => {
  return hasBidirectionalParams.value
})
</script>
```