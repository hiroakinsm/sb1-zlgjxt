import { defineStore } from 'pinia'
import { useSingleAnalysisStore } from './singleAnalysisStore'

export const useSummaryAnalysisStore = defineStore('summaryAnalysis', {
  state: () => ({
    selectedFiles: [],
    analysisResults: null,
    analysisTask: null,
    error: null,
    analysisHistory: [] // サマリ解析履歴
  }),

  getters: {
    isAnalyzing: (state) => state.analysisTask?.status === 'processing',
    hasResults: (state) => state.analysisResults !== null,
    selectedFileCount: (state) => state.selectedFiles.length,
    canStartAnalysis: (state) => state.selectedFiles.length >= 2,

    // 選択されたファイルの解析状態を確認
    analysisStatus(state) {
      const files = state.selectedFiles
      const analyzedCount = files.filter(f => f.analyzed).length

      if (analyzedCount === 0) return 'none'      // 全て未解析
      if (analyzedCount === files.length) return 'all'  // 全て解析済み
      return 'partial'  // 一部解析済み
    },

    // サマリ解析履歴の確認
    hasSummaryHistory(state) {
      const selectedFileNames = new Set(state.selectedFiles.map(f => f.name))
      return state.analysisHistory.some(history => {
        const historyFiles = new Set(history.files.map(f => f.name))
        return (
          selectedFileNames.size === historyFiles.size &&
          [...selectedFileNames].every(name => historyFiles.has(name))
        )
      })
    }
  },

  actions: {
    async startAnalysis(files) {
      if (files.length < 2) {
        this.error = '2つ以上のファイルを選択してください'
        return false
      }

      try {
        this.error = null
        this.selectedFiles = files

        // 既存のサマリ解析結果を確認
        if (this.hasSummaryHistory) {
          return await this.loadSummaryHistory()
        }

        // 解析状態に応じた処理
        switch (this.analysisStatus) {
          case 'none':
            return await this.analyzeAllFiles()
          case 'partial':
            return await this.analyzeRemainingFiles()
          case 'all':
            return await this.createSummaryAnalysis()
          default:
            throw new Error('不正な解析状態です')
        }
      } catch (error) {
        console.error('サマリ解析エラー:', error)
        this.error = error.message
        return false
      }
    },

    // 既存のサマリ解析結果を読み込む
    async loadSummaryHistory() {
      const history = this.analysisHistory.find(h => {
        const historyFiles = new Set(h.files.map(f => f.name))
        const selectedFiles = new Set(this.selectedFiles.map(f => f.name))
        return (
          historyFiles.size === selectedFiles.size &&
          [...selectedFiles].every(name => historyFiles.has(name))
        )
      })

      if (history) {
        this.analysisResults = history.results
        return true
      }
      return false
    },

    // 全ファイルの解析を実行
    async analyzeAllFiles() {
      const singleAnalysisStore = useSingleAnalysisStore()
      
      this.analysisTask = {
        id: Date.now(),
        status: 'processing',
        progress: 0,
        currentStep: '単一ソース解析'
      }

      // 全ファイルの単一解析を実行
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i]
        await singleAnalysisStore.startAnalysis(file)
        this.analysisTask.progress = (i + 1) / this.selectedFiles.length * 50
      }

      // サマリ解析の実行
      this.analysisTask.currentStep = 'サマリ解析'
      return await this.createSummaryAnalysis()
    },

    // 未解析ファイルの解析を実行
    async analyzeRemainingFiles() {
      const singleAnalysisStore = useSingleAnalysisStore()
      
      this.analysisTask = {
        id: Date.now(),
        status: 'processing',
        progress: 0,
        currentStep: '単一ソース解析'
      }

      // 未解析ファイルの単一解析を実行
      const unanalyzedFiles = this.selectedFiles.filter(f => !f.analyzed)
      for (let i = 0; i < unanalyzedFiles.length; i++) {
        const file = unanalyzedFiles[i]
        await singleAnalysisStore.startAnalysis(file)
        this.analysisTask.progress = (i + 1) / unanalyzedFiles.length * 50
      }

      // サマリ解析の実行
      this.analysisTask.currentStep = 'サマリ解析'
      return await this.createSummaryAnalysis()
    },

    // サマリ解析の実行
    async createSummaryAnalysis() {
      try {
        this.analysisTask = {
          ...this.analysisTask,
          status: 'processing',
          progress: 50,
          currentStep: 'サマリ解析'
        }

        // サマリ解析の実行
        const results = await this.analyzeSummary(this.selectedFiles)
        
        // 結果の保存
        this.analysisResults = results
        this.analysisHistory.push({
          id: Date.now(),
          files: this.selectedFiles,
          results,
          timestamp: new Date()
        })

        this.analysisTask.status = 'completed'
        this.analysisTask.progress = 100

        return true
      } catch (error) {
        console.error('サマリ解析エラー:', error)
        this.error = error.message
        this.analysisTask.status = 'error'
        return false
      }
    },

    // サマリ解析の実行
    async analyzeSummary(files) {
      // サマリ解析のロジック
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 選択されたファイルの情報を基にサマリデータを生成
      const totalLines = files.reduce((sum, file) => sum + file.metrics.totalLines, 0)
      const codeLines = files.reduce((sum, file) => sum + file.metrics.codeLines, 0)
      const commentLines = files.reduce((sum, file) => sum + file.metrics.commentLines, 0)

      return {
        timestamp: new Date(),
        sourceFiles: files,
        metrics: {
          totalLines,
          codeLines,
          commentLines,
          emptyLines: totalLines - codeLines - commentLines
        },
        // ... その他のサマリ分析結果
      }
    },

    // 選択のクリア
    clearSelection() {
      this.selectedFiles = []
      this.analysisResults = null
      this.analysisTask = null
      this.error = null
    },

    // 解析のリセット
    resetAnalysis() {
      this.selectedFiles = []
      this.analysisResults = null
      this.analysisTask = null
      this.error = null
    }
  }
})