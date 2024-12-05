// ... single部分は変更なし ...

export const mockAnalysisResults = {
  single: {
    // ... 既存のsingleオブジェクトはそのまま ...
  },
  summary: {
    structure: {
      programHierarchy: {
        mainModules: 5,
        subModules: 12,
        utilityModules: 8,
        commonModules: 6,
        externalModules: 4
      },
      codeMetrics: {
        totalLines: 14400,
        codeLines: 10500,
        commentLines: 2900,
        emptyLines: 1000
      },
      complexity: {
        cyclomaticComplexity: 75,
        nestingDepth: 60,
        conditionalComplexity: 70,
        dataFlowComplexity: 65,
        maintainabilityIndex: 80
      }
    },
    dependencies: {
      systemIntegration: {
        databaseInterfaces: 8,
        fileInterfaces: 12,
        apiInterfaces: 6,
        screenInterfaces: 4,
        batchInterfaces: 10
      },
      dataFlow: {
        input: 45,
        process: 65,
        output: 40,
        transformation: 55,
        validation: 50
      },
      interfaceAnalysis: {
        dataCoupling: 70,
        interfaceCoupling: 75,
        moduleCoupling: 80,
        systemCoupling: 65,
        externalDependency: 60
      }
    },
    diagnostics: {
      modernization: {
        applicationComplexity: 65,
        codeQuality: 75,
        documentationLevel: 70,
        testability: 80,
        maintainability: 85
      },
      risk: {
        businessRisk: 40,
        technicalRisk: 55,
        securityRisk: 35,
        operationalRisk: 45,
        complianceRisk: 30
      },
      migration: {
        businessValue: 85,
        technicalUrgency: 70,
        resourceAvailability: 60,
        riskLevel: 45,
        costEfficiency: 75
      }
    },
    diagrams: {
      flowchart: {
        title: "プログラム構造図",
        content: `
          graph TB
            A[メインモジュール] --> B{処理分岐}
            B -->|取引処理| C[ACCOUNT]
            B -->|顧客管理| D[CUSTOMER]
            B -->|受注処理| E[ORDER]
            B -->|支払処理| F[PAYMENT]
            B -->|出荷処理| G[SHIPPING]
            C --> H[データベース]
            D --> H
            E --> H
            F --> H
            G --> H
        `
      },
      sequence: {
        title: "処理シーケンス",
        content: `
          sequenceDiagram
            participant M as メイン
            participant O as ORDER
            participant P as PAYMENT
            participant S as SHIPPING
            participant D as DB
            
            M->>O: 受注処理開始
            O->>D: 在庫確認
            D-->>O: 在庫情報
            O->>P: 支払処理要求
            P->>D: 与信確認
            D-->>P: 与信情報
            P-->>O: 支払確認
            O->>S: 出荷指示
            S->>D: 出荷情報登録
            D-->>S: 登録完了
            S-->>O: 出荷完了
            O-->>M: 処理完了
        `
      },
      dataFlow: {
        title: "データフロー図",
        content: `
          graph LR
            A((受注データ)) --> B[データ検証]
            B --> C[データ変換]
            C --> D[ビジネスロジック]
            D --> E[データ整形]
            E --> F((出力データ))
            D --> G[ログ記録]
            G --> H[(ログDB)]
        `
      },
      systemStructure: {
        title: "システム構成図",
        content: `
          graph TB
            subgraph Frontend
              A[オンライン画面]
              B[バッチ処理]
            end
            subgraph Backend
              C[業務処理]
              D[共通処理]
            end
            subgraph Database
              E[(業務DB)]
              F[(履歴DB)]
            end
            A --> C
            B --> C
            C --> D
            D --> E
            D --> F
        `
      }
    }
  }
}