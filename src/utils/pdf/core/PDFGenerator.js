import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { loadFont } from '../fonts/fontLoader';
import { encode } from 'encoding-japanese';

export class PDFGenerator {
  constructor() {
    this.doc = null;
    this.fontLoaded = false;
  }

  async initialize() {
    this.doc = new jsPDF();
    if (!this.fontLoaded) {
      await this.loadFont();
    }
  }

  async loadFont() {
    try {
      await loadFont(this.doc);
      this.fontLoaded = true;
    } catch (error) {
      console.error('Font loading error:', error);
      throw new Error('フォントの読み込みに失敗しました');
    }
  }

  setFont() {
    this.doc.setFont('IPAexGothic');
  }

  addText(text, x, y, options = {}) {
    const encodedText = encode(text, 'UNICODE');
    this.doc.text(encodedText, x, y, options);
  }

  addPage() {
    this.doc.addPage();
  }

  addTable(tableData, options = {}) {
    const defaultOptions = {
      styles: {
        font: 'IPAexGothic',
        fontSize: 10
      },
      headStyles: {
        fillColor: [243, 244, 246],
        textColor: [0, 0, 0],
        fontStyle: 'bold'
      }
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    // テーブルデータのエンコード
    const encodedData = {
      head: tableData.head?.map(row => 
        row.map(cell => encode(cell, 'UNICODE'))
      ) || [],
      body: tableData.body?.map(row =>
        row.map(cell => encode(cell, 'UNICODE'))
      ) || []
    };

    this.doc.autoTable({
      ...mergedOptions,
      ...encodedData
    });
  }

  addPageNumbers() {
    const pageCount = this.doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.doc.setFontSize(10);
      const pageText = encode(`${i} / ${pageCount}`, 'UNICODE');
      this.doc.text(pageText, 105, this.doc.internal.pageSize.height - 10, { 
        align: 'center' 
      });
    }
  }

  save(fileName) {
    const safeName = encode(fileName, 'UNICODE');
    this.doc.save(safeName);
  }

  async generatePDF(analysis, settings) {
    try {
      await this.initialize();
      this.setFont();

      // タイトルページ
      this.doc.setFontSize(24);
      this.addText('COBOLソース解析レポート', 105, 40, { align: 'center' });
      
      this.doc.setFontSize(14);
      this.addText(`ファイル名: ${analysis.fileName}`, 105, 60, { align: 'center' });
      this.addText(`作成日: ${new Date().toLocaleDateString('ja-JP')}`, 105, 70, { align: 'center' });

      // 目次
      if (settings.showTableOfContents) {
        this.addPage();
        this.doc.setFontSize(16);
        this.addText('目次', 20, 30);
        
        const sections = [
          'プログラム基本情報',
          '構造分析',
          'データフロー分析',
          '制御フロー分析',
          '品質分析'
        ];
        
        sections.forEach((section, index) => {
          this.doc.setFontSize(12);
          this.addText(section, 25, 50 + (index * 10));
        });
      }

      // プログラム基本情報
      this.addPage();
      this.doc.setFontSize(16);
      this.addText('プログラム基本情報', 20, 30);
      
      this.addTable({
        head: [['項目', '内容']],
        body: [
          ['プログラム名', analysis.programInfo.name],
          ['目的', analysis.programInfo.purpose || ''],
          ['作成者', analysis.programInfo.author || ''],
          ['最終更新日', analysis.programInfo.lastModified ? 
            new Date(analysis.programInfo.lastModified).toLocaleDateString('ja-JP') : '']
        ]
      }, { startY: 40 });

      // 構造分析
      this.addPage();
      this.doc.setFontSize(16);
      this.addText('構造分析', 20, 30);
      
      this.addTable({
        head: [['メトリクス', '値']],
        body: [
          ['総行数', analysis.metrics.totalLines.toString()],
          ['実行行数', analysis.metrics.codeLines.toString()],
          ['コメント行数', analysis.metrics.commentLines.toString()],
          ['空行数', analysis.metrics.emptyLines.toString()]
        ]
      }, { startY: 40 });

      // ページ番号
      if (settings.pageNumbers) {
        this.addPageNumbers();
      }

      // PDFの保存
      const fileName = `${analysis.fileName}_analysis_${new Date().toISOString().split('T')[0]}.pdf`;
      this.save(fileName);

      return true;
    } catch (error) {
      console.error('PDF生成エラー:', error);
      throw error;
    }
  }
}