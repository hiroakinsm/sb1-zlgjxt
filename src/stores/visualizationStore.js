import { defineStore } from 'pinia'

export const useVisualizationStore = defineStore('visualization', {
  state: () => ({
    diagrams: {},
    charts: {
      // Structure analysis charts
      metrics: {
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
      },
      quality: {
        commentRatio: 0,
        testability: 0,
        codeQuality: 0,
        documentationQuality: 0
      },
      // Dependency analysis charts
      dataFlow: {
        input: 0,
        process: 0,
        output: 0,
        transformation: 0,
        validation: 0
      },
      security: {
        sqlInjection: 0,
        bufferOverflow: 0,
        fileOperation: 0,
        errorHandling: 0,
        inputValidation: 0
      },
      dependency: {
        externalCalls: 0,
        commonModules: 0,
        fileReferences: 0,
        dbReferences: 0
      },
      // Diagnostics analysis charts
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
  }),

  actions: {
    updateChartData(chartId, data) {
      if (this.charts[chartId]) {
        this.charts[chartId] = { ...this.charts[chartId], ...data }
      }
    },

    updateDiagrams(diagrams) {
      this.diagrams = { ...this.diagrams, ...diagrams }
    },

    resetChartData() {
      Object.keys(this.charts).forEach(key => {
        this.charts[key] = Object.fromEntries(
          Object.keys(this.charts[key]).map(metric => [metric, 0])
        )
      })
      this.diagrams = {}
    }
  }
})