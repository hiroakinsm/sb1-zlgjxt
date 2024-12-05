// メニュー構造の定義
export const singleAnalysisMenuSections = [
  {
    id: 'source_code',
    name: 'ソースコード分析',
    items: [
      {
        id: 'structure',
        name: 'ソースコード構造',
        subsections: [
          { id: 'basic_info', name: 'プログラム名・目的' },
          { id: 'program_structure', name: 'プログラム基本構造' },
          { id: 'update_history', name: '更新履歴' },
          { id: 'line_stats', name: '行数統計' },
          { id: 'division_ratio', name: 'DIVISION毎の構成比' }
        ]
      },
      {
        id: 'code_review',
        name: 'コードレビュー',
        subsections: [
          { id: 'standards', name: 'コーディング規約準拠性' },
          { id: 'problems', name: '問題箇所のハイライト' },
          { id: 'refactoring', name: 'リファクタリング推奨箇所' }
        ]
      },
      {
        id: 'dependencies',
        name: 'ソースコード依存関係',
        subsections: [
          { id: 'references', name: '参照/非参照関係性' },
          { id: 'copy', name: 'COPY文の使用状況' },
          { id: 'external', name: '外部プログラム連携' },
          { id: 'common', name: '共通モジュール使用状況' }
        ]
      }
    ]
  },
  {
    id: 'code_quality',
    name: 'コード品質分析',
    items: [
      {
        id: 'standards',
        name: 'コーディング規約準拠性',
        subsections: [
          { id: 'naming', name: '命名規則' },
          { id: 'formatting', name: 'インデント・整形' },
          { id: 'comments', name: 'コメント記述' }
        ]
      },
      {
        id: 'problems',
        name: '問題コード検出',
        subsections: [
          { id: 'dead_code', name: 'デッドコード' },
          { id: 'unused', name: '未使用要素' },
          { id: 'duplicate', name: '重複コード' }
        ]
      },
      {
        id: 'refactoring',
        name: 'リファクタリング提案',
        subsections: [
          { id: 'modules', name: 'モジュール分割推奨' },
          { id: 'optimization', name: 'ロジック最適化' }
        ]
      }
    ]
  },
  {
    id: 'metrics',
    name: 'コードメトリクス分析',
    items: [
      {
        id: 'size',
        name: '規模メトリクス',
        subsections: [
          { id: 'loc', name: '総行数（LOC）' },
          { id: 'code_lines', name: '実行行数' },
          { id: 'comment_lines', name: 'コメント行数' }
        ]
      },
      {
        id: 'complexity',
        name: '複雑度メトリクス',
        subsections: [
          { id: 'cyclomatic', name: 'サイクロマティック複雑度' },
          { id: 'control_flow', name: '制御フロー複雑度' },
          { id: 'maintainability', name: '保守性指標' }
        ]
      },
      {
        id: 'quality',
        name: '品質メトリクス',
        subsections: [
          { id: 'coverage', name: 'コードカバレッジ' },
          { id: 'duplication', name: '重複コード率' },
          { id: 'change_frequency', name: '変更頻度' }
        ]
      }
    ]
  }
]

export const summaryAnalysisMenuSections = [
  {
    id: 'overall_structure',
    name: '全体構造分析',
    items: [
      {
        id: 'program_hierarchy',
        name: 'プログラム階層構造の総合分析',
        subsections: [
          { id: 'basic_info', name: 'プログラム基本情報のサマリ' },
          { id: 'dependency', name: 'ソースコード依存関係の総合分析' }
        ]
      },
      {
        id: 'code_flow',
        name: 'コードフローの総合分析',
        subsections: [
          { id: 'control_flow', name: '制御フローの総合分析' },
          { id: 'data_flow', name: 'データフローの総合分析' }
        ]
      }
    ]
  },
  {
    id: 'system_dependencies',
    name: '依存関係の総合分析',
    items: [
      {
        id: 'system_integration',
        name: 'システム間連携の総合分析',
        subsections: [
          { id: 'source', name: 'ソースコード依存関係の統合' },
          { id: 'jcl', name: 'JCL分析' }
        ]
      },
      {
        id: 'data_flow',
        name: 'データフローの総合分析',
        subsections: [
          { id: 'sql', name: '埋め込みSQL分析' },
          { id: 'db', name: 'データベースアクセス分析' }
        ]
      }
    ]
  },
  {
    id: 'diagnostics',
    name: '診断分析の総合評価',
    items: [
      {
        id: 'modernization',
        name: 'モダン化適性の総合評価',
        subsections: [
          { id: 'assembler', name: 'アセンブラ検出・分析の統合' },
          { id: 'special', name: '特異点の総合分析' }
        ]
      },
      {
        id: 'risk',
        name: 'リスクの総合定量化',
        subsections: [
          { id: 'security', name: 'セキュリティ脆弱性の全体検出' },
          { id: 'cve', name: 'CVE参照機能' }
        ]
      }
    ]
  }
]

// メニュー構造の取得
export const getMenuSections = (analysisMode) => {
  return analysisMode === 'single' ? singleAnalysisMenuSections : summaryAnalysisMenuSections
}