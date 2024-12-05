export function generateDependencyAnalysis(analysis) {
  return {
    title: '依存関係分析',
    content: [
      {
        text: 'ソースコード依存関係',
        style: 'subsectionHeader'
      },
      generateSourceDependenciesTable(analysis.dependencies.sourceDependencies),
      {
        text: 'JCL分析',
        style: 'subsectionHeader'
      },
      generateJclAnalysisTable(analysis.dependencies.jclAnalysis),
      {
        text: '外部インターフェース',
        style: 'subsectionHeader'
      },
      generateExternalInterfacesTable(analysis.dependencies.externalInterfaces)
    ]
  };
}

function generateSourceDependenciesTable(dependencies) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: 'モジュール名', style: 'tableHeader' },
          { text: '種別', style: 'tableHeader' },
          { text: '参照箇所', style: 'tableHeader' }
        ],
        ...dependencies.map(dep => [
          dep.name,
          dep.type,
          dep.references.join(', ')
        ])
      ]
    }
  };
}

function generateJclAnalysisTable(jclAnalysis) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '70%'],
      body: [
        [
          { text: '項目', style: 'tableHeader' },
          { text: '内容', style: 'tableHeader' }
        ],
        ...Object.entries(jclAnalysis).map(([key, value]) => [
          key,
          value.toString()
        ])
      ]
    }
  };
}

function generateExternalInterfacesTable(interfaces) {
  return {
    style: 'table',
    table: {
      headerRows: 1,
      widths: ['30%', '20%', '50%'],
      body: [
        [
          { text: 'インターフェース名', style: 'tableHeader' },
          { text: '種別', style: 'tableHeader' },
          { text: '説明', style: 'tableHeader' }
        ],
        ...interfaces.map(iface => [
          iface.name,
          iface.type,
          iface.description
        ])
      ]
    }
  };
}