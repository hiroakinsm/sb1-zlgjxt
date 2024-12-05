import { defineStore } from 'pinia'
import { useAnalysisResultsStore } from './analysisResultsStore'
import { useVisualizationStore } from './visualizationStore'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    // 現在の表示状態
    currentSection: 'structure',
    currentItem: '',
    currentSubsection: '',
    showSourceList: false,
    showMermaidDiagrams: false,
    expandedSections: {},
    expandedItems: {},

    // レイアウト設定
    layout: {
      gridCols: 3,
      gridRows: 2,
      showChartTitles: true,
      showLegends: true,
      showTooltips: true
    },

    // チャート表示設定
    chartSettings: {
      animations: true,
      responsiveAnimations: true,
      maintainAspectRatio: false
    },

    // フィルタリング設定
    filters: {
      severity: ['high', 'medium', 'low'],
      categories: [],
      dateRange: null
    }
  }),

  getters: {
    currentCharts: (state) => {
      const analysisResults = useAnalysisResultsStore()
      const visualization = useVisualizationStore()

      return visualization.getChartsForSection(
        state.currentSection,
        state.currentItem,
        state.currentSubsection,
        analysisResults.mode
      )
    },

    currentData: (state) => {
      const analysisResults = useAnalysisResultsStore()
      return analysisResults.getSectionResults(state.currentSection)
    }
  },

  actions: {
    // セクションの展開/折りたたみ
    toggleSection(sectionId) {
      this.expandedSections[sectionId] = !this.expandedSections[sectionId]
      if (this.expandedSections[sectionId]) {
        this.currentSection = sectionId
        this.expandedItems = {}
      }
    },

    // メニューアイテムの選択
    selectMenuItem(sectionId, itemId) {
      this.currentSection = sectionId
      this.currentItem = itemId
      this.expandedItems[itemId] = !this.expandedItems[itemId]
      this.showMermaidDiagrams = false
    },

    // サブセクションの選択
    selectSubsection(sectionId, itemId, subsectionId) {
      this.currentSection = sectionId
      this.currentItem = itemId
      this.currentSubsection = subsectionId
      this.showMermaidDiagrams = false
    },

    // レイアウト設定の更新
    updateLayout(settings) {
      this.layout = {
        ...this.layout,
        ...settings
      }
    },

    // チャート設定の更新
    updateChartSettings(settings) {
      this.chartSettings = {
        ...this.chartSettings,
        ...settings
      }
    },

    // フィルターの更新
    updateFilters(filters) {
      this.filters = {
        ...this.filters,
        ...filters
      }
    },

    // 表示状態のリセット
    resetView() {
      this.currentSection = 'structure'
      this.currentItem = ''
      this.currentSubsection = ''
      this.showSourceList = false
      this.showMermaidDiagrams = false
      this.expandedSections = {}
      this.expandedItems = {}
    }
  }
})