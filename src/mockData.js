export const sampleFiles = [
  {
    name: 'ACCOUNT.CBL',
    analyzed: true,
    metrics: {
      totalLines: 2500,
      codeLines: 1800,
      commentLines: 500,
      emptyLines: 200
    }
  },
  {
    name: 'CUSTOMER.CBL',
    analyzed: true,
    metrics: {
      totalLines: 3200,
      codeLines: 2400,
      commentLines: 600,
      emptyLines: 200
    }
  },
  {
    name: 'ORDER.CBL',
    analyzed: true,
    metrics: {
      totalLines: 4100,
      codeLines: 3000,
      commentLines: 800,
      emptyLines: 300
    }
  },
  {
    name: 'PAYMENT.CBL',
    analyzed: true,
    metrics: {
      totalLines: 1800,
      codeLines: 1300,
      commentLines: 400,
      emptyLines: 100
    }
  },
  {
    name: 'SHIPPING.CBL',
    analyzed: true,
    metrics: {
      totalLines: 2800,
      codeLines: 2000,
      commentLines: 600,
      emptyLines: 200
    }
  }
]

// サマリ解析結果のモックデータ
export const summaryMockData = {
  // 全体構造分析
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

  // 依存関係の総合分析
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

  // 診断分析の総合評価
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

  // 特異点分析
  special: {
    vendorDialect: {
      ibmExtensions: 45,
      fujitsuExtensions: 30,
      hitachiExtensions: 15,
      necExtensions: 8,
      otherExtensions: 2
    },
    characterCode: {
      shiftJIS: 60,
      ebcdic: 25,
      utf8: 10,
      ascii: 5
    },
    formOutput: {
      onlineForms: 40,
      batchForms: 30,
      spoolOutput: 15,
      printerOutput: 10,
      fileOutput: 5
    }
  },

  // Mermaidダイアグラム
  mermaidDiagrams: {
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
          B --> C[在庫確認]
          C --> D[与信確認]
          D --> E[出荷処理]
          E --> F((出荷データ))
          D --> G[支払処理]
          G --> H[(会計DB)]
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