import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { loadIPAexFont } from './fonts';

let fontLoaded = false;

export async function generatePDF(analysis, settings) {
  try {
    const doc = new jsPDF();
    
    if (!fontLoaded) {
      await loadIPAexFont(doc);
      fontLoaded = true;
    }

    // タイトルページ
    doc.setFont('IPAex');
    doc.setFontSize(24);
    doc.text('COBOLソース解析レポート', 105, 40, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`ファイル名: ${analysis.fileName}`, 105, 60, { align: 'center' });
    doc.text(`作成日: ${new Date().toLocaleDateString('ja-JP')}`, 105, 70, { align: 'center' });

    // 目次
    if (settings.showTableOfContents) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text('目次', 20, 30);
      
      const sections = [
        'プログラム基本情報',
        '構造分析',
        'データフロー分析',
        '制御フロー分析',
        '品質分析'
      ];
      
      sections.forEach((section, index) => {
        doc.setFontSize(12);
        doc.text(section, 25, 50 + (index * 10));
      });
    }

    // プログラム基本情報
    doc.addPage();
    doc.setFontSize(16);
    doc.text('プログラム基本情報', 20, 30);
    
    doc.autoTable({
      startY: 40,
      head: [['項目', '内容']],
      body: [
        ['プログラム名', analysis.programInfo.name],
        ['目的', analysis.programInfo.purpose || ''],
        ['作成者', analysis.programInfo.author || ''],
        ['最終更新日', analysis.programInfo.lastModified ? 
          new Date(analysis.programInfo.lastModified).toLocaleDateString('ja-JP') : '']
      ],
      styles: {
        font: 'IPAex',
        fontSize: 10
      },
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      }
    });

    // 構造分析
    doc.addPage();
    doc.setFontSize(16);
    doc.text('構造分析', 20, 30);
    
    doc.autoTable({
      startY: 40,
      head: [['メトリクス', '値']],
      body: [
        ['総行数', analysis.metrics.totalLines.toString()],
        ['実行行数', analysis.metrics.codeLines.toString()],
        ['コメント行数', analysis.metrics.commentLines.toString()],
        ['空行数', analysis.metrics.emptyLines.toString()]
      ],
      styles: {
        font: 'IPAex',
        fontSize: 10
      },
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      }
    });

    // ページ番号
    if (settings.pageNumbers) {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`${i} / ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
    }

    // PDFの保存
    doc.save(`${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`);
    return true;

  } catch (error) {
    console.error('PDF生成エラー:', error);
    throw error;
  }
}