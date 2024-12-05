import { defineStore } from 'pinia'
import { summaryMockData } from '../mockData'

export const useSummaryAnalysisDashboardStore = defineStore('summaryAnalysisDashboard', {
  state: () => ({
    selectedFiles: [],
    analysisResults: null,
    analysisTask: null,
    error: null,
    currentSection: 'structure',
    currentItem: 'program',
    analysisHistory: []
  }),

  getters: {
    isAnalyzing: (state) => state.analysisTask?.status === 'processing',
    hasResults: (state) => state.analysisResults !== null,
    selectedFileCount: (state) => state.selectedFiles.length,
    canStartAnalysis: (state) => state.selectedFiles.length >= 2,

    currentChartData: (state) => {
      if (!state.analysisResults) return null

      switch (state.currentSection) {
        case 'structure':
          return state.analysisResults.structure
        case 'dependencies':
          return state.analysisResults.dependencies
        case 'diagnostics':
          return state.analysisResults.diagnostics
        case 'special':
          return state.analysisResults.special
        default:
          return null
      }
    },

    mermaidDiagrams: (state) => state.analysisResults?.mermaidDiagrams || {},

    analysisStatus(state) {
      const files = state.selectedFiles
      const analyzedCount = files.filter(f => f.analyzed).length

      if (analyzedCount === 0) return 'none'
      if (analyzedCount === files.length) return 'all'
      return 'partial'
    }
  }),

  actions: {
    async startAnalysis(files) {
      try {
        this.error = null
        this.selectedFiles = files
        
        this.analysisTask = {
          id: Date.now(),
          status: 'processing',
          progress: 0,
          currentStep: 'サマリ解析'
        }

        // サマリ解析の実行
        this.analysisResults = await this.analyzeSummary(files)
        
        this.analysisTask.status = 'completed'
        this.analysisTask.progress = 100

        // 履歴に追加
        this.analysisHistory.push({
          id: Date.now(),
          files: this.selectedFiles,
          results: this.analysisResults,
          timestamp: new Date()
        })

        return true
      } catch (error) {
        console.error('サマリ解析エラー:', error)
        this.error = error.message
        this.analysisTask.status = 'error'
        return false
      }
    },

    async analyzeSummary(files) {
      // サマリ解析のロジック
      await new Promise(resolve => setTimeout(resolve, 2000))
      return summaryMockData
    },

    setCurrentSection(section) {
      this.currentSection = section
    },

    setCurrentItem(item) {
      this.currentItem = item
    },

    resetAnalysis() {
      this.selectedFiles = []
      this.analysisResults = null
      this.analysisTask = null
      this.error = null
      this.currentSection = 'structure'
      this.currentItem = 'program'
    }
  }
})