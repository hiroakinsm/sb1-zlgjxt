<template>
  <div class="bg-white shadow rounded-lg p-6">
    <!-- ドキュメント設定 -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">ドキュメント設定</h2>
      <DocumentSettings v-model="settings" />
    </div>

    <!-- エラー表示 -->
    <div v-if="error" class="mb-6">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- プレビューボタン -->
    <div class="mb-6 flex justify-between items-center">
      <button
        @click="showPreview = !showPreview"
        class="text-sm text-indigo-600 hover:text-indigo-900"
      >
        {{ showPreview ? 'プレビューを閉じる' : 'プレビューを表示' }}
      </button>
      <button
        @click="generateDocument"
        :disabled="isGenerating"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {{ isGenerating ? '生成中...' : 'PDFを生成' }}
      </button>
    </div>

    <!-- プレビュー -->
    <DocumentPreview
      v-if="showPreview"
      :type="type"
      :source-data="sourceData"
      :settings="settings"
      @close="showPreview = false"
    />

    <!-- 進捗表示 -->
    <DocumentProgress
      v-if="isGenerating"
      :progress="documentProgress"
      :steps="progressSteps"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSingleAnalysisDocumentStore } from '../stores/singleAnalysisDocumentStore'
import { useSummaryAnalysisDocumentStore } from '../stores/summaryAnalysisDocumentStore'
import DocumentSettings from './DocumentSettings.vue'
import DocumentProgress from './DocumentProgress.vue'
import DocumentPreview from './DocumentPreview.vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['single', 'summary'].includes(value)
  },
  sourceData: {
    type: [Object, Array],
    required: true
  }
})

const documentStore = computed(() => {
  return props.type === 'single'
    ? useSingleAnalysisDocumentStore()
    : useSummaryAnalysisDocumentStore()
})

const settings = ref({
  showTableOfContents: true,
  showDiagrams: true,
  includeCharts: true,
  pageNumbers: true,
  headerFooter: true
})

const error = ref(null)
const showPreview = ref(false)

const isGenerating = computed(() => documentStore.value.isGenerating)
const documentProgress = computed(() => documentStore.value.progress)

const progressSteps = computed(() => {
  return props.type === 'single'
    ? ['解析状態の確認', 'ドキュメント生成', 'PDF出力']
    : ['解析状態の確認', '単一ソース解析', 'サマリ解析', 'ドキュメント生成', 'PDF出力']
})

const generateDocument = async () => {
  try {
    error.value = null
    
    if (!props.sourceData) {
      throw new Error('ソースデータが指定されていません')
    }

    const result = await documentStore.value.generateDocument(props.sourceData, settings.value)
    if (!result) {
      throw new Error(documentStore.value.error || 'ドキュメントの生成に失敗しました')
    }
  } catch (err) {
    error.value = err.message
    console.error('ドキュメント生成エラー:', err)
  }
}
</script>