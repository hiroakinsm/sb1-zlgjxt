import type { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import type { AnalysisResult, DocumentSettings } from '../../types/analysisTypes';

export interface PDFSection {
  title: string;
  content: any[];
}

export interface PDFStyles {
  [key: string]: {
    fontSize?: number;
    bold?: boolean;
    margin?: number[];
    alignment?: string;
    color?: string;
    lineHeight?: number;
    fillColor?: string;
  };
}

export interface PDFConfig {
  fonts: TFontDictionary;
  defaultStyle: {
    font: string;
    fontSize?: number;
    lineHeight?: number;
  };
  styles: PDFStyles;
  pageSize: string;
  pageMargins: number[];
  header?: (currentPage: number, pageCount: number) => any;
  footer?: (currentPage: number, pageCount: number) => any;
}

export interface PDFGenerationContext {
  analysis: AnalysisResult;
  settings: DocumentSettings;
  config: PDFConfig;
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
}