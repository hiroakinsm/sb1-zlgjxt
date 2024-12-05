<template>
  <div class="min-h-screen bg-gray-100">
    <!-- ヘッダー -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">サマリ解析結果</h1>
            <p class="mt-1 text-sm text-gray-600">
              解析対象: {{ selectedFiles.length }}ファイル
            </p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="showSourceList = !showSourceList"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {{ showSourceList ? '解析結果を表示' : '対象ソース一覧' }}
            </button>
            <button
              @click="showMermaidDiagrams = !showMermaidDiagrams"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {{ showMermaidDiagrams ? '解析結果を表示' : 'ダイアグラム表示' }}
            </button>
            <button
              @click="exportPDF"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              PDFエクスポート
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- サイドメニュー -->
      <nav class="w-64 bg-white shadow-lg min-h-screen">
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">分析メニュー</h2>
          <div class="space-y-4">
            <div v-for="section in menuSections" :key="section.id">
              <button
                @click="toggleSection(section.id)"
                class="w-full flex items-center justify-between p-2 text-left text-sm font-medium hover:bg-gray-50 rounded-md"
                :class="{ 'bg-indigo-50 text-indigo-700': currentSection === section.id }"
              >
                <span>{{ section.name }}</span>
                <svg
                  class="w-4 h-4 transform transition-transform"
                  :class="{ 'rotate-90': expandedSections[section.id] }"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div v-if="expandedSections[section.id]" class="pl-4 mt-2 space-y-2">
                <button
                  v-for="item in section.items"
                  :key="item.id"
                  @click="selectMenuItem(section.id, item.id)"
                  class="w-full p-2 text-left text-sm hover:bg-gray-50 rounded-md"
                  :class="{ 'bg-indigo-50 text-indigo-700': currentItem === item.id }"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- メインコンテンツ -->
      <main class="flex-1 p-8">
        <!-- ソース一覧 -->
        <div v-if="showSourceList">
          <AnalysisSourceList :sources="selectedFiles" />
        </div>
        <!-- Mermaidダイアグラム -->
        <div v-else-if="showMermaidDiagrams">
          <MermaidDiagrams :diagrams="mermaidDiagrams" />
        </div>
        <!-- メトリクスチャート -->
        <div v-else class="grid grid-cols-3 grid-rows-2 gap-6 h-[calc(100vh-12rem)]">
          <component
            v-for="(chart, index) in currentCharts"
            :key="index"
            :is="chart.component"
            :title="chart.title"
            :data="chart.data"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnalysisStore } from '../stores/analysisStore'
import { menuSections, getChartsForSection } from '../config/dashboardConfig'
import AnalysisSourceList from '../components/AnalysisSourceList.vue'
import MermaidDiagrams from '../components/MermaidDiagrams.vue'

const analysisStore = useAnalysisStore()
const currentSection = ref('structure')
const currentItem = ref('hierarchy')
const showSourceList = ref(false)
const showMermaidDiagrams = ref(false)
const expandedSections = ref({
  structure: true,
  dependencies: false,
  diagnostics: false
})

const selectedFiles = computed(() => analysisStore.selectedFiles)
const mermaidDiagrams = computed(() => analysisStore.analysisResults?.mermaidDiagrams || {})

const currentCharts = computed(() => {
  return getChartsForSection(currentSection.value, currentItem.value, analysisStore.analysisResults)
})

const toggleSection = (sectionId) => {
  expandedSections.value[sectionId] = !expandedSections.value[sectionId]
  if (expandedSections.value[sectionId]) {
    currentSection.value = sectionId
    currentItem.value = menuSections.find(s => s.id === sectionId).items[0].id
  }
}

const selectMenuItem = (sectionId, itemId) => {
  currentSection.value = sectionId
  currentItem.value = itemId
  showSourceList.value = false
  showMermaidDiagrams.value = false
}

const exportPDF = async () => {
  try {
    // PDFエクスポート処理の実装
    console.log('PDFエクスポート')
  } catch (error) {
    console.error('PDFエクスポートエラー:', error)
  }
}
</script>