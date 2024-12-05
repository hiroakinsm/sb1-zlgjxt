import { defineStore } from 'pinia'

export const useAnalysisStore = defineStore('analysis', {
  state: () => ({
    mode: 'single',
    selectedFiles: [],
    singleSelectedFile: null,
    analysisResults: {
      single: {
        programInfo: {
          name: 'ACCOUNT.CBL',
          purpose: '口座管理プログラム',
          author: '開発者A',
          lastModified: new Date('2024-01-15'),
          updateHistory: [
            {
              date: new Date('2024-01-15'),
              author: '開発者A',
              description: '初期実装'
            }
          ]
        },
        structure: {
          metrics: {
            totalLines: 2500,
            codeLines: 1800,
            commentLines: 500,
            emptyLines: 200
          },
          complexity: {
            cyclomaticComplexity: 75,
            nestingDepth: 4,
            conditionalComplexity: 65,
            dataFlowComplexity: 60,
            maintainabilityIndex: 80
          }
        },
        dataFlow: {
          workingStorage: [
            {
              name: 'WS-ACCOUNT-REC',
              type: 'GROUP',
              usage: ['READ', 'WRITE']
            },
            {
              name: 'WS-ACCOUNT-ID',
              type: 'PIC X(10)',
              usage: ['READ']
            },
            {
              name: 'WS-ACCOUNT-NAME',
              type: 'PIC X(30)',
              usage: ['READ', 'WRITE']
            }
          ],
          linkage: [
            {
              name: 'LK-ACCOUNT-ID',
              type: 'PIC X(10)',
              direction: 'input'
            },
            {
              name: 'LK-RETURN-CODE',
              type: 'PIC 9(4)',
              direction: 'output'
            }
          ]
        },
        controlFlow: {
          problemCode: [
            {
              description: 'GOTO文の使用が検出されました (行番号: 150)',
              severity: 'warning'
            },
            {
              description: '深いネストが検出されました (行番号: 245-280)',
              severity: 'warning'
            }
          ],
          visualization: {
            flowchart: `
              graph TB
                A[開始] --> B{入力チェック}
                B -->|OK| C[データ処理]
                B -->|NG| D[エラー処理]
                C --> E[DB更新]
                D --> F[エラーログ]
                E --> G[終了]
                F --> G
            `
          }
        },
        quality: {
          codingStandards: {
            complianceRate: 85,
            violations: [
              {
                rule: '命名規則',
                description: '変数名が規約に準拠していません'
              }
            ]
          },
          maintainability: [
            {
              name: '可読性',
              score: 80,
              evaluation: '良好'
            },
            {
              name: '保守性',
              score: 75,
              evaluation: '要改善'
            },
            {
              name: 'テスト容易性',
              score: 70,
              evaluation: '要改善'
            }
          ]
        }
      }
    },
    singleAnalysisTasks: [],
    summaryTask: null,
    error: null
  }),

  getters: {
    isAnalyzing: (state) => {
      return state.singleAnalysisTasks.some(task => task.status === 'processing') ||
             (state.summaryTask?.status === 'processing')
    },
    
    hasResults: (state) => state.analysisResults !== null
  },

  actions: {
    async startAnalysis() {
      try {
        this.error = null
        
        if (this.mode === 'single') {
          if (!this.singleSelectedFile) {
            throw new Error('ファイルが選択されていません')
          }
          
          const task = {
            id: Date.now(),
            fileName: this.singleSelectedFile.name,
            status: 'processing',
            progress: 0
          }
          this.singleAnalysisTasks.push(task)

          await new Promise(resolve => setTimeout(resolve, 2000))
          
          task.status = 'completed'
          task.progress = 100

        } else {
          if (this.selectedFiles.length < 2) {
            throw new Error('2つ以上のファイルを選択してください')
          }

          this.summaryTask = {
            id: Date.now(),
            status: 'processing',
            progress: 0,
            fileCount: this.selectedFiles.length
          }

          await new Promise(resolve => setTimeout(resolve, 3000))
          
          this.summaryTask.status = 'completed'
          this.summaryTask.progress = 100
        }

        return true
      } catch (error) {
        console.error('Analysis error:', error)
        this.error = error.message
        return false
      }
    },

    setMode(mode) {
      this.mode = mode
      this.resetSelection()
    },

    selectFile(file) {
      if (this.mode === 'single') {
        this.singleSelectedFile = this.singleSelectedFile?.name === file.name ? null : file
      } else {
        const index = this.selectedFiles.findIndex(f => f.name === file.name)
        if (index === -1) {
          this.selectedFiles.push(file)
        } else {
          this.selectedFiles.splice(index, 1)
        }
      }
    },

    resetSelection() {
      if (this.mode === 'single') {
        this.singleSelectedFile = null
      } else {
        this.selectedFiles = []
      }
    },

    resetAnalysis() {
      this.analysisResults = null
      this.singleAnalysisTasks = []
      this.summaryTask = null
      this.error = null
    }
  }
})