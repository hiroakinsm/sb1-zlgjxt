import type { PDFGenerationOptions, PDFGenerationResult } from '../../../types/pdf/interfaces';
import type { AnalysisResult, DocumentSettings } from '../../../types/analysisTypes';
import { PDFDocument } from './PDFDocument';
import { FontLoader } from '../fonts/FontLoader';
import { DocumentBuilder } from './DocumentBuilder';

export class PDFGenerator {
  private static instance: PDFGenerator;
  private pdfDocument: PDFDocument;
  private fontLoader: FontLoader;
  private documentBuilder: DocumentBuilder;
  private initialized: boolean = false;

  private constructor() {
    this.pdfDocument = new PDFDocument();
    this.fontLoader = new FontLoader();
    this.documentBuilder = new DocumentBuilder();
  }

  public static getInstance(): PDFGenerator {
    if (!PDFGenerator.instance) {
      PDFGenerator.instance = new PDFGenerator();
    }
    return PDFGenerator.instance;
  }

  public async initialize(): Promise<void> {
    if (!this.initialized) {
      await this.fontLoader.loadFonts();
      await this.pdfDocument.initialize();
      this.initialized = true;
    }
  }

  public async generateDocument(
    analysis: AnalysisResult,
    settings: DocumentSettings
  ): Promise<PDFGenerationResult> {
    try {
      await this.initialize();

      const options: PDFGenerationOptions = {
        title: `${analysis.fileName} - COBOLソース解析レポート`,
        author: 'COBOLソース解析システム',
        subject: 'ソース解析結果',
        keywords: ['COBOL', 'ソース解析', 'レポート'],
        language: 'ja-JP',
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        showTableOfContents: settings.showTableOfContents,
        showPageNumbers: settings.pageNumbers,
        showHeaderFooter: settings.headerFooter
      };

      const documentDefinition = await this.documentBuilder.build(analysis, options);
      const success = await this.pdfDocument.generate(documentDefinition);

      return {
        success,
        filePath: `${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`
      };
    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'PDFの生成中にエラーが発生しました'
      };
    }
  }

  public async generateBatchDocuments(
    analyses: AnalysisResult[],
    settings: DocumentSettings
  ): Promise<PDFGenerationResult[]> {
    return Promise.all(
      analyses.map(analysis => this.generateDocument(analysis, settings))
    );
  }
}