import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { AnalysisResult, DocumentSettings } from '../types/analysisTypes';

// PDFMakeのフォント設定
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  NotoSansJP: {
    normal: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@4.5.12/files/noto-sans-jp-all-400-normal.woff',
    bold: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@4.5.12/files/noto-sans-jp-all-700-normal.woff',
  }
};

export async function generatePDF(analysis: AnalysisResult, settings: DocumentSettings): Promise<void> {
  const docDefinition = {
    defaultStyle: {
      font: 'NotoSansJP'
    },
    content: [
      // タイトルページ
      {
        text: 'COBOLソース解析レポート',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
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
      
      // 目次（設定に応じて）
      settings.showTableOfContents ? {
        toc: {
          title: { text: '目次', style: 'tocTitle' }
        }
      } : null,

      // プログラム基本情報
      {
        text: '1. プログラム基本情報',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        table: {
          widths: ['30%', '70%'],
          body: [
            ['プログラム名', analysis.fileName],
            ['目的', analysis.structure.programInfo.purpose],
            ['作成者', analysis.structure.programInfo.author || ''],
            ['最終更新日', analysis.structure.programInfo.lastModified?.toLocaleDateString('ja-JP') || '']
          ]
        },
        margin: [0, 10, 0, 20]
      },

      // 構造分析
      {
        text: '2. 構造分析',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            ['総行数', analysis.structure.metrics.totalLines.toString()],
            ['実行行数', analysis.structure.metrics.codeLines.toString()],
            ['コメント行数', analysis.structure.metrics.commentLines.toString()],
            ['空行数', analysis.structure.metrics.emptyLines.toString()]
          ]
        },
        margin: [0, 10, 0, 20]
      },

      // データフロー分析、制御フロー分析、品質分析のセクションも同様に追加
      // ...（以下、各セクションの定義）
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 20]
      },
      tocTitle: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20]
      },
      sectionHeader: {
        fontSize: 16,
        bold: true,
        margin: [0, 20, 0, 10]
      }
    },
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40]
  };

  // PDFの生成と保存
  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.download(`${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`);
}