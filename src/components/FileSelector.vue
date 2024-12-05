<template>
  <div class="bg-white shadow rounded-lg p-6">
    <!-- 解析モード選択 -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">解析モード</h2>
      <div class="flex space-x-4">
        <button
          v-for="mode in analysisModes"
          :key="mode.id"
          @click="selectMode(mode.id)"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md',
            analysisStore.mode === mode.id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          {{ mode.name }}
        </button>
      </div>
    </div>

    <!-- ファイル一覧 -->
    <div class="space-y-2">
      <div
        v-for="file in analyzedFiles"
        :key="file.name"
        :class="[
          'flex items-center justify-between p-3 rounded transition-colors cursor-pointer',
          isSelected(file) ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'bg-green-50 hover:bg-green-100'
        ]"
        @click="toggleFileSelection(file)"
      >
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            :checked="isSelected(file)"
            class="h-4 w-4 text-indigo-600 rounded"
            @click.stop
            @change="toggleFileSelection(file)"
          >
          <div>
            <span class="text-sm font-medium text-gray-900">{{ file.name }}</span>
            <span class="ml-2 text-xs text-gray-500">
              {{ formatMetrics(file.metrics) }}
            </span>
          </div>
        </div>
        <span class="text-xs text-green-600">解析済み</span>
      </div>
    </div>

    <!-- アクションボタン -->
    <div class="mt-6 flex justify-end space-x-4">
      <button
        v-if="analysisStore.mode === 'summary'"
        @click="selectAllFiles"
        class="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
      >
        全て選択
      </button>
      <button
        @click="clearSelection"
        class="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
      >
        選択解除
      </button>
      <button
        @click="startAnalysis"
        :disabled="!canStartAnalysis"
        :class="[
          'px-4 py-2 text-sm font-medium text-white rounded-md',
          canStartAnalysis
            ? 'bg-indigo-600 hover:bg-indigo-700'
            : 'bg-gray-400 cursor-not-allowed'
        ]"
      >
        {{ analysisButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnalysisStore } from '../stores/analysisStore'
import { mockFiles } from '../mockData/mockFiles'

const router = useRouter()
const analysisStore = useAnalysisStore()

const analysisModes = [
  { id: 'single', name: '単一ソース解析' },
  { id: 'summary', name: 'サマリ解析' }
]

const analyzedFiles = computed(() => mockFiles)

const canStartAnalysis = computed(() => {
  if (analysisStore.mode === 'single') {
    return analysisStore.singleSelectedFile !== null
  } else {
    return analysisStore.selectedFiles.length >= 2
  }
})

const analysisButtonText = computed(() => {
  if (analysisStore.mode === 'single') {
    return '単一ソース解析開始'
  } else {
    const count = analysisStore.selectedFiles.length
    if (count < 2) {
      return '2つ以上のファイルを選択してください'
    }
    return `サマリ解析開始 (${count}ファイル)`
  }
})

const selectMode = (mode) => {
  analysisStore.setMode(mode)
}

const isSelected = (file) => {
  if (analysisStore.mode === 'single') {
    return analysisStore.singleSelectedFile?.name === file.name
  } else {
    return analysisStore.selectedFiles.some(f => f.name === file.name)
  }
}

const toggleFileSelection = (file) => {
  analysisStore.selectFile(file)
}

const selectAllFiles = () => {
  analyzedFiles.value.forEach(file => {
    if (!isSelected(file)) {
      analysisStore.selectFile(file)
    }
  })
}

const clearSelection = () => {
  analysisStore.resetSelection()
}

const startAnalysis = async () => {
  if (await analysisStore.startAnalysis()) {
    router.push('/analysis')
  }
}

const formatMetrics = (metrics) => {
  if (!metrics) return ''
  return `総行数: ${metrics.totalLines.toLocaleString()}, コード行: ${metrics.codeLines.toLocaleString()}, コメント行: ${metrics.commentLines.toLocaleString()}`
}
</script>