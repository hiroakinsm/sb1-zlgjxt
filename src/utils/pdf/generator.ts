import pdfMake from 'pdfmake/build/pdfmake';
import { pdfConfig } from './config';
import type { AnalysisResult, DocumentSettings } from '../../types/analysisTypes';
import type { PDFGenerationContext } from './types';
import { loadFonts } from './fontLoader';
import {
  generateTitlePage,
  generateProgramInfo,
  generateStructureAnalysis,
  generateDataFlowAnalysis,
  generateControlFlowAnalysis,
  generateQualityAnalysis
} from './sections';

let fontsInitialized = false;

async function initializeFonts() {
  if (!fontsInitialized) {
    const fonts = await loadFonts();
    pdfMake.fonts = fonts;
    fontsInitialized = true;
  }
}

export async function generatePDF(analysis: AnalysisResult, settings: DocumentSettings): Promise<void> {
  try {
    await initializeFonts();

    const context: PDFGenerationContext = {
      analysis,
      settings,
      config: pdfConfig
    };

    const sections = [
      generateTitlePage(context),
      settings.showTableOfContents ? {
        toc: {
          title: { text: '目次', style: 'tocTitle' }
        }
      } : null,
      generateProgramInfo(context),
      generateStructureAnalysis(context),
      generateDataFlowAnalysis(context),
      generateControlFlowAnalysis(context),
      generateQualityAnalysis(context)
    ].filter(Boolean);

    const docDefinition = {
      ...pdfConfig,
      content: sections.map(section => section.content).flat(),
      info: {
        title: `${analysis.fileName} - COBOLソース解析レポート`,
        author: 'COBOLソース解析システム',
        subject: 'ソース解析結果',
        keywords: 'COBOL, ソース解析, レポート'
      }
    };

    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.download(`${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('PDF生成エラー:', error);
    throw error;
  }
}