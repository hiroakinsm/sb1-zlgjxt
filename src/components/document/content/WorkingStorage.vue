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
              使用状況
            </th>
            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              REDEFINES
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
              <div class="flex gap-1">
                <span v-for="usage in item.usage" :key="usage"
                      :class="getUsageBadgeClass(usage)"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">
                  {{ usage }}
                </span>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span v-if="item.redefines" class="text-indigo-600">
                {{ item.redefines }}
              </span>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 使用状況サマリ -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">使用状況サマリ</h4>
      <dl class="grid grid-cols-3 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">総項目数</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ data.length }}
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">READ項目</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ getUsageCount('READ') }}
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">WRITE項目</dt>
          <dd class="mt-1 text-2xl font-semibold text-gray-900">
            {{ getUsageCount('WRITE') }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- REDEFINES分析 -->
    <div v-if="hasRedefines" class="bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">REDEFINES分析</h4>
      <div class="space-y-3">
        <div v-for="item in redefinesItems" :key="item.name"
             class="flex items-start space-x-3">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" 
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                    clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="text-sm text-gray-900">
              <span class="font-medium">{{ item.name }}</span> redefines 
              <span class="font-medium">{{ item.redefines }}</span>
            </p>
            <p class="mt-1 text-sm text-gray-500">
              データ型の互換性を確認してください
            </p>
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

const getUsageBadgeClass = (usage) => {
  switch (usage) {
    case 'READ':
      return 'bg-green-100 text-green-800'
    case 'WRITE':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getUsageCount = (type) => {
  return props.data.filter(item => item.usage.includes(type)).length
}

const hasRedefines = computed(() => {
  return props.data.some(item => item.redefines)
})

const redefinesItems = computed(() => {
  return props.data.filter(item => item.redefines)
})
</script>
```