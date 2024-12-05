```typescript
import { PDFDocument } from './PDFDocument';
import { FontLoader } from '../fonts/FontLoader';
import { DocumentBuilder } from './DocumentBuilder';
import type { AnalysisResult, DocumentSettings } from '../../../types/analysisTypes';

export class DocumentGenerator {
  private static instance: DocumentGenerator;
  private pdfDocument: PDFDocument;
  private fontLoader: FontLoader;
  private documentBuilder: DocumentBuilder;

  private constructor() {
    this.pdfDocument = new PDFDocument();
    this.fontLoader = new FontLoader();
    this.documentBuilder = new DocumentBuilder();
  }

  public static getInstance(): DocumentGenerator {
    if (!DocumentGenerator.instance) {
      DocumentGenerator.instance = new DocumentGenerator();
    }
    return DocumentGenerator.instance;
  }

  public async initialize(): Promise<void> {
    await this.fontLoader.loadFonts();
    await this.pdfDocument.initialize();
  }

  public async generateDocument(analysis: AnalysisResult, settings: DocumentSettings): Promise<boolean> {
    try {
      await this.initialize();
      
      const documentDefinition = await this.documentBuilder.build(analysis, settings);
      return await this.pdfDocument.generate(documentDefinition, analysis.fileName);
    } catch (error) {
      console.error('Document generation error:', error);
      throw error;
    }
  }
}
```