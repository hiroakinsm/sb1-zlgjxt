```vue
<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">生成進捗状況</h3>
    
    <!-- 進捗バー -->
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full" 
                :class="getStatusColor()">
            {{ getStatusText() }}
          </span>
        </div>
        <div class="text-right">
          <span class="text-xs font-semibold inline-block">
            {{ Math.round((progress.current / progress.total) * 100) }}%
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
        <div :style="{ width: `${(progress.current / progress.total) * 100}%` }"
             class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
             :class="getProgressBarColor()">
        </div>
      </div>
    </div>

    <!-- メッセージ -->
    <p class="text-sm text-gray-600">{{ progress.message }}</p>

    <!-- ステップ表示 -->
    <div class="mt-4">
      <div v-for="(step, index) in steps" :key="index"
           class="flex items-center mb-2">
        <div class="w-6 h-6 rounded-full flex items-center justify-center mr-2"
             :class="getStepStatusColor(index)">
          <svg v-if="isStepComplete(index)" class="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span v-else class="text-xs">{{ index + 1 }}</span>
        </div>
        <span class="text-sm" :class="getStepTextColor(index)">{{ step }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: {
    type: Object,
    required: true,
    default: () => ({
      current: 0,
      total: 100,
      message: ''
    })
  },
  steps: {
    type: Array,
    required: true
  }
})

const getStatusColor = () => {
  if (props.progress.current === 0) return 'bg-gray-500 text-white'
  if (props.progress.current === props.progress.total) return 'bg-green-500 text-white'
  return 'bg-blue-500 text-white'
}

const getProgressBarColor = () => {
  if (props.progress.current === 0) return 'bg-gray-500'
  if (props.progress.current === props.progress.total) return 'bg-green-500'
  return 'bg-blue-500'
}

const getStatusText = () => {
  if (props.progress.current === 0) return '待機中'
  if (props.progress.current === props.progress.total) return '完了'
  return '生成中'
}

const isStepComplete = (index) => {
  const stepProgress = (index + 1) * (props.progress.total / props.steps.length)
  return props.progress.current >= stepProgress
}

const getStepStatusColor = (index) => {
  if (isStepComplete(index)) return 'bg-green-500'
  if (props.progress.current >= index * (props.progress.total / props.steps.length)) return 'bg-blue-500'
  return 'bg-gray-300'
}

const getStepTextColor = (index) => {
  if (isStepComplete(index)) return 'text-green-600'
  if (props.progress.current >= index * (props.progress.total / props.steps.length)) return 'text-blue-600'
  return 'text-gray-500'
}
</script>
```