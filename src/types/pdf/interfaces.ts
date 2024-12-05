import type { AnalysisResult, DocumentSettings } from '../analysisTypes';

export interface PDFGenerationOptions {
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  language: string;
  pageSize: string;
  pageMargins: [number, number, number, number];
  showTableOfContents: boolean;
  showPageNumbers: boolean;
  showHeaderFooter: boolean;
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
  filePath?: string;
}

export interface PDFGenerator {
  initialize(): Promise<void>;
  generateDocument(analysis: AnalysisResult, settings: DocumentSettings): Promise<PDFGenerationResult>;
  generateBatchDocuments(analyses: AnalysisResult[], settings: DocumentSettings): Promise<PDFGenerationResult[]>;
}

export interface PDFSection {
  id: string;
  title: string;
  content: any[];
  subsections?: PDFSection[];
}

export interface PDFTableDefinition {
  headers: string[];
  rows: any[][];
  widths?: string[] | number[];
  headerStyle?: any;
  rowStyle?: any;
}

export interface PDFChartDefinition {
  type: 'bar' | 'line' | 'radar' | 'pie' | 'doughnut';
  data: any;
  options?: any;
}