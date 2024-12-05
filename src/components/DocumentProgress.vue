<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">生成進捗状況</h2>
    
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
</script>