export function generateProgramInfo(analysis) {
  return {
    title: 'プログラム基本情報',
    content: [
      {
        style: 'table',
        table: {
          headerRows: 1,
          widths: ['30%', '70%'],
          body: [
            [
              { text: '項目', style: 'tableHeader' },
              { text: '内容', style: 'tableHeader' }
            ],
            ['プログラム名', analysis.programInfo.name],
            ['目的', analysis.programInfo.purpose],
            ['作成者', analysis.programInfo.author || ''],
            ['最終更新日', formatDate(analysis.programInfo.lastModified)]
          ]
        }
      }
    ]
  };
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('ja-JP');
}