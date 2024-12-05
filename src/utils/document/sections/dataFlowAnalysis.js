export function generateDataFlowAnalysis(analysis) {
  return {
    title: 'データフロー分析',
    content: [
      {
        text: 'WORKING-STORAGE SECTION',
        style: 'subsectionHeader'
      },
      generateWorkingStorageTable(analysis.dataFlow.workingStorage),
      {
        text: 'LINKAGE SECTION',
        style: 'subsectionHeader'
      },
      generateLinkageTable(analysis.dataFlow.linkage),
      {
        text: 'データ操作分析',
        style: 'subsectionHeader'
      },
      generateDataOperationsTable(analysis.dataFlow.operations)
    ]
  };
}

function generateWorkingStorageTable(workingStorage) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: '項目名', style: 'tableHeader' },
          { text: '型', style: 'tableHeader' },
          { text: '使用状況', style: 'tableHeader' }
        ],
        ...workingStorage.map(item => [
          item.name,
          item.type,
          item.usage.join(', ')
        ])
      ]
    }
  };
}

function generateLinkageTable(linkage) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: '項目名', style: 'tableHeader' },
          { text: '型', style: 'tableHeader' },
          { text: '方向', style: 'tableHeader' }
        ],
        ...linkage.map(item => [
          item.name,
          item.type,
          item.direction
        ])
      ]
    }
  };
}

function generateDataOperationsTable(operations) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '70%'],
      body: [
        [
          { text: '操作種別', style: 'tableHeader' },
          { text: '件数', style: 'tableHeader' }
        ],
        ...Object.entries(operations).map(([type, data]) => [
          type,
          data.count.toString()
        ])
      ]
    }
  };
}