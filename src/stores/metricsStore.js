import { defineStore } from 'pinia'

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    // コード構造メトリクス
    structureMetrics: {
      totalLines: 0,
      codeLines: 0,
      commentLines: 0,
      emptyLines: 0,
      divisionRatio: {},
      copyStatements: [],
      commonModules: []
    },

    // 複雑度メトリクス
    complexityMetrics: {
      cyclomaticComplexity: 0,
      nestingDepth: 0,
      controlFlowComplexity: 0,
      dataFlowComplexity: 0,
      maintainabilityIndex: 0
    },

    // 品質メトリクス
    qualityMetrics: {
      codingStandards: {
        violations: [],
        complianceRate: 0
      },
      deadCode: [],
      unusedElements: [],
      duplicateCode: []
    },

    // データフローメトリクス
    dataFlowMetrics: {
      workingStorage: [],
      linkage: [],
      fileSection: [],
      dataOperations: []
    },

    // セキュリティメトリクス
    securityMetrics: {
      vulnerabilities: [],
      cveReferences: [],
      securityScore: 0
    },

    // 依存関係メトリクス
    dependencyMetrics: {
      externalCalls: [],
      programReferences: [],
      databaseAccess: [],
      fileOperations: []
    }
  }),

  actions: {
    // メトリクスの更新
    updateMetrics(type, data) {
      switch (type) {
        case 'structure':
          this.structureMetrics = { ...this.structureMetrics, ...data }
          break
        case 'complexity':
          this.complexityMetrics = { ...this.complexityMetrics, ...data }
          break
        case 'quality':
          this.qualityMetrics = { ...this.qualityMetrics, ...data }
          break
        case 'dataFlow':
          this.dataFlowMetrics = { ...this.dataFlowMetrics, ...data }
          break
        case 'security':
          this.securityMetrics = { ...this.securityMetrics, ...data }
          break
        case 'dependency':
          this.dependencyMetrics = { ...this.dependencyMetrics, ...data }
          break
      }
    },

    // メトリクスのリセット
    resetMetrics() {
      this.$reset()
    }
  }
})