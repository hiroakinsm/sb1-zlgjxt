export function generateSecurityAnalysis(analysis) {
  return {
    title: 'セキュリティ分析',
    content: [
      {
        text: '脆弱性検出',
        style: 'subsectionHeader'
      },
      generateVulnerabilitiesTable(analysis.security.vulnerabilities),
      {
        text: 'セキュリティスコア',
        style: 'subsectionHeader'
      },
      generateSecurityScoreTable(analysis.security.securityScore),
      {
        text: '推奨対策',
        style: 'subsectionHeader'
      },
      generateRecommendationsTable(analysis.security.recommendedActions)
    ]
  };
}

function generateVulnerabilitiesTable(vulnerabilities) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['20%', '20%', '60%'],
      body: [
        [
          { text: '種類', style: 'tableHeader' },
          { text: '重要度', style: 'tableHeader' },
          { text: '説明', style: 'tableHeader' }
        ],
        ...vulnerabilities.map(vuln => [
          vuln.type,
          vuln.severity,
          vuln.description
        ])
      ]
    }
  };
}

function generateSecurityScoreTable(scores) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['40%', '60%'],
      body: [
        [
          { text: '評価項目', style: 'tableHeader' },
          { text: 'スコア', style: 'tableHeader' }
        ],
        ['SQLインジェクション対策', scores.sqlInjection.toString()],
        ['バッファオーバーフロー対策', scores.bufferOverflow.toString()],
        ['ファイル操作セキュリティ', scores.fileOperation.toString()],
        ['エラー処理', scores.errorHandling.toString()],
        ['入力検証', scores.inputValidation.toString()]
      ]
    }
  };
}

function generateRecommendationsTable(recommendations) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '70%'],
      body: [
        [
          { text: '対象', style: 'tableHeader' },
          { text: '推奨対策', style: 'tableHeader' }
        ],
        ...recommendations.map(rec => [
          rec.target,
          rec.recommendation
        ])
      ]
    }
  };
}