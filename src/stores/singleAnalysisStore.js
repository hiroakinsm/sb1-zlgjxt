import { defineStore } from 'pinia'

export const useSingleAnalysisStore = defineStore('singleAnalysis', {
  state: () => ({
    selectedFile: null,
    analysisResults: null,
    analysisTask: null,
    error: null
  }),

  getters: {
    isAnalyzing: (state) => state.analysisTask?.status === 'processing',
    hasResults: (state) => state.analysisResults !== null
  },

  actions: {
    async startAnalysis(file) {
      try {
        this.error = null
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
      // モックデータを使用（実際の解析ロジックに置き換える）
      await new Promise(resolve => setTimeout(resolve, 2000))

      return {
        fileName: file.name,
        metrics: {
          totalLines: file.metrics.totalLines,
          codeLines: file.metrics.codeLines,
          commentLines: file.metrics.commentLines,
          emptyLines: file.metrics.emptyLines,
          divisionCount: 4,
          sectionCount: 12,
          paragraphCount: 25
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

    resetAnalysis() {
      this.selectedFile = null
      this.analysisResults = null
      this.analysisTask = null
      this.error = null
    }
  }
})