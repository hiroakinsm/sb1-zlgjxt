import { defineStore } from 'pinia'
import { useAnalysisResultsStore } from './analysisResultsStore'

export const useDocumentStore = defineStore('document', {
  state: () => ({
    // ドキュメント生成設定
    settings: {
      showTableOfContents: true,
      showDiagrams: true,
      includeCharts: true,
      pageNumbers: true,
      headerFooter: true,
      fontSize: 11,
      fontFamily: 'Noto Sans JP',
      margin: 20
    },

    // セクション表示設定
    sectionSettings: {
      structure: true,
      codeFlow: true,
      quality: true,
      dependency: true,
      diagnostics: true,
      summary: true
    },

    // 生成状態
    generating: false,
    error: null,
    progress: 0,
    generatedDocument: null
  }),

  actions: {
    // ドキュメント設定の更新
    updateSettings(settings) {
      this.settings = {
        ...this.settings,
        ...settings
      }
    },

    // セクション設定の更新
    updateSectionSettings(settings) {
      this.sectionSettings = {
        ...this.sectionSettings,
        ...settings
      }
    },

    // 単一ソース解析ドキュメントの生成
    async generateSingleDocument(source) {
      try {
        this.generating = true
        this.progress = 0
        this.error = null

        const analysisResults = useAnalysisResultsStore()
        const results = analysisResults.getSectionResults('single')

        // ドキュメントの生成処理
        this.generatedDocument = await this.generateDocument(
          'single',
          source,
          results,
          this.settings
        )

        this.progress = 100
        return this.generatedDocument

      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.generating = false
      }
    },

    // サマリ解析ドキュメントの生成
    async generateSummaryDocument(sources) {
      try {
        this.generating = true
        this.progress = 0
        this.error = null

        const analysisResults = useAnalysisResultsStore()
        const results = analysisResults.getSectionResults('summary')

        // ドキュメントの生成処理
        this.generatedDocument = await this.generateDocument(
          'summary',
          sources,
          results,
          this.settings
        )

        this.progress = 100
        return this.generatedDocument

      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.generating = false
      }
    },

    // ドキュメント生成の共通処理
    async generateDocument(type, source, results, settings) {
      // ドキュメントの構造を生成
      const structure = this.createDocumentStructure(type, source, results)

      // セクションの生成
      const sections = await this.generateSections(structure, settings)

      // PDFの生成
      const pdf = await this.generatePDF(sections, settings)

      return pdf
    }
  }
})