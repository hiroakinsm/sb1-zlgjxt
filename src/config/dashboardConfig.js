// メニュー構造の定義
export const singleAnalysisMenuSections = [
  {
    id: 'structure',
    name: '構造分析',
    items: [
      {
        id: 'program',
        name: 'プログラム階層構造分析',
        subsections: [
          {
            id: 'basic',
            name: 'プログラム基本情報',
            items: [
              { id: 'purpose', name: 'プログラム名・目的' },
              { id: 'history', name: '更新履歴' },
              { id: 'stats', name: '行数統計' },
              { id: 'division', name: 'DIVISION構成比' }
            ]
          },
          {
            id: 'dependency',
            name: 'ソースコード依存関係',
            items: [
              { id: 'copy', name: 'COPY文使用状況' },
              { id: 'common', name: '共通モジュール使用状況' }
            ]
          }
        ]
      },
      {
        id: 'codeflow',
        name: 'コードフロー分析',
        subsections: [
          {
            id: 'control',
            name: '制御フロー分析',
            items: [
              { id: 'problems', name: '問題コード検出' },
              { id: 'visualization', name: '処理フロー可視化' }
            ]
          },
          {
            id: 'dataflow',
            name: 'データフロー分析',
            items: [
              { id: 'definition', name: 'データ定義分析' },
              { id: 'operation', name: 'データ操作追跡' }
            ]
          },
          {
            id: 'integrated',
            name: '統合フロー分析',
            items: [
              { id: 'combined', name: '制御/データフロー統合' }
            ]
          }
        ]
      },
      {
        id: 'quality',
        name: '品質メトリクス評価',
        subsections: [
          {
            id: 'standards',
            name: 'コーディング規約準拠性',
            items: [
              { id: 'naming', name: '命名規則違反' },
              { id: 'format', name: 'インデント・整形' },
              { id: 'comments', name: 'コメント記述' }
            ]
          },
          {
            id: 'issues',
            name: '問題コード検出',
            items: [
              { id: 'dead', name: 'デッドコード' },
              { id: 'unused', name: '未使用要素' },
              { id: 'duplicate', name: '重複コード' }
            ]
          },
          {
            id: 'metrics',
            name: 'コードメトリクス',
            items: [
              { id: 'size', name: '規模メトリクス' },
              { id: 'complexity', name: '複雑度メトリクス' },
              { id: 'quality', name: '品質メトリクス' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dependencies',
    name: '依存関係分析',
    items: [
      {
        id: 'system',
        name: 'システム間連携分析',
        subsections: [
          {
            id: 'source',
            name: 'ソースコード依存関係',
            items: [
              { id: 'external', name: '外部プログラム連携' }
            ]
          },
          {
            id: 'jcl',
            name: 'JCL分析',
            items: [
              { id: 'jobs', name: 'ジョブ依存関係' },
              { id: 'datasets', name: 'データセット使用状況' }
            ]
          }
        ]
      },
      {
        id: 'dataflow',
        name: 'データフロー分析',
        subsections: [
          {
            id: 'sql',
            name: '埋め込みSQL分析',
            items: [
              { id: 'statements', name: 'SQL文分析' },
              { id: 'tables', name: 'テーブル参照関係' }
            ]
          },
          {
            id: 'db',
            name: 'データベースアクセス',
            items: [
              { id: 'types', name: 'DB種別検出' },
              { id: 'patterns', name: 'アクセスパターン' }
            ]
          }
        ]
      },
      {
        id: 'interface',
        name: 'インターフェース分析',
        subsections: [
          {
            id: 'external',
            name: '外部インターフェース',
            items: [
              { id: 'protocol', name: 'プロトコル検出' },
              { id: 'format', name: 'データフォーマット' }
            ]
          },
          {
            id: 'screen',
            name: '画面制御分析',
            items: [
              { id: 'control', name: '画面制御方式' },
              { id: 'io', name: '端末I/O' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'diagnostics',
    name: '診断分析',
    items: [
      {
        id: 'modernization',
        name: 'モダン化適性評価',
        subsections: [
          {
            id: 'assembler',
            name: 'アセンブラ検出・分析',
            items: [
              { id: 'platform', name: 'プラットフォーム依存性' },
              { id: 'complexity', name: 'コード理解難易度' }
            ]
          },
          {
            id: 'special',
            name: '特異点分析',
            items: [
              { id: 'dialect', name: 'メーカー方言分析' },
              { id: 'charset', name: '文字コード分析' }
            ]
          }
        ]
      },
      {
        id: 'risk',
        name: 'リスク定量化',
        subsections: [
          {
            id: 'security',
            name: 'セキュリティ脆弱性',
            items: [
              { id: 'injection', name: 'SQLインジェクション' },
              { id: 'overflow', name: 'バッファオーバーフロー' }
            ]
          },
          {
            id: 'cve',
            name: 'CVE参照',
            items: [
              { id: 'database', name: 'CVEデータベース連携' },
              { id: 'scoring', name: '脆弱性スコアリング' }
            ]
          }
        ]
      },
      {
        id: 'migration',
        name: '移行優先度評価',
        subsections: [
          {
            id: 'refactoring',
            name: 'リファクタリング提案',
            items: [
              { id: 'modules', name: 'モジュール分割推奨' },
              { id: 'optimization', name: 'ロジック最適化' }
            ]
          }
        ]
      }
    ]
  }
]

// サマリ解析のメニュー構造は変更なし
export const summaryAnalysisMenuSections = [
  // ... 既存のサマリ解析メニュー構造
]

// メニュー構造の取得
export const getMenuSections = (analysisMode) => {
  return analysisMode === 'single' ? singleAnalysisMenuSections : summaryAnalysisMenuSections
}

// チャートの構成を取得する関数
export const getChartsForSection = (sectionId, itemId, data = {}, analysisMode = 'single') => {
  if (!data) return []

  const charts = analysisMode === 'single' ? singleAnalysisCharts : summaryAnalysisCharts
  return charts[sectionId]?.[itemId] || []
}