export const pdfConfig = {
  defaultStyle: {
    font: 'IPAexGothic',
    fontSize: 10,
    lineHeight: 1.5,
    characterSpacing: 0.5,
    encoding: 'Identity-H'
  },
  styles: {
    header: {
      fontSize: 24,
      bold: true,
      margin: [0, 0, 0, 20],
      font: 'IPAexGothic',
      characterSpacing: 1,
      encoding: 'Identity-H'
    },
    tocHeader: {
      fontSize: 20,
      bold: true,
      margin: [0, 0, 0, 20],
      font: 'IPAexGothic',
      characterSpacing: 1,
      encoding: 'Identity-H'
    },
    sectionHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 20, 0, 10],
      font: 'IPAexGothic',
      characterSpacing: 0.8,
      encoding: 'Identity-H'
    },
    subsectionHeader: {
      fontSize: 14,
      bold: true,
      margin: [0, 15, 0, 8],
      font: 'IPAexGothic',
      characterSpacing: 0.8,
      encoding: 'Identity-H'
    },
    tableHeader: {
      fontSize: 12,
      bold: true,
      fillColor: '#f3f4f6',
      font: 'IPAexGothic',
      characterSpacing: 0.5,
      encoding: 'Identity-H'
    },
    table: {
      margin: [0, 10, 0, 20],
      font: 'IPAexGothic',
      characterSpacing: 0.5,
      encoding: 'Identity-H'
    }
  },
  title: 'COBOLソース解析レポート',
  metadata: {
    author: 'COBOLソース解析システム',
    subject: 'ソース解析結果',
    keywords: 'COBOL, ソース解析, レポート',
    language: 'ja-JP',
    creator: 'COBOLソース解析システム'
  },
  pageSize: 'A4',
  pageMargins: [40, 60, 40, 60],
  compress: true,
  fonts: {
    IPAexGothic: {
      normal: 'ipaexg.ttf',
      bold: 'ipaexg.ttf',
      encoding: 'Identity-H'
    }
  }
};