```vue
<template>
  <div class="space-y-6">
    <!-- 基本メトリクス -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">基本メトリクス</h4>
      <div class="bg-gray-50 rounded-lg p-4">
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">総行数</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ formatNumber(data.totalLines) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">実行行数</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ formatNumber(data.codeLines) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">コメント行数</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ formatNumber(data.commentLines) }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">空行数</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ formatNumber(data.emptyLines) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- 比率グラフ -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">コード構成比率</h4>
      <div class="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div class="absolute top-0 left-0 h-full bg-blue-500"
             :style="{ width: `${getCodeRatio()}%` }">
        </div>
        <div class="absolute top-0 left-0 h-full bg-green-500"
             :style="{ width: `${getCommentRatio()}%`, marginLeft: `${getCodeRatio()}%` }">
        </div>
        <div class="absolute top-0 left-0 h-full bg-gray-400"
             :style="{ width: `${getEmptyRatio()}%`, marginLeft: `${getCodeRatio() + getCommentRatio()}%` }">
        </div>
      </div>
      <div class="mt-2 flex justify-between text-xs text-gray-500">
        <span>実行コード: {{ getCodeRatio() }}%</span>
        <span>コメント: {{ getCommentRatio() }}%</span>
        <span>空行: {{ getEmptyRatio() }}%</span>
      </div>
    </div>

    <!-- 品質指標 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">品質指標</h4>
      <div class="space-y-3">
        <div v-for="(metric, key) in qualityMetrics" :key="key">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium text-gray-700">{{ metric.label }}</span>
            <span class="text-sm font-medium text-gray-900">{{ metric.value }}</span>
          </div>
          <div class="relative h-2 bg-gray-200 rounded-full">
            <div class="absolute top-0 left-0 h-full rounded-full"
                 :class="getQualityColor(metric.value)"
                 :style="{ width: `${metric.value}%` }">
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
    type: Object,
    required: true,
    default: () => ({
      totalLines: 0,
      codeLines: 0,
      commentLines: 0,
      emptyLines: 0
    })
  }
})

const formatNumber = (num) => {
  return num.toLocaleString('ja-JP')
}

const getCodeRatio = () => {
  return Math.round(props.data.codeLines / props.data.totalLines * 100)
}

const getCommentRatio = () => {
  return Math.round(props.data.commentLines / props.data.totalLines * 100)
}

const getEmptyRatio = () => {
  return Math.round(props.data.emptyLines / props.data.totalLines * 100)
}

const qualityMetrics = computed(() => ({
  commentRatio: {
    label: 'コメント率',
    value: getCommentRatio()
  },
  maintainability: {
    label: '保守性指標',
    value: 85 // この値は実際のデータから計算する必要があります
  },
  complexity: {
    label: '複雑度',
    value: 75 // この値は実際のデータから計算する必要があります
  }
}))

const getQualityColor = (value) => {
  if (value >= 80) return 'bg-green-500'
  if (value >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>
```