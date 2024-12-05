<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg font-semibold text-gray-900">ドキュメント生成</h2>
      <div class="flex items-center space-x-4">
        <span v-if="documentStore.isGenerating" class="text-sm text-gray-500">
          生成中...
        </span>
        <button
          @click="generateDocument"
          :disabled="documentStore.isGenerating"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          PDF生成
        </button>
      </div>
    </div>

    <!-- エラー表示 -->
    <div v-if="documentStore.error" class="mb-6">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-red-800">
              {{ documentStore.error }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ドキュメント設定 -->
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">
          目次の表示
        </label>
        <div class="mt-1">
          <input
            type="checkbox"
            v-model="showTableOfContents"
            class="h-4 w-4 text-indigo-600 rounded"
          >
          <span class="ml-2 text-sm text-gray-600">目次を含める</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          ダイアグラムの表示
        </label>
        <div class="mt-1">
          <input
            type="checkbox"
            v-model="showDiagrams"
            class="h-4 w-4 text-indigo-600 rounded"
          >
          <span class="ml-2 text-sm text-gray-600">ダイアグラムを含める</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          チャートの表示
        </label>
        <div class="mt-1">
          <input
            type="checkbox"
            v-model="includeCharts"
            class="h-4 w-4 text-indigo-600 rounded"
          >
          <span class="ml-2 text-sm text-gray-600">チャートを含める</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          ページ番号
        </label>
        <div class="mt-1">
          <input
            type="checkbox"
            v-model="pageNumbers"
            class="h-4 w-4 text-indigo-600 rounded"
          >
          <span class="ml-2 text-sm text-gray-600">ページ番号を表示</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          ヘッダー/フッター
        </label>
        <div class="mt-1">
          <input
            type="checkbox"
            v-model="headerFooter"
            class="h-4 w-4 text-indigo-600 rounded"
          >
          <span class="ml-2 text-sm text-gray-600">ヘッダーとフッターを表示</span>
        </div>
      </div>
    </div>

    <!-- プレビュー -->
    <div v-if="showPreview" class="mt-8">
      <h3 class="text-lg font-medium text-gray-900 mb-4">プレビュー</h3>
      <div class="border rounded-lg p-4 bg-gray-50">
        <component
          :is="documentTemplate"
          :source-data="sourceData"
          :show-table-of-contents="showTableOfContents"
          :show-diagrams="showDiagrams"
          :include-charts="includeCharts"
          :page-numbers="pageNumbers"
          :header-footer="headerFooter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDocumentStore } from '../stores/documentStore'
import SingleAnalysisTemplate from '../templates/SingleAnalysisTemplate.vue'
import SummaryAnalysisTemplate from '../templates/SummaryAnalysisTemplate.vue'

const props = defineProps({
  sourceData: {
    type: [Object, Array],
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['single', 'summary'].includes(value)
  },
  showPreview: {
    type: Boolean,
    default: false
  }
})

const documentStore = useDocumentStore()

// ドキュメント設定
const showTableOfContents = ref(true)
const showDiagrams = ref(true)
const includeCharts = ref(true)
const pageNumbers = ref(true)
const headerFooter = ref(true)

// テンプレートの選択
const documentTemplate = computed(() => {
  return props.type === 'single' ? SingleAnalysisTemplate : SummaryAnalysisTemplate
})

// ドキュメント生成
const generateDocument = async () => {
  const options = {
    showTableOfContents: showTableOfContents.value,
    showDiagrams: showDiagrams.value,
    includeCharts: includeCharts.value,
    pageNumbers: pageNumbers.value,
    headerFooter: headerFooter.value
  }

  await documentStore.generateDocument(props.sourceData, props.type, options)
}
</script>