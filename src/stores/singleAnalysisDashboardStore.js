import { defineStore } from 'pinia'

export const useSingleAnalysisDashboardStore = defineStore('singleAnalysisDashboard', {
  state: () => ({
    selectedFile: null,
    analysisResults: null,
    analysisTask: null,
    error: null,
    currentSection: 'structure',
    currentItem: 'program'
  }),

  getters: {
    isAnalyzing: (state) => state.analysisTask?.status === 'processing',
    hasResults: (state) => state.analysisResults !== null,

    currentChartData: (state) => {
      if (!state.analysisResults) return null

      switch (state.currentSection) {
        case 'structure':
          return {
            metrics: state.analysisResults.metrics,
            complexity: state.analysisResults.complexity,
            quality: state.analysisResults.quality
          }
        case 'dependencies':
          return {
            dataFlow: state.analysisResults.dataFlow,
            security: state.analysisResults.security,
            dependencies: state.analysisResults.dependencies
          }
        case 'diagnostics':
          return {
            modernization: state.analysisResults.modernization,
            risk: state.analysisResults.risk,
            migration: state.analysisResults.migration
          }
        default:
          return null
      }
    },

    mermaidDiagrams: (state) => state.analysisResults?.diagrams || {}
  }),

  actions: {
    async startAnalysis(file) {
      try {
        this.error = null
        this.selectedFile = file
        this.analysisTask = {
          id: Date.now(),
          fileName: file.name,
          status: 'processing',
          progress: 0
        }

        // 単一ソース解析の実行
        const results = await this.analyzeSingleSource(file)
        
        this.analysisResults = results
        this.analysisTask.status = 'completed'
        this.analysisTask.progress = 100

        return true
      } catch (error) {
        console.error('単一ソース解析エラー:', error)
        this.error = error.message
        this.analysisTask.status = 'error'
        return false
      }
    },

    async analyzeSingleSource(file) {
      // 単一ソース解析のロジック
      await new Promise(resolve => setTimeout(resolve, 2000))

      return {
        fileName: file.name,
        metrics: {
          totalLines: file.metrics.totalLines,
          codeLines: file.metrics.codeLines,
          commentLines: file.metrics.commentLines,
          emptyLines: file.metrics.emptyLines
        },
        complexity: {
          cyclomaticComplexity: 75,
          nestingDepth: 60,
          conditionalComplexity: 70,
          dataFlowComplexity: 65,
          maintainabilityIndex: 80
        },
        quality: {
          commentRatio: 25,
          testability: 70,
          codeQuality: 85,
          documentationQuality: 75
        },
        dataFlow: {
          input: 45,
          process: 65,
          output: 40
        },
        security: {
          sqlInjection: 90,
          bufferOverflow: 85,
          fileOperation: 80,
          errorHandling: 75,
          inputValidation: 85
        },
        dependencies: {
          externalCalls: 12,
          commonModules: 8,
          fileReferences: 15,
          dbReferences: 10
        },
        diagrams: {
          flowchart: {
            title: "制御フロー図",
            content: `
              graph TB
                A[開始] --> B{入力チェック}
                B -->|OK| C[データ処理]
                B -->|NG| D[エラー処理]
                C --> E[DB更新]
                D --> F[エラーログ]
                E --> G[終了]
                F --> G
            `
          },
          dataFlow: {
            title: "データフロー図",
            content: `
              graph LR
                A((入力データ)) --> B[データ検証]
                B --> C[データ変換]
                C --> D[ビジネスロジック]
                D --> E[データ整形]
                E --> F((出力データ))
                D --> G[ログ記録]
                G --> H[(ログDB)]
            `
          }
        }
      }
    },

    setCurrentSection(section) {
      this.currentSection = section
    },

    setCurrentItem(item) {
      this.currentItem = item
    },

    resetAnalysis() {
      this.selectedFile = null
      this.analysisResults = null
      this.analysisTask = null
      this.error = null
      this.currentSection = 'structure'
      this.currentItem = 'program'
    }
  }
})