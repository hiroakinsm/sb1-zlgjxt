```typescript
import { defineStore } from 'pinia'
import type { AnalysisResult, DocumentSettings } from '../types/analysisTypes'
import { DocumentGenerator } from '../utils/document/core/DocumentGenerator'

export const useSingleAnalysisDocumentStore = defineStore('singleAnalysisDocument', {
  state: () => ({
    isGenerating: false,
    error: null as string | null,
    progress: {
      current: 0,
      total: 100,
      message: ''
    }
  }),

  actions: {
    async generateDocument(analysis: AnalysisResult, settings: DocumentSettings): Promise<boolean> {
      try {
        this.isGenerating = true
        this.error = null
        this.progress = {
          current: 0,
          total: 100,
          message: 'PDFを生成中...'
        }

        const documentGenerator = DocumentGenerator.getInstance()
        
        this.progress.current = 20
        this.progress.message = 'フォントを読み込み中...'
        await documentGenerator.initialize()

        this.progress.current = 40
        this.progress.message = 'ドキュメントを生成中...'
        await documentGenerator.generateDocument(analysis, settings)

        this.progress.current = 100
        this.progress.message = '完了'

        return true
      } catch (error) {
        console.error('PDF生成エラー:', error)
        this.error = error instanceof Error ? error.message : 'PDFの生成中にエラーが発生しました'
        return false
      } finally {
        this.isGenerating = false
      }
    }
  }
})
```