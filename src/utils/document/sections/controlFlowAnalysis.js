export function generateControlFlowAnalysis(analysis) {
  return {
    title: '制御フロー分析',
    content: [
      {
        text: '問題コード検出',
        style: 'subsectionHeader'
      },
      generateProblemCodeTable(analysis.controlFlow.problemCode),
      {
        text: 'PERFORM文ネスト分析',
        style: 'subsectionHeader'
      },
      generatePerformNestingTable(analysis.controlFlow.performNesting),
      {
        text: '条件分岐複雑度',
        style: 'subsectionHeader'
      },
      generateConditionalComplexityTable(analysis.controlFlow.conditionalComplexity)
    ]
  };
}

function generateProblemCodeTable(problemCode) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['20%', '20%', '60%'],
      body: [
        [
          { text: '場所', style: 'tableHeader' },
          { text: '種類', style: 'tableHeader' },
          { text: '説明', style: 'tableHeader' }
        ],
        ...problemCode.map(problem => [
          problem.location,
          problem.type,
          problem.description
        ])
      ]
    }
  };
}

function generatePerformNestingTable(performNesting) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: '場所', style: 'tableHeader' },
          { text: 'ネスト深度', style: 'tableHeader' },
          { text: '複雑度', style: 'tableHeader' }
        ],
        ...performNesting.map(item => [
          item.location,
          item.depth.toString(),
          item.complexity.toString()
        ])
      ]
    }
  };
}

function generateConditionalComplexityTable(conditionalComplexity) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: '場所', style: 'tableHeader' },
          { text: '複雑度', style: 'tableHeader' },
          { text: '推奨事項', style: 'tableHeader' }
        ],
        ...conditionalComplexity.map(item => [
          item.location,
          item.complexity.toString(),
          item.recommendation
        ])
      ]
    }
  };
}