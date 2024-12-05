```typescript
// Analysis Result Types
export interface AnalysisResult {
  id: string
  timestamp: Date
  fileName: string
  structure: {
    programInfo: {
      name: string
      purpose: string
      author?: string
      lastModified?: Date
      updateHistory: Array<{
        date: Date
        author: string
        description: string
      }>
    }
    metrics: {
      totalLines: number
      codeLines: number
      commentLines: number
      emptyLines: number
    }
    complexity: {
      cyclomaticComplexity: number
      nestingDepth: number
      conditionalComplexity: number
      dataFlowComplexity: number
      maintainabilityIndex: number
    }
  }
  dataFlow: {
    workingStorage: Array<{
      name: string
      type: string
      usage: string[]
      redefines?: string
    }>
    linkage: Array<{
      name: string
      type: string
      direction: 'input' | 'output' | 'both'
    }>
    fileSection: Array<{
      name: string
      type: string
      recordFormat: string
      accessMethod: string
    }>
    operations: Array<{
      type: string
      count: number
      locations: string[]
    }>
  }
  controlFlow: {
    problemCode: Array<{
      location: string
      type: string
      description: string
      severity: 'high' | 'medium' | 'low'
    }>
    performNesting: Array<{
      location: string
      depth: number
      complexity: number
    }>
    conditionalComplexity: Array<{
      location: string
      complexity: number
      recommendation: string
    }>
    visualization: {
      flowchart: string
      sequence: string
      hierarchy: string
    }
  }
  quality: {
    codingStandards: {
      violations: Array<{
        rule: string
        severity: string
        description: string
      }>
      complianceRate: number
    }
    maintainability: Array<{
      name: string
      score: number
      evaluation: string
    }>
  }
}

// Document Generation Types
export interface DocumentSettings {
  showTableOfContents: boolean
  showDiagrams: boolean
  includeCharts: boolean
  pageNumbers: boolean
  headerFooter: boolean
  fontSize?: number
  fontFamily?: string
}

export interface GenerationProgress {
  current: number
  total: number
  message: string
}

export interface DocumentSection {
  id: string
  title: string
  content: any[]
}

export interface PDFGenerationResult {
  success: boolean
  error?: string
}
```