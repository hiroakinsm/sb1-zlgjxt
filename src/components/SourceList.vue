<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900">解析対象ソース一覧</h2>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-500">合計: {{ sources.length }}ファイル</span>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-500"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="source in sources" 
           :key="source.name"
           class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div class="w-2 h-2 rounded-full" 
                 :class="source.analyzed ? 'bg-green-400' : 'bg-gray-400'">
            </div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ source.name }}</p>
            <p class="text-xs text-gray-500">
              {{ formatMetrics(source.metrics) }}
            </p>
          </div>
        </div>
        <span class="text-xs font-medium" 
              :class="source.analyzed ? 'text-green-600' : 'text-gray-500'">
          {{ source.analyzed ? '解析済み' : '未解析' }}
        </span>
      </div>
    </div>

    <!-- 解析情報サマリ -->
    <div class="mt-6 border-t border-gray-200 pt-4">
      <h3 class="text-sm font-medium text-gray-900 mb-2">解析情報</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500">解析済み</p>
          <p class="font-medium">{{ analyzedCount }}ファイル</p>
        </div>
        <div>
          <p class="text-gray-500">未解析</p>
          <p class="font-medium">{{ unanalyzedCount }}ファイル</p>
        </div>
        <div>
          <p class="text-gray-500">総行数</p>
          <p class="font-medium">{{ totalLines.toLocaleString() }}行</p>
        </div>
        <div>
          <p class="text-gray-500">平均行数</p>
          <p class="font-medium">{{ averageLines.toLocaleString() }}行</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  sources: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['close'])

const analyzedCount = computed(() => props.sources.filter(s => s.analyzed).length)
const unanalyzedCount = computed(() => props.sources.length - analyzedCount.value)
const totalLines = computed(() => props.sources.reduce((sum, s) => sum + (s.metrics?.totalLines || 0), 0))
const averageLines = computed(() => props.sources.length ? Math.round(totalLines.value / props.sources.length) : 0)

const formatMetrics = (metrics) => {
  if (!metrics) return ''
  return `総行数: ${metrics.totalLines.toLocaleString()}, コード行: ${metrics.codeLines.toLocaleString()}, コメント行: ${metrics.commentLines.toLocaleString()}`
}
</script>