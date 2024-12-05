export function generateQualityAnalysis(analysis) {
  return {
    title: '品質分析',
    content: [
      {
        text: 'コーディング規約準拠性',
        style: 'subsectionHeader'
      },
      generateCodingStandardsTable(analysis.quality.codingStandards),
      {
        text: '保守性評価',
        style: 'subsectionHeader'
      },
      generateMaintainabilityTable(analysis.quality.maintainability)
    ]
  };
}

function generateCodingStandardsTable(standards) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['20%', '20%', '60%'],
      body: [
        [
          { text: 'ルール', style: 'tableHeader' },
          { text: '重要度', style: 'tableHeader' },
          { text: '説明', style: 'tableHeader' }
        ],
        ...standards.violations.map(violation => [
          violation.rule,
          violation.severity,
          violation.description
        ])
      ]
    }
  };
}

function generateMaintainabilityTable(maintainability) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: '評価項目', style: 'tableHeader' },
          { text: 'スコア', style: 'tableHeader' },
          { text: '評価', style: 'tableHeader' }
        ],
        ...maintainability.map(metric => [
          metric.name,
          metric.score.toString(),
          metric.evaluation
        ])
      ]
    }
  };
}