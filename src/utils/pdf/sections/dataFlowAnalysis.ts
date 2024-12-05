import type { PDFSection, PDFGenerationContext } from '../types';

export function generateDataFlowAnalysis(context: PDFGenerationContext): PDFSection {
  const { analysis } = context;
  
  return {
    title: '3. データフロー分析',
    content: [
      {
        text: '3. データフロー分析',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        text: '3.1 WORKING-STORAGE SECTION',
        style: 'subsectionHeader',
        margin: [0, 10, 0, 5]
      },
      {
        table: {
          headerRows: 1,
          widths: ['30%', '20%', '50%'],
          body: [
            [
              { text: '項目名', style: 'tableHeader' },
              { text: '型', style: 'tableHeader' },
              { text: '使用状況', style: 'tableHeader' }
            ],
            ...analysis.dataFlow.workingStorage.map(item => [
              item.name,
              item.type,
              item.usage.join(', ')
            ])
          ]
        },
        margin: [0, 5, 0, 15]
      },
      {
        text: '3.2 LINKAGE SECTION',
        style: 'subsectionHeader',
        margin: [0, 10, 0, 5]
      },
      {
        table: {
          headerRows: 1,
          widths: ['30%', '20%', '50%'],
          body: [
            [
              { text: '項目名', style: 'tableHeader' },
              { text: '型', style: 'tableHeader' },
              { text: '方向', style: 'tableHeader' }
            ],
            ...analysis.dataFlow.linkage.map(item => [
              item.name,
              item.type,
              item.direction
            ])
          ]
        },
        margin: [0, 5, 0, 15]
      }
    ]
  };
}