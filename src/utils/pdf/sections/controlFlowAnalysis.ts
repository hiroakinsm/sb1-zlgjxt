import type { PDFSection, PDFGenerationContext } from '../types';

export function generateControlFlowAnalysis(context: PDFGenerationContext): PDFSection {
  const { analysis } = context;
  
  return {
    title: '4. 制御フロー分析',
    content: [
      {
        text: '4. 制御フロー分析',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        text: '4.1 問題コード検出',
        style: 'subsectionHeader',
        margin: [0, 10, 0, 5]
      },
      {
        table: {
          headerRows: 1,
          widths: ['20%', '20%', '60%'],
          body: [
            [
              { text: '場所', style: 'tableHeader' },
              { text: '種類', style: 'tableHeader' },
              { text: '説明', style: 'tableHeader' }
            ],
            ...analysis.controlFlow.problemCode.map(problem => [
              problem.location,
              problem.type,
              problem.description
            ])
          ]
        },
        margin: [0, 5, 0, 15]
      }
    ]
  };
}