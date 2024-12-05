import * as charts from '../components/charts'
import { singleAnalysisMenuSections, summaryAnalysisMenuSections } from './menuConfig'

// チャートの種類ごとのマッピング
const chartTypes = {
  single: {
    structure: {
      program: [
        { component: charts.ProgramStructureChart, title: 'プログラム構造分析' },
        { component: charts.ProgramHierarchyChart, title: 'プログラム階層' },
        { component: charts.DivisionRatioChart, title: 'DIVISION構成比' }
      ],
      codeflow: [
        { component: charts.ControlFlowChart, title: '制御フロー分析' },
        { component: charts.DataFlowChart, title: 'データフロー分析' },
        { component: charts.DataFlowAnalysisChart, title: 'データフロー詳細分析' }
      ],
      quality: [
        { component: charts.QualityMetricsChart, title: '品質メトリクス' },
        { component: charts.ComplexityChart, title: '複雑度分析' },
        { component: charts.CodingStandardsChart, title: 'コーディング規約準拠性' }
      ]
    },
    dependencies: {
      system: [
        { component: charts.SystemIntegrationChart, title: 'システム間連携分析' },
        { component: charts.DatabaseAccessChart, title: 'データベースアクセス分析' },
        { component: charts.JclAnalysisChart, title: 'JCL分析' }
      ],
      dataflow: [
        { component: charts.DataFlowVisualizationChart, title: 'データフロー可視化' },
        { component: charts.DataDependencyMatrixChart, title: 'データ依存関係マトリクス' },
        { component: charts.DataItemDictionaryChart, title: 'データ項目辞書' }
      ]
    },
    diagnostics: {
      modernization: [
        { component: charts.ModernizationChart, title: 'モダン化適性評価' },
        { component: charts.RiskAnalysisChart, title: 'リスク分析' },
        { component: charts.MigrationPriorityChart, title: '移行優先度評価' }
      ],
      special: [
        { component: charts.VendorDialectChart, title: 'メーカー方言分析' },
        { component: charts.CharacterCodeChart, title: '文字コード分析' },
        { component: charts.FormOutputChart, title: 'フォーム出力分析' }
      ]
    }
  },
  summary: {
    structure: {
      overview: [
        { component: charts.OverallStructureChart, title: '全体構造分析' },
        { component: charts.ProgramHierarchyChart, title: 'プログラム階層構造' },
        { component: charts.CodeMetricsChart, title: 'コードメトリクス' }
      ]
    },
    dependencies: {
      system: [
        { component: charts.SystemDependencyChart, title: 'システム間連携の総合分析' },
        { component: charts.DataFlowChart, title: 'データフローの総合分析' },
        { component: charts.InterfaceAnalysisChart, title: 'インターフェース分析' }
      ]
    },
    diagnostics: {
      evaluation: [
        { component: charts.DiagnosticsEvaluationChart, title: '診断分析の総合評価' },
        { component: charts.ModernizationChart, title: 'モダン化適性の総合評価' },
        { component: charts.SpecialAnalysisChart, title: '特異点分析' }
      ]
    }
  }
}

// メニュー構造の取得
export const getMenuStructure = (mode) => {
  return mode === 'single' ? singleAnalysisMenuSections : summaryAnalysisMenuSections
}

// チャートの取得
export const getChartsForSection = (sectionId, itemId, subsectionId, mode = 'single') => {
  const modeCharts = chartTypes[mode]
  if (!modeCharts) return []

  const sectionCharts = modeCharts[sectionId]
  if (!sectionCharts) return []

  if (subsectionId) {
    return sectionCharts[itemId]?.[subsectionId] || []
  }

  return sectionCharts[itemId] || []
}

// チャートのデフォルト設定の取得
export const getChartDefaults = (chartType) => {
  return {
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 11
            }
          }
        }
      }
    }
  }
}

// メニューアイテムの検索
export const findMenuItem = (sections, sectionId, itemId, subsectionId) => {
  const section = sections.find(s => s.id === sectionId)
  if (!section) return null

  const item = section.items.find(i => i.id === itemId)
  if (!item) return null

  if (!subsectionId) return item

  const subsection = item.subsections?.find(s => s.id === subsectionId)
  return subsection || null
}