import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface PDFOptions {
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

export interface PDFContent {
  sections: PDFSection[];
  charts?: PDFChart[];
  diagrams?: PDFDiagram[];
}

export interface PDFSection {
  id: string;
  title: string;
  content: any[];
  subsections?: PDFSection[];
}

export interface PDFChart {
  type: 'bar' | 'line' | 'radar' | 'pie' | 'doughnut';
  data: any;
  options?: any;
  width?: number;
  height?: number;
}

export interface PDFDiagram {
  type: string;
  content: string;
  title?: string;
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
  filePath?: string;
}

export interface PDFGenerator {
  initialize(): Promise<void>;
  generateDocument(content: PDFContent, options: PDFOptions): Promise<PDFGenerationResult>;
}