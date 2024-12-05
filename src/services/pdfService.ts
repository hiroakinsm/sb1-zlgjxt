import { loadFonts } from '../utils/pdf/fontLoader';
import { generatePDF } from '../utils/pdf/generator';
import type { AnalysisResult, DocumentSettings } from '../types/analysisTypes';
import type { PDFGenerationResult } from '../utils/pdf/types';

export class PDFService {
  private static instance: PDFService;
  private fontsLoaded: boolean = false;

  private constructor() {}

  static getInstance(): PDFService {
    if (!PDFService.instance) {
      PDFService.instance = new PDFService();
    }
    return PDFService.instance;
  }

  async initialize(): Promise<void> {
    if (!this.fontsLoaded) {
      try {
        await loadFonts();
        this.fontsLoaded = true;
      } catch (error) {
        console.error('Font initialization error:', error);
        throw new Error('フォントの初期化に失敗しました');
      }
    }
  }

  async generateDocument(analysis: AnalysisResult, settings: DocumentSettings): Promise<PDFGenerationResult> {
    try {
      if (!this.fontsLoaded) {
        await this.initialize();
      }

      await generatePDF(analysis, settings);
      
      return {
        success: true
      };
    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDF生成中にエラーが発生しました'
      };
    }
  }

  async generateBatchDocuments(analyses: AnalysisResult[], settings: DocumentSettings): Promise<PDFGenerationResult[]> {
    try {
      if (!this.fontsLoaded) {
        await this.initialize();
      }

      const results = await Promise.all(
        analyses.map(analysis => this.generateDocument(analysis, settings))
      );

      return results;
    } catch (error) {
      console.error('Batch PDF generation error:', error);
      throw error;
    }
  }
}

export const pdfService = PDFService.getInstance();