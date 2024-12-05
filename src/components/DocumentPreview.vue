<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">プレビュー</h2>
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-500"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="overflow-auto max-h-[calc(100vh-12rem)]">
      <!-- 単一ソース解析プレビュー -->
      <SingleAnalysisTemplate
        v-if="type === 'single'"
        :source-data="sourceData"
        :show-table-of-contents="settings.showTableOfContents"
        :show-diagrams="settings.showDiagrams"
      />

      <!-- サマリ解析プレビュー -->
      <SummaryAnalysisTemplate
        v-else
        :source-data="sourceData"
        :summary-data="summaryData"
        :show-table-of-contents="settings.showTableOfContents"
        :show-diagrams="settings.showDiagrams"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SingleAnalysisTemplate from '../templates/SingleAnalysisTemplate.vue'
import SummaryAnalysisTemplate from '../templates/SummaryAnalysisTemplate.vue'
import { useAnalysisStore } from '../stores/analysisStore'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['single', 'summary'].includes(value)
  },
  sourceData: {
    type: [Object, Array],
    required: true
  },
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const analysisStore = useAnalysisStore()

const summaryData = computed(() => {
  return analysisStore.analysisResults?.summary || {}
})
</script>