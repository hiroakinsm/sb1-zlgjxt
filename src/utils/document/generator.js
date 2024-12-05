import pdfMake from 'pdfmake/build/pdfmake';
import { loadFonts } from './fonts';
import { documentStyles } from './styles';
import {
  generateProgramInfo,
  generateStructureAnalysis,
  generateDataFlowAnalysis,
  generateControlFlowAnalysis,
  generateQualityAnalysis,
  generateSecurityAnalysis,
  generateDependencyAnalysis
} from './sections';

let fontsLoaded = false;

export async function generateDocument(analysis, settings) {
  try {
    if (!fontsLoaded) {
      const fonts = await loadFonts();
      pdfMake.fonts = fonts;
      fontsLoaded = true;
    }

    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      defaultStyle: {
        font: 'NotoSansJP',
        fontSize: 10,
        lineHeight: 1.2
      },
      styles: documentStyles,
      info: {
        title: `${analysis.fileName} - COBOLソース解析レポート`,
        author: 'COBOLソース解析システム',
        subject: 'ソース解析結果',
        keywords: 'COBOL, ソース解析, レポート'
      },
      header: settings.headerFooter ? (currentPage, pageCount) => ({
        text: 'COBOLソース解析レポート',
        alignment: 'center',
        margin: [40, 20],
        fontSize: 10,
        font: 'NotoSansJP'
      }) : null,
      footer: settings.pageNumbers ? (currentPage, pageCount) => ({
        text: `${currentPage} / ${pageCount}`,
        alignment: 'center',
        margin: [0, 20],
        font: 'NotoSansJP'
      }) : null,
      content: []
    };

    // タイトルページ
    docDefinition.content.push(
      {
        text: 'COBOLソース解析レポート',
        style: 'header',
        alignment: 'center',
        margin: [0, 100, 0, 20]
      },
      {
        text: `ファイル名: ${analysis.fileName}`,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },
      {
        text: `作成日: ${new Date().toLocaleDateString('ja-JP')}`,
        alignment: 'center',
        margin: [0, 0, 0, 40]
      },
      { pageBreak: 'after' }
    );

    // 目次
    if (settings.showTableOfContents) {
      docDefinition.content.push(
        {
          text: '目次',
          style: 'tocHeader',
          margin: [0, 0, 0, 20]
        },
        {
          toc: {
            title: { text: '', style: 'tocTitle' }
          }
        },
        { pageBreak: 'after' }
      );
    }

    // 各セクションの生成と追加
    const sections = [
      generateProgramInfo(analysis),
      generateStructureAnalysis(analysis),
      generateDataFlowAnalysis(analysis),
      generateControlFlowAnalysis(analysis),
      generateQualityAnalysis(analysis),
      generateSecurityAnalysis(analysis),
      generateDependencyAnalysis(analysis)
    ];

    sections.forEach((section, index) => {
      if (index > 0) {
        docDefinition.content.push({ pageBreak: 'before' });
      }
      docDefinition.content.push(
        {
          text: section.title,
          style: 'sectionHeader',
          tocItem: true
        },
        ...section.content
      );
    });

    return new Promise((resolve, reject) => {
      try {
        const pdfDoc = pdfMake.createPdf(docDefinition);
        pdfDoc.download(`${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error('PDF生成エラー:', error);
    throw error;
  }
}