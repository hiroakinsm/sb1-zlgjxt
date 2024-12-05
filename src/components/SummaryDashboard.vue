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
              <button 
                @click="showSourceList = true"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                表示
              </button>
            </p>
          </div>
          <div class="flex space-x-4">
            <button
              @click="showMermaidDiagrams = !showMermaidDiagrams"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {{ showMermaidDiagrams ? '解析結果を表示' : 'ダイアグラム表示' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ソース一覧モーダル -->
    <div v-if="showSourceList" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <SourceList 
          :sources="selectedFiles"
          @close="showSourceList = false"
        />
      </div>
    </div>

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
        <div v-if="analysisStore.isAnalyzing">
          <TaskProgress
            :single-analysis-tasks="analysisStore.singleAnalysisTasks"
            :summary-task="analysisStore.summaryTask"
          />
        </div>
        <template v-else>
          <!-- Mermaidダイアグラム -->
          <div v-if="showMermaidDiagrams" class="grid grid-cols-2 gap-6">
            <div v-for="(diagram, type) in mermaidDiagrams" 
                :key="type"
                class="bg-white rounded-lg shadow p-6">
              <MermaidDiagram
                :title="diagram.title"
                :content="diagram.content"
              />
            </div>
          </div>
          <!-- メトリクスチャート -->
          <div v-else class="grid grid-cols-3 grid-rows-2 gap-6 h-[calc(100vh-12rem)]">
            <component
              v-for="(chart, index) in currentCharts"
              :key="index"
              :is="chart.component"
              :title="chart.title"
              :data="getChartData(chart)"
            />
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnalysisStore } from '../stores/analysisStore'
import { menuSections } from '../config/dashboardConfig'
import MermaidDiagram from './MermaidDiagram.vue'
import SourceList from './SourceList.vue'
import TaskProgress from './TaskProgress.vue'
import * as charts from './charts'

const analysisStore = useAnalysisStore()
const currentSection = ref('structure')
const currentItem = ref('hierarchy')
const showSourceList = ref(false)
const showMermaidDiagrams = ref(false)
const expandedSections = ref({
  structure: true,
  dependencies: false,
  diagnostics: false,
  special: false
})

const selectedFiles = computed(() => analysisStore.selectedFiles)
const mermaidDiagrams = computed(() => {
  return analysisStore.analysisResults?.mermaidDiagrams || {}
})

const currentCharts = computed(() => {
  if (!analysisStore.analysisResults) return []
  
  const section = currentSection.value
  const item = currentItem.value
  
  switch (section) {
    case 'structure':
      return [
        { component: charts.ProgramHierarchyChart, title: 'プログラム階層', data: analysisStore.analysisResults.structure.programHierarchy },
        { component: charts.CodeMetricsChart, title: 'コードメトリクス', data: analysisStore.analysisResults.structure.codeMetrics },
        { component: charts.ComplexityChart, title: '複雑度分析', data: analysisStore.analysisResults.structure.complexity }
      ]
    case 'dependencies':
      return [
        { component: charts.SystemIntegrationChart, title: 'システム連携', data: analysisStore.analysisResults.dependencies.systemIntegration },
        { component: charts.DataFlowChart, title: 'データフロー', data: analysisStore.analysisResults.dependencies.dataFlow },
        { component: charts.InterfaceAnalysisChart, title: 'インターフェース', data: analysisStore.analysisResults.dependencies.interfaceAnalysis }
      ]
    case 'diagnostics':
      return [
        { component: charts.ModernizationChart, title: 'モダン化適性', data: analysisStore.analysisResults.diagnostics.modernization },
        { component: charts.RiskAnalysisChart, title: 'リスク分析', data: analysisStore.analysisResults.diagnostics.risk },
        { component: charts.MigrationPriorityChart, title: '移行優先度', data: analysisStore.analysisResults.diagnostics.migration }
      ]
    case 'special':
      return [
        { component: charts.VendorDialectChart, title: 'メーカー方言', data: analysisStore.analysisResults.special.vendorDialect },
        { component: charts.CharacterCodeChart, title: '文字コード', data: analysisStore.analysisResults.special.characterCode },
        { component: charts.FormOutputChart, title: 'フォーム出力', data: analysisStore.analysisResults.special.formOutput }
      ]
    default:
      return []
  }
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
  showMermaidDiagrams.value = false
}

const getChartData = (chart) => {
  return chart.data || {}
}
</script>