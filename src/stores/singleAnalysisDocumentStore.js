import { defineStore } from 'pinia'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const useSingleAnalysisDocumentStore = defineStore('singleAnalysisDocument', {
  state: () => ({
    isGenerating: false,
    error: null,
    progress: {
      current: 0,
      total: 100,
      message: ''
    }
  }),

  actions: {
    async generateDocument(sourceData, settings) {
      try {
        this.isGenerating = true
        this.error = null
        this.progress = {
          current: 0,
          total: 100,
          message: 'PDFを生成中...'
        }

        // PDFドキュメントの作成
        const doc = new jsPDF()
        
        // フォントの設定
        doc.setFont('helvetica')
        
        // タイトルページ
        doc.setFontSize(24)
        doc.text('COBOLソース解析レポート', 105, 40, { align: 'center' })
        
        doc.setFontSize(14)
        doc.text(`ファイル名: ${sourceData.name}`, 105, 60, { align: 'center' })
        doc.text(`作成日: ${new Date().toLocaleDateString('ja-JP')}`, 105, 70, { align: 'center' })

        this.progress.current = 20

        // 目次
        if (settings.showTableOfContents) {
          doc.addPage()
          doc.setFontSize(16)
          doc.text('目次', 20, 30)
          
          const sections = [
            '1. プログラム基本情報',
            '2. 構造分析',
            '3. データフロー分析',
            '4. 制御フロー分析',
            '5. 品質分析'
          ]
          
          sections.forEach((section, index) => {
            doc.setFontSize(12)
            doc.text(section, 25, 50 + (index * 10))
          })
        }

        this.progress.current = 40

        // プログラム基本情報
        doc.addPage()
        doc.setFontSize(16)
        doc.text('1. プログラム基本情報', 20, 30)
        
        const info = [
          ['プログラム名', sourceData.name],
          ['目的', sourceData.purpose || ''],
          ['作成者', sourceData.author || ''],
          ['最終更新日', new Date(sourceData.lastModified).toLocaleDateString('ja-JP')]
        ]
        
        doc.autoTable({
          startY: 40,
          head: [['項目', '内容']],
          body: info
        })

        this.progress.current = 60

        // 構造分析
        doc.addPage()
        doc.setFontSize(16)
        doc.text('2. 構造分析', 20, 30)
        
        // メトリクス表
        const metrics = [
          ['総行数', sourceData.metrics?.totalLines?.toString() || '0'],
          ['実行行数', sourceData.metrics?.codeLines?.toString() || '0'],
          ['コメント行数', sourceData.metrics?.commentLines?.toString() || '0']
        ]
        
        doc.autoTable({
          startY: 40,
          head: [['メトリクス', '値']],
          body: metrics
        })

        this.progress.current = 80

        // フッター
        if (settings.pageNumbers) {
          const pageCount = doc.internal.getNumberOfPages()
          for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.setFontSize(10)
            doc.text(`${i} / ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' })
          }
        }

        this.progress.current = 90

        // PDFの保存
        const fileName = `${sourceData.name}_analysis_${new Date().toISOString().split('T')[0]}.pdf`
        doc.save(fileName)

        this.progress.current = 100
        this.progress.message = '完了'

        return true
      } catch (error) {
        console.error('PDF生成エラー:', error)
        this.error = 'PDFの生成中にエラーが発生しました。'
        return false
      } finally {
        this.isGenerating = false
      }
    }
  }
})