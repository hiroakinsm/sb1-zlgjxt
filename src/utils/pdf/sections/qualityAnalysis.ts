import type { PDFSection, PDFGenerationContext } from '../types';

export function generateQualityAnalysis(context: PDFGenerationContext): PDFSection {
  const { analysis } = context;
  
  return {
    title: '5. 品質分析',
    content: [
      {
        text: '5. 品質分析',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        text: '5.1 コーディング規約準拠性',
        style: 'subsectionHeader',
        margin: [0, 10, 0, 5]
      },
      {
        table: {
          headerRows: 1,
          widths: ['20%', '20%', '60%'],
          body: [
            [
              { text: 'ルール', style: 'tableHeader' },
              { text: '重要度', style: 'tableHeader' },
              { text: '説明', style: 'tableHeader' }
            ],
            ...analysis.quality.codingStandards.violations.map(violation => [
              violation.rule,
              violation.severity,
              violation.description
            ])
          ]
        },
        margin: [0, 5, 0, 15]
      }
    ]
  };
}