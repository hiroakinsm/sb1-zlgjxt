// 単一ソース解析のメニュー項目
export const singleAnalysisMenuItems = {
  structure: [
    {
      id: 'program_hierarchy',
      name: 'プログラム階層構造分析',
      subsections: [
        {
          id: 'basic_info',
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
      id: 'code_flow',
      name: 'コードフロー分析',
      subsections: [
        {
          id: 'control_flow',
          name: '制御フロー分析',
          items: [
            { id: 'problems', name: '問題コード検出' },
            { id: 'visualization', name: '処理フロー可視化' }
          ]
        },
        {
          id: 'data_flow',
          name: 'データフロー分析',
          items: [
            { id: 'definition', name: 'データ定義分析' },
            { id: 'operation', name: 'データ操作追跡' }
          ]
        }
      ]
    },
    // ... 他のメニュー項目
  ],
  
  dependencies: [
    {
      id: 'system_integration',
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
    // ... 他のメニュー項目
  ],
  
  diagnostics: [
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
        }
      ]
    },
    // ... 他のメニュー項目
  ]
}

// サマリ解析のメニュー項目
export const summaryAnalysisMenuItems = {
  overall_structure: [
    {
      id: 'program_hierarchy',
      name: 'プログラム階層構造の総合分析',
      subsections: [
        {
          id: 'basic_info',
          name: 'プログラム基本情報のサマリ',
          items: [
            { id: 'program_list', name: 'プログラム数・目的の一覧' },
            { id: 'history', name: '全プログラムの更新履歴サマリ' }
          ]
        }
      ]
    },
    // ... 他のメニュー項目
  ],
  
  system_dependencies: [
    {
      id: 'system_integration',
      name: 'システム間連携の総合分析',
      subsections: [
        {
          id: 'source',
          name: 'ソースコード依存関係の統合',
          items: [
            { id: 'external_calls', name: '外部プログラム呼び出しの一覧' },
            { id: 'references', name: '外部プログラムからの参照の統計' }
          ]
        }
      ]
    },
    // ... 他のメニュー項目
  ],
  
  diagnostics: [
    {
      id: 'modernization',
      name: 'モダン化適性の総合評価',
      subsections: [
        {
          id: 'assembler',
          name: 'アセンブラ検出・分析の統合',
          items: [
            { id: 'platform', name: 'プラットフォーム依存性の評価' },
            { id: 'complexity', name: 'コードの理解難易度の比較' }
          ]
        }
      ]
    },
    // ... 他のメニュー項目
  ]
}