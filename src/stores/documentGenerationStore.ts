import { defineStore } from 'pinia';
import type { DocumentSettings, GenerationProgress, AnalysisResult } from '../types/analysisTypes';
import { useAnalysisDataStore } from './analysisDataStore';
import { pdfService } from '../services/pdfService';

export const useDocumentGenerationStore = defineStore('documentGeneration', {
  state: () => ({
    settings: {
      showTableOfContents: true,
      showDiagrams: true,
      includeCharts: true,
      pageNumbers: true,
      headerFooter: true
    } as DocumentSettings,
    
    progress: {
      current: 0,
      total: 100,
      message: ''
    } as GenerationProgress,
    
    isGenerating: false,
    error: null as string | null
  }),

  actions: {
    async generateDocument(analysisId: string) {
      try {
        this.isGenerating = true;
        this.error = null;
        this.progress = {
          current: 0,
          total: 100,
          message: '解析データを読み込み中...'
        };

        const analysisStore = useAnalysisDataStore();
        const analysis = analysisStore.getAnalysisById(analysisId);

        if (!analysis) {
          throw new Error('解析データが見つかりません');
        }

        this.progress.current = 20;
        this.progress.message = 'PDFを生成中...';

        const result = await pdfService.generateDocument(analysis, this.settings);

        if (!result.success) {
          throw new Error(result.error || 'PDF生成に失敗しました');
        }

        this.progress.current = 100;
        this.progress.message = 'PDF生成が完了しました';

        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました';
        return false;
      } finally {
        this.isGenerating = false;
      }
    },

    async generateBatchDocuments(analysisIds: string[]) {
      try {
        this.isGenerating = true;
        this.error = null;
        
        const analysisStore = useAnalysisDataStore();
        const analyses = analysisIds
          .map(id => analysisStore.getAnalysisById(id))
          .filter((analysis): analysis is AnalysisResult => analysis !== null);

        if (analyses.length === 0) {
          throw new Error('解析データが見つかりません');
        }

        const results = await pdfService.generateBatchDocuments(analyses, this.settings);
        const failedResults = results.filter(result => !result.success);

        if (failedResults.length > 0) {
          throw new Error(`${failedResults.length}件のPDF生成に失敗しました`);
        }

        return true;
      } catch (error) {
        this.error = error instanceof Error ? error.message : '不明なエラーが発生しました';
        return false;
      } finally {
        this.isGenerating = false;
      }
    },

    updateSettings(settings: Partial<DocumentSettings>) {
      this.settings = {
        ...this.settings,
        ...settings
      };
    },

    resetProgress() {
      this.progress = {
        current: 0,
        total: 100,
        message: ''
      };
    }
  }
});