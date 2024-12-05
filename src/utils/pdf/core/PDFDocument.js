import pdfMake from 'pdfmake/build/pdfmake';
import { loadFonts } from '../fonts/fontLoader';
import { pdfConfig } from '../config/documentConfig';
import { generateContent } from '../sections';
import { encode } from 'encoding-japanese';

export class PDFDocument {
  static instance = null;
  static fontsLoaded = false;

  static async getInstance() {
    if (!PDFDocument.instance) {
      PDFDocument.instance = new PDFDocument();
      await PDFDocument.instance.initialize();
    }
    return PDFDocument.instance;
  }

  async initialize() {
    if (!PDFDocument.fontsLoaded) {
      const fonts = await loadFonts();
      pdfMake.fonts = fonts;
      PDFDocument.fontsLoaded = true;
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
    
    // すべてのテキストコンテンツをUTF-8に変換
    const processContent = (items) => {
      return items.map(item => {
        if (typeof item === 'string') {
          return encode(item, 'UTF8');
        } else if (typeof item === 'object') {
          if (item.text) {
            item.text = encode(item.text, 'UTF8');
          }
          if (item.content) {
            item.content = processContent(item.content);
          }
          if (item.table && item.table.body) {
            item.table.body = item.table.body.map(row =>
              row.map(cell => {
                if (typeof cell === 'string') {
                  return encode(cell, 'UTF8');
                } else if (cell.text) {
                  cell.text = encode(cell.text, 'UTF8');
                }
                return cell;
              })
            );
          }
        }
        return item;
      });
    };

    const processedContent = processContent(content);
    
    return {
      ...pdfConfig,
      content: processedContent,
      info: {
        ...pdfConfig.metadata,
        title: encode(`${analysis.fileName} - ${pdfConfig.title}`, 'UTF8'),
        creationDate: new Date(),
        dataSet: analysis.fileName,
        author: encode(pdfConfig.metadata.author, 'UTF8')
      },
      header: this.createHeader(settings),
      footer: this.createFooter(settings),
      pageOrientation: 'portrait',
      pageSize: 'A4',
      compress: true,
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: true,
        documentAssembly: false
      },
      userPassword: null,
      ownerPassword: null,
      version: '1.7',
      pdfA: true
    };
  }

  createHeader(settings) {
    return settings.headerFooter ? (currentPage, pageCount) => ({
      text: encode(pdfConfig.title, 'UTF8'),
      alignment: 'center',
      margin: [40, 20],
      fontSize: 10,
      font: 'IPAexGothic',
      characterSpacing: 0.5,
      encoding: 'Identity-H'
    }) : null;
  }

  createFooter(settings) {
    return settings.pageNumbers ? (currentPage, pageCount) => ({
      text: encode(`${currentPage} / ${pageCount}`, 'UTF8'),
      alignment: 'center',
      margin: [0, 20],
      font: 'IPAexGothic',
      characterSpacing: 0.5,
      encoding: 'Identity-H'
    }) : null;
  }

  createAndDownloadPDF(docDefinition, analysis) {
    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        
        pdfDoc.getBuffer((buffer) => {
          const blob = new Blob([buffer], { 
            type: 'application/pdf'
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          
          const fileName = `${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`;
          link.href = url;
          link.download = fileName;
          link.dataset.source = analysis.fileName;
          
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