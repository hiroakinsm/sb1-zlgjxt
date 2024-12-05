export const pdfConfig = {
  defaultStyle: {
    font: 'IPAexGothic',
    fontSize: 10,
    lineHeight: 1.5,
    characterSpacing: 0.5
  },
  styles: {
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 0, 0, 20]
    },
    sectionHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 20, 0, 10]
    },
    subsectionHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 15, 0, 8]
    },
    tableHeader: {
      fontSize: 12,
      bold: true,
      fillColor: '#f3f4f6'
    },
    table: {
      margin: [0, 10, 0, 20]
    }
  },
  metadata: {
    title: 'COBOLソース解析レポート',
    author: 'COBOLソース解析システム',
    subject: 'ソース解析結果',
    keywords: 'COBOL, ソース解析, レポート',
    creator: 'COBOLソース解析システム',
    producer: 'COBOLソース解析システム'
  },
  pageSize: 'A4',
  pageMargins: [40, 60, 40, 60]
};