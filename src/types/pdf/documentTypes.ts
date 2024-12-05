import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export interface PDFDocumentOptions {
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

export interface PDFDocumentDefinition extends TDocumentDefinitions {
  info: {
    title: string;
    author: string;
    subject: string;
    keywords: string[];
    creationDate: Date;
  };
  pageSize: string;
  pageMargins: [number, number, number, number];
  header?: (currentPage: number, pageCount: number) => any;
  footer?: (currentPage: number, pageCount: number) => any;
}

export interface PDFSection {
  id: string;
  title: string;
  content: any[];
  subsections?: PDFSection[];
}

export interface PDFTable {
  headers: string[];
  rows: any[][];
  widths?: string[] | number[];
  headerStyle?: any;
  rowStyle?: any;
}

export interface PDFChart {
  type: 'bar' | 'line' | 'radar' | 'pie' | 'doughnut';
  data: any;
  options?: any;
  width?: number;
  height?: number;
}