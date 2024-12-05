<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">サマリ解析</h1>
        <p class="mt-2 text-sm text-gray-600">
          解析対象のソースファイルを選択してください
        </p>
      </div>

      <!-- ファイル選択コンポーネント -->
      <FileSelector
        v-if="!isAnalyzing"
        :files="sampleFiles"
        @start-analysis="startAnalysis"
      />

      <!-- 進捗表示コンポーネント -->
      <TaskProgress
        v-else
        :single-analysis-tasks="analysisStore.singleAnalysisTasks"
        :summary-task="analysisStore.summaryTask"
        @analysis-complete="onAnalysisComplete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnalysisStore } from '../stores/analysisStore'
import { sampleFiles } from '../mockData'
import FileSelector from '../components/FileSelector.vue'
import TaskProgress from '../components/TaskProgress.vue'

const router = useRouter()
const analysisStore = useAnalysisStore()
const isAnalyzing = ref(false)

const startAnalysis = async (selectedFiles) => {
  try {
    isAnalyzing.value = true
    await analysisStore.startSummaryAnalysis(selectedFiles)
    router.push('/analysis')
  } catch (error) {
    console.error('解析開始エラー:', error)
  } finally {
    isAnalyzing.value = false
  }
}

const onAnalysisComplete = () => {
  router.push('/analysis')
}
</script>