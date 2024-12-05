<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">解析進捗状況</h1>
        <p class="mt-2 text-sm text-gray-600">
          選択されたファイルの解析状況を確認できます
        </p>
      </div>

      <TaskProgress
        :single-analysis-tasks="analysisStore.singleAnalysisTasks"
        :summary-task="analysisStore.summaryTask"
        @analysis-complete="onAnalysisComplete"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAnalysisStore } from '../stores/analysisStore'
import TaskProgress from '../components/TaskProgress.vue'

const router = useRouter()
const analysisStore = useAnalysisStore()

const onAnalysisComplete = () => {
  router.push('/summary')
}
</script>