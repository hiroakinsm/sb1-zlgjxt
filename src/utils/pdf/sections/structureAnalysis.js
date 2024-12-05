export function generateStructureAnalysis(analysis) {
  return [
    {
      text: '構造分析',
      style: 'sectionHeader',
      tocItem: true
    },
    generateMetricsTable(analysis.metrics),
    {
      text: '複雑度分析',
      style: 'subsectionHeader'
    },
    generateComplexityTable(analysis.complexity)
  ];
}

function generateMetricsTable(metrics) {
  return {
    style: 'table',
    table: {
      widths: ['50%', '50%'],
      body: [
        ['総行数', metrics.totalLines.toString()],
        ['実行行数', metrics.codeLines.toString()],
        ['コメント行数', metrics.commentLines.toString()],
        ['空行数', metrics.emptyLines.toString()]
      ]
    }
  };
}

function generateComplexityTable(complexity) {
  return {
    style: 'table',
    table: {
      widths: ['50%', '50%'],
      body: [
        ['サイクロマティック複雑度', complexity.cyclomaticComplexity.toString()],
        ['ネスト深度', complexity.nestingDepth.toString()],
        ['条件分岐複雑度', complexity.conditionalComplexity.toString()],
        ['データフロー複雑度', complexity.dataFlowComplexity.toString()],
        ['保守性指標', complexity.maintainabilityIndex.toString()]
      ]
    }
  };
}