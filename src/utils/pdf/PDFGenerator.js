import pdfMake from 'pdfmake/build/pdfmake';
import { loadFonts } from './fonts';
import { pdfConfig } from './config';
import { generateContent } from './sections';
import { encode } from 'encoding-japanese';

export class PDFGenerator {
  static instance = null;
  static fontsLoaded = false;

  static async getInstance() {
    if (!PDFGenerator.instance) {
      PDFGenerator.instance = new PDFGenerator();
      await PDFGenerator.instance.initialize();
    }
    return PDFGenerator.instance;
  }

  async initialize() {
    if (!PDFGenerator.fontsLoaded) {
      const fonts = await loadFonts();
      pdfMake.fonts = fonts;
      PDFGenerator.fontsLoaded = true;
    }
  }

  async generate(analysis, settings) {
    try {
      const docDefinition = await this.createDocumentDefinition(analysis, settings);
      return await this.createAndDownloadPDF(docDefinition, analysis);
    } catch (error) {
      console.error('PDF生成エラー:', error);
      throw error;
    }
  }

  async createDocumentDefinition(analysis, settings) {
    const content = await generateContent(analysis, settings);
    
    return {
      ...pdfConfig,
      content,
      info: {
        title: `${analysis.fileName} - ${pdfConfig.title}`,
        author: pdfConfig.author,
        subject: pdfConfig.subject,
        keywords: pdfConfig.keywords,
        creator: pdfConfig.creator,
        producer: pdfConfig.producer,
        creationDate: new Date()
      },
      header: settings.headerFooter ? this.createHeader : null,
      footer: settings.pageNumbers ? this.createFooter : null
    };
  }

  createHeader(currentPage, pageCount) {
    return {
      text: pdfConfig.title,
      alignment: 'center',
      margin: [40, 20],
      fontSize: 10,
      font: 'IPAexGothic'
    };
  }

  createFooter(currentPage, pageCount) {
    return {
      text: `${currentPage} / ${pageCount}`,
      alignment: 'center',
      margin: [0, 20],
      font: 'IPAexGothic'
    };
  }

  async createAndDownloadPDF(docDefinition, analysis) {
    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        
        pdfDoc.getBuffer((buffer) => {
          const blob = new Blob([buffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          
          link.href = url;
          link.download = `${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`;
          
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
  }
}