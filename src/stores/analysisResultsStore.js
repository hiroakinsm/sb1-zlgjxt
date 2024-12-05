import { defineStore } from 'pinia'

export const useAnalysisResultsStore = defineStore('analysisResults', {
  state: () => ({
    // 構造分析結果
    structureAnalysis: {
      programInfo: {
        name: '',
        purpose: '',
        updateHistory: [],
        lineStats: {
          total: 0,
          code: 0,
          comment: 0,
          empty: 0
        },
        divisionRatio: {
          identification: 0,
          environment: 0,
          data: 0,
          procedure: 0
        }
      },
      dependencies: {
        copyStatements: [],
        commonModules: []
      }
    },

    // コードフロー分析結果
    codeFlowAnalysis: {
      controlFlow: {
        problemCode: {
          gotoStatements: [],
          performNesting: [],
          complexConditions: []
        },
        visualization: {
          flowchart: '',
          sequence: '',
          hierarchy: '',
          branchLoop: ''
        }
      },
      dataFlow: {
        workingStorage: [],
        linkage: [],
        fileSection: [],
        operations: {
          moves: [],
          computes: [],
          stringOperations: []
        }
      },
      integrated: {
        processingDataRelations: [],
        criticalPaths: [],
        optimizationPoints: []
      }
    },

    // 品質メトリクス評価結果
    qualityMetrics: {
      codingStandards: {
        violations: [],
        formatting: {
          indentation: 0,
          spacing: 0,
          comments: 0
        }
      },
      problemCode: {
        deadCode: [],
        unusedElements: [],
        duplicateCode: []
      },
      metrics: {
        size: {
          totalLines: 0,
          codeLines: 0,
          commentLines: 0
        },
        complexity: {
          cyclomatic: 0,
          nesting: 0,
          dataFlow: 0
        },
        quality: {
          maintainability: 0,
          testability: 0,
          reliability: 0
        }
      }
    },

    // 依存関係分析結果
    dependencyAnalysis: {
      systemIntegration: {
        externalCalls: [],
        programReferences: []
      },
      jcl: {
        jobs: [],
        datasets: []
      },
      dataFlow: {
        sql: {
          statements: [],
          tables: []
        },
        database: {
          types: [],
          accessPatterns: [],
          transactions: []
        }
      }
    },

    // 診断分析結果
    diagnosticsAnalysis: {
      modernization: {
        assembler: {
          platformDependency: 0,
          codeComplexity: 0
        },
        specialPoints: {
          vendorDialects: [],
          characterCodes: [],
          dialectFeatures: []
        }
      },
      risk: {
        security: {
          sqlInjection: [],
          bufferOverflow: [],
          fileOperations: []
        },
        cve: {
          references: [],
          scores: [],
          recommendations: []
        }
      },
      migration: {
        refactoring: {
          moduleSplitting: [],
          optimization: [],
          maintainability: []
        }
      }
    },

    // サマリ解析結果
    summaryAnalysis: {
      structure: {
        programHierarchy: {
          mainModules: 0,
          subModules: 0,
          utilityModules: 0,
          commonModules: 0,
          externalModules: 0
        },
        codeMetrics: {
          totalLines: 0,
          codeLines: 0,
          commentLines: 0,
          emptyLines: 0
        },
        complexity: {
          cyclomaticComplexity: 0,
          nestingDepth: 0,
          conditionalComplexity: 0,
          dataFlowComplexity: 0,
          maintainabilityIndex: 0
        }
      },
      dependencies: {
        systemIntegration: {
          databaseInterfaces: 0,
          fileInterfaces: 0,
          apiInterfaces: 0,
          screenInterfaces: 0,
          batchInterfaces: 0
        },
        dataFlow: {
          input: 0,
          process: 0,
          output: 0,
          transformation: 0,
          validation: 0
        },
        interfaceAnalysis: {
          dataCoupling: 0,
          interfaceCoupling: 0,
          moduleCoupling: 0,
          systemCoupling: 0,
          externalDependency: 0
        }
      },
      diagnostics: {
        modernization: {
          applicationComplexity: 0,
          codeQuality: 0,
          documentationLevel: 0,
          testability: 0,
          maintainability: 0
        },
        risk: {
          businessRisk: 0,
          technicalRisk: 0,
          securityRisk: 0,
          operationalRisk: 0,
          complianceRisk: 0
        },
        migration: {
          businessValue: 0,
          technicalUrgency: 0,
          resourceAvailability: 0,
          riskLevel: 0,
          costEfficiency: 0
        }
      }
    }
  }),

  actions: {
    // 解析結果の更新
    updateAnalysisResults(type, data) {
      switch (type) {
        case 'structure':
          this.structureAnalysis = { ...this.structureAnalysis, ...data }
          break
        case 'codeFlow':
          this.codeFlowAnalysis = { ...this.codeFlowAnalysis, ...data }
          break
        case 'quality':
          this.qualityMetrics = { ...this.qualityMetrics, ...data }
          break
        case 'dependency':
          this.dependencyAnalysis = { ...this.dependencyAnalysis, ...data }
          break
        case 'diagnostics':
          this.diagnosticsAnalysis = { ...this.diagnosticsAnalysis, ...data }
          break
        case 'summary':
          this.summaryAnalysis = { ...this.summaryAnalysis, ...data }
          break
      }
    },

    // 解析結果のリセット
    resetAnalysisResults() {
      this.$reset()
    },

    // 特定のセクションの結果を取得
    getSectionResults(section) {
      switch (section) {
        case 'structure':
          return this.structureAnalysis
        case 'codeFlow':
          return this.codeFlowAnalysis
        case 'quality':
          return this.qualityMetrics
        case 'dependency':
          return this.dependencyAnalysis
        case 'diagnostics':
          return this.diagnosticsAnalysis
        case 'summary':
          return this.summaryAnalysis
        default:
          return null
      }
    }
  }
})