import type { PDFSection, PDFGenerationContext } from '../types';

export function generateStructureAnalysis(context: PDFGenerationContext): PDFSection {
  return {
    title: '2. 構造分析',
    content: [
      {
        text: '2. 構造分析',
        style: 'sectionHeader',
        pageBreak: 'before'
      },
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            ['総行数', context.analysis.structure.metrics.totalLines.toString()],
            ['実行行数', context.analysis.structure.metrics.codeLines.toString()],
            ['コメント行数', context.analysis.structure.metrics.commentLines.toString()],
            ['空行数', context.analysis.structure.metrics.emptyLines.toString()]
          ]
        },
        margin: [0, 10, 0, 20]
      }
    ]
  };
}