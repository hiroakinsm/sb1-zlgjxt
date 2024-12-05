import { defineStore } from 'pinia'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useAnalysisStore } from './analysisStore'

export const useSummaryAnalysisDocumentStore = defineStore('summaryAnalysisDocument', {
  state: () => ({
    documentData: null,
    isGenerating: false,
    error: null,
    progress: {
      current: 0,
      total: 100,
      message: ''
    },
    options: {
      showTableOfContents: true,
      showDiagrams: true,
      includeCharts: true,
      pageNumbers: true,
      headerFooter: true,
      fontSize: 11,
      fontFamily: 'Noto Sans JP'
    }
  }),

  actions: {
    async generateDocument(sourceFiles, options = {}) {
      try {
        this.isGenerating = true
        this.error = null
        this.options = { ...this.options, ...options }
        this.progress = { current: 0, total: 100, message: '解析状態を確認中...' }

        const analysisStore = useAnalysisStore()

        // 解析状態の確認
        const analysisStatus = this.checkAnalysisStatus(sourceFiles)
        this.progress.current = 10

        if (analysisStatus === 'exists') {
          // ケース①: 既存のサマリ解析結果を使用
          this.progress.message = '既存のサマリ解析結果を読み込み中...'
          await this.loadExistingSummaryAnalysis(sourceFiles)
        } else if (analysisStatus === 'all_analyzed') {
          // ケース②: 全ファイルが単一解析済み
          this.progress.message = 'サマリ解析を実行中...'
          await this.performSummaryAnalysis(sourceFiles)
        } else if (analysisStatus === 'partial') {
          // ケース③: 一部のファイルが未解析
          this.progress.message = '未解析ファイルの単一解析を実行中...'
          await this.analyzeRemainingFiles(sourceFiles)
          await this.performSummaryAnalysis(sourceFiles)
        } else {
          // ケース④: 全ファイルが未解析
          this.progress.message = '全ファイルの単一解析を実行中...'
          await this.analyzeAllFiles(sourceFiles)
          await this.performSummaryAnalysis(sourceFiles)
        }

        this.progress.current = 70
        this.progress.message = 'ドキュメントを生成中...'

        // PDFの生成
        const pdf = await this.generatePDF()
        
        this.progress.current = 90
        this.progress.message = 'PDFを出力中...'

        // PDFのダウンロード
        const fileName = `summary_analysis_${new Date().toISOString().split('T')[0]}.pdf`
        pdf.save(fileName)

        this.progress.current = 100
        this.progress.message = 'ドキュメント生成が完了しました'

        return true
      } catch (error) {
        console.error('ドキュメント生成エラー:', error)
        this.error = 'PDFの生成中にエラーが発生しました。'
        return false
      } finally {
        this.isGenerating = false
      }
    },

    checkAnalysisStatus(sourceFiles) {
      const analysisStore = useAnalysisStore()
      
      // 既存のサマリ解析結果を確認
      if (analysisStore.analysisResults?.summary) {
        const analyzedFiles = new Set(sourceFiles.map(f => f.name))
        const existingFiles = new Set(analysisStore.selectedFiles.map(f => f.name))
        
        if (analyzedFiles.size === existingFiles.size && 
            [...analyzedFiles].every(f => existingFiles.has(f))) {
          return 'exists'
        }
      }

      // 単一解析状態の確認
      const analyzedCount = sourceFiles.filter(f => f.analyzed).length
      
      if (analyzedCount === sourceFiles.length) return 'all_analyzed'
      if (analyzedCount === 0) return 'none'
      return 'partial'
    },

    async loadExistingSummaryAnalysis(sourceFiles) {
      const analysisStore = useAnalysisStore()
      this.documentData = {
        metadata: {
          title: 'COBOLソース解析サマリレポート',
          date: new Date().toLocaleDateString('ja-JP'),
          author: 'COBOLソース解析システム',
          fileCount: sourceFiles.length
        },
        content: analysisStore.analysisResults.summary
      }
    },

    async performSummaryAnalysis(sourceFiles) {
      const analysisStore = useAnalysisStore()
      await analysisStore.startAnalysis()
      
      this.documentData = {
        metadata: {
          title: 'COBOLソース解析サマリレポート',
          date: new Date().toLocaleDateString('ja-JP'),
          author: 'COBOLソース解析システム',
          fileCount: sourceFiles.length
        },
        content: analysisStore.analysisResults.summary
      }
    },

    async analyzeRemainingFiles(sourceFiles) {
      const analysisStore = useAnalysisStore()
      const unanalyzedFiles = sourceFiles.filter(f => !f.analyzed)
      
      for (const file of unanalyzedFiles) {
        analysisStore.singleSelectedFile = file
        await analysisStore.startAnalysis()
        this.progress.current += 10
      }
    },

    async analyzeAllFiles(sourceFiles) {
      const analysisStore = useAnalysisStore()
      
      for (const file of sourceFiles) {
        analysisStore.singleSelectedFile = file
        await analysisStore.startAnalysis()
        this.progress.current += 5
      }
    },

    async generatePDF() {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      // フォントの設定
      pdf.setFont(this.options.fontFamily)
      pdf.setFontSize(this.options.fontSize)

      // 表紙の追加
      await this.addCoverPage(pdf)

      // 目次の追加
      if (this.options.showTableOfContents) {
        await this.addTableOfContents(pdf)
      }

      // 本文の追加
      await this.addContent(pdf)

      // ヘッダー/フッターの追加
      if (this.options.headerFooter) {
        this.addHeadersAndFooters(pdf)
      }

      return pdf
    },

    async addCoverPage(pdf) {
      const { title, date, fileCount } = this.documentData.metadata
      
      pdf.setFontSize(24)
      pdf.text(title, 105, 100, { align: 'center' })
      
      pdf.setFontSize(12)
      pdf.text(`作成日: ${date}`, 105, 120, { align: 'center' })
      pdf.text(`解析対象: ${fileCount}ファイル`, 105, 130, { align: 'center' })
      
      pdf.addPage()
    },

    async addTableOfContents(pdf) {
      const sections = [
        { title: '1. 全体構造分析', page: 3 },
        { title: '2. 依存関係の総合分析', page: 6 },
        { title: '3. 診断分析の総合評価', page: 9 },
        { title: '4. システム構造図', page: 12 }
      ]

      pdf.setFontSize(16)
      pdf.text('目次', 20, 30)

      pdf.setFontSize(12)
      sections.forEach((section, index) => {
        pdf.text(section.title, 25, 50 + (index * 10))
        pdf.text(section.page.toString(), 180, 50 + (index * 10))
      })

      pdf.addPage()
    },

    async addContent(pdf) {
      const content = this.documentData.content

      // 全体構造分析
      await this.addStructureAnalysis(pdf, content.structure)

      // 依存関係の総合分析
      await this.addDependencyAnalysis(pdf, content.dependencies)

      // 診断分析の総合評価
      await this.addDiagnosticsAnalysis(pdf, content.diagnostics)

      // システム構造図
      if (this.options.showDiagrams) {
        await this.addDiagrams(pdf, content.diagrams)
      }
    },

    addHeadersAndFooters(pdf) {
      const pageCount = pdf.internal.getNumberOfPages()
      
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        
        // ヘッダー
        if (i > 1) {
          pdf.setFontSize(10)
          pdf.text('COBOLソース解析サマリレポート', 105, 15, { align: 'center' })
        }
        
        // フッター（ページ番号）
        pdf.text(
          `${i} / ${pageCount}`,
          105,
          pdf.internal.pageSize.height - 10,
          { align: 'center' }
        )
      }
    }
  }
})