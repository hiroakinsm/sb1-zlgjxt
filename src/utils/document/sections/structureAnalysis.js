export function generateStructureAnalysis(analysis) {
  return {
    title: '構造分析',
    content: [
      {
        text: '構造分析',
        style: 'sectionHeader'
      },
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            ['総行数', analysis.metrics.totalLines.toString()],
            ['実行行数', analysis.metrics.codeLines.toString()],
            ['コメント行数', analysis.metrics.commentLines.toString()],
            ['空行数', analysis.metrics.emptyLines.toString()]
          ]
        },
        margin: [0, 10, 0, 20]
      },
      generateComplexitySection(analysis.complexity)
    ]
  };
}

function generateComplexitySection(complexity) {
  return {
    text: '複雑度分析',
    style: 'subsectionHeader',
    table: {
      widths: ['50%', '50%'],
      body: [
        ['サイクロマティック複雑度', complexity.cyclomaticComplexity.toString()],
        ['ネスト深度', complexity.nestingDepth.toString()],
        ['条件分岐複雑度', complexity.conditionalComplexity.toString()],
        ['データフロー複雑度', complexity.dataFlowComplexity.toString()],
        ['保守性指標', complexity.maintainabilityIndex.toString()]
      ]
    },
    margin: [0, 10, 0, 20]
  };
}