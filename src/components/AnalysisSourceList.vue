<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900">解析対象ソース一覧</h2>
      <span class="text-sm text-gray-500">合計: {{ sources.length }}ファイル</span>
    </div>

    <div class="space-y-4">
      <div v-for="source in sources" :key="source.name" 
           class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center space-x-4">
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
  </div>
</template>

<script>
export default {
  name: 'AnalysisSourceList',
  props: {
    sources: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatMetrics(metrics) {
      if (!metrics) return ''
      return `総行数: ${metrics.totalLines}, コード行: ${metrics.codeLines}, コメント行: ${metrics.commentLines}`
    }
  }
}
</script>