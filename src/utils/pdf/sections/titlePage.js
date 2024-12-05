export function generateTitlePage(analysis) {
  return [
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
  ];
}