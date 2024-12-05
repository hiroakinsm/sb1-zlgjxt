<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">解析進捗状況</h2>
    
    <!-- タスク進捗 -->
    <div class="space-y-4">
      <!-- 単一ソース解析タスク -->
      <div v-for="task in singleAnalysisTasks" :key="task.id" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">{{ task.fileName }} の解析</span>
          <span class="text-sm font-medium" :class="getStatusColor(task.status)">
            {{ getStatusText(task.status) }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${task.progress}%` }"
          ></div>
        </div>
      </div>

      <!-- サマリ解析タスク -->
      <div v-if="summaryTask" class="space-y-2 mt-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-900">サマリ解析</span>
          <span class="text-sm font-medium" :class="getStatusColor(summaryTask.status)">
            {{ getStatusText(summaryTask.status) }}
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-indigo-600 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${summaryTask.progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 完了メッセージ -->
    <div v-if="isAllCompleted" class="mt-6">
      <div class="bg-green-50 border border-green-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              全ての解析が完了しました
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskProgress',
  props: {
    singleAnalysisTasks: {
      type: Array,
      required: true
    },
    summaryTask: {
      type: Object,
      default: null
    }
  },
  computed: {
    isAllCompleted() {
      const allSingleTasksCompleted = this.singleAnalysisTasks.every(
        task => task.status === 'completed'
      )
      return allSingleTasksCompleted && 
             (!this.summaryTask || this.summaryTask.status === 'completed')
    }
  },
  methods: {
    getStatusColor(status) {
      switch (status) {
        case 'waiting':
          return 'text-gray-500'
        case 'processing':
          return 'text-blue-600'
        case 'completed':
          return 'text-green-600'
        case 'error':
          return 'text-red-600'
        default:
          return 'text-gray-600'
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'waiting':
          return '待機中'
        case 'processing':
          return '処理中'
        case 'completed':
          return '完了'
        case 'error':
          return 'エラー'
        default:
          return '不明'
      }
    }
  }
}
</script>