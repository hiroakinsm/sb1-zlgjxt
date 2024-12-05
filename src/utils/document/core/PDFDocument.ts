```typescript
import pdfMake from 'pdfmake/build/pdfmake';
import { FontLoader } from '../fonts/FontLoader';
import { TextEncoder } from './TextEncoder';
import type { DocumentDefinition } from '../../../types/analysisTypes';

export class PDFDocument {
  private static instance: PDFDocument;
  private fontLoader: FontLoader;
  private initialized: boolean = false;

  private constructor() {
    this.fontLoader = FontLoader.getInstance();
  }

  public static getInstance(): PDFDocument {
    if (!PDFDocument.instance) {
      PDFDocument.instance = new PDFDocument();
    }
    return PDFDocument.instance;
  }

  public async initialize(): Promise<void> {
    if (!this.initialized) {
      const fonts = await this.fontLoader.loadFonts();
      pdfMake.fonts = fonts;
      this.initialized = true;
    }
  }

  public async generate(docDefinition: DocumentDefinition, fileName: string): Promise<boolean> {
    try {
      // コンテンツのエンコード
      docDefinition.content = TextEncoder.encodeContent(docDefinition.content);

      // PDFの生成
      return new Promise((resolve, reject) => {
        try {
          const pdfDoc = pdfMake.createPdf(docDefinition);
          
          pdfDoc.getBuffer((buffer: ArrayBuffer) => {
            const blob = new Blob([buffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            
            link.href = url;
            link.download = `${fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            resolve(true);
          });
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  }
}
```