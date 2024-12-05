import { AnalysisResults } from '../types/analysisTypes';

// モック分析結果データ
export const mockAnalysisResults: AnalysisResults = {
  single: {
    structure: {
      programInfo: {
        name: 'ACCOUNT.CBL',
        purpose: '口座管理プログラム',
        author: '開発者A',
        lastModified: new Date('2023-12-01'),
        updateHistory: [
          {
            date: new Date('2023-12-01'),
            author: '開発者A',
            description: '初期実装'
          }
        ]
      },
      metrics: {
        totalLines: 2500,
        codeLines: 1800,
        commentLines: 500,
        emptyLines: 200
      },
      divisionRatio: {
        identification: 5,
        environment: 15,
        data: 30,
        procedure: 50
      },
      dependencies: {
        copyStatements: [
          {
            name: 'ACCNTCPY',
            usageCount: 3,
            locations: ['WORKING-STORAGE', 'LINKAGE']
          }
        ],
        commonModules: [
          {
            name: 'DATECONV',
            type: 'utility',
            usageCount: 5
          }
        ]
      }
    },
    codeFlow: {
      controlFlow: {
        problemCode: {
          gotoStatements: [
            {
              location: 'PROC-100',
              type: 'unconditional',
              risk: 75
            }
          ],
          performNesting: [
            {
              location: 'PROC-200',
              depth: 4,
              complexity: 65
            }
          ],
          conditionalComplexity: [
            {
              location: 'PROC-300',
              complexity: 12,
              recommendation: 'モジュール分割を推奨'
            }
          ]
        },
        visualization: {
          flowchart: `graph TB
            A[開始] --> B{入力チェック}
            B -->|OK| C[データ処理]
            B -->|NG| D[エラー処理]
            C --> E[終了]
            D --> E`,
          sequence: `sequenceDiagram
            participant U as User
            participant P as Program
            participant D as Database
            U->>P: データ入力
            P->>D: 検証
            D-->>P: 結果
            P-->>U: 応答`,
          hierarchy: `graph TD
            A[メイン] --> B[サブ1]
            A --> C[サブ2]`
        }
      },
      dataFlow: {
        workingStorage: [
          {
            name: 'WS-ACCOUNT-REC',
            type: 'group',
            usage: ['READ', 'WRITE'],
            redefines: null
          }
        ],
        linkage: [
          {
            name: 'LK-ACCOUNT-ID',
            type: 'PIC X(10)',
            direction: 'input'
          }
        ],
        fileSection: [
          {
            name: 'ACCOUNT-FILE',
            type: 'sequential',
            recordFormat: 'fixed',
            accessMethod: 'dynamic'
          }
        ],
        operations: [
          {
            type: 'MOVE',
            count: 45,
            locations: ['PROC-100', 'PROC-200']
          }
        ]
      }
    },
    // ... 他のセクションも同様に詳細なモックデータを定義
  },
  summary: {
    overview: {
      totalFiles: 5,
      analyzedFiles: 5,
      totalMetrics: {
        totalLines: 12000,
        codeLines: 8500,
        commentLines: 2500,
        emptyLines: 1000
      },
      averageMetrics: {
        totalLines: 2400,
        codeLines: 1700,
        commentLines: 500,
        emptyLines: 200
      }
    },
    // ... サマリ分析の他のセクションも同様に定義
  }
};