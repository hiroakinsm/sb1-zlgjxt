import type { AnalysisResult } from '../types/analysisTypes';
import { useAnalysisDataStore } from '../stores/analysisDataStore';

export class AnalysisService {
  private static instance: AnalysisService;
  private analysisDataStore = useAnalysisDataStore();

  private constructor() {}

  static getInstance(): AnalysisService {
    if (!AnalysisService.instance) {
      AnalysisService.instance = new AnalysisService();
    }
    return AnalysisService.instance;
  }

  async analyzeSource(fileName: string, content: string): Promise<AnalysisResult> {
    try {
      // 解析処理の実装
      const analysis: AnalysisResult = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        fileName,
        structure: {
          programInfo: {
            name: fileName,
            purpose: '',
            updateHistory: []
          },
          metrics: {
            totalLines: content.split('\n').length,
            codeLines: 0,
            commentLines: 0,
            emptyLines: 0
          },
          divisionRatio: {
            identification: 0,
            environment: 0,
            data: 0,
            procedure: 0
          },
          dependencies: {
            copyStatements: [],
            commonModules: []
          }
        },
        dataFlow: {
          workingStorage: [],
          linkage: [],
          fileSection: [],
          operations: []
        },
        controlFlow: {
          problemCode: [],
          performNesting: [],
          conditionalComplexity: [],
          visualization: {
            flowchart: '',
            sequence: '',
            hierarchy: ''
          }
        },
        quality: {
          codingStandards: {
            violations: [],
            complianceRate: 0
          },
          problemCode: [],
          metrics: {
            complexity: {
              cyclomatic: 0,
              cognitive: 0,
              halstead: {
                difficulty: 0,
                effort: 0,
                volume: 0
              }
            },
            maintainability: {
              index: 0,
              factors: []
            }
          }
        }
      };

      // 解析結果をストアに保存
      this.analysisDataStore.setCurrentAnalysis(analysis);
      this.analysisDataStore.addAnalysisToHistory(analysis);

      return analysis;
    } catch (error) {
      console.error('Source analysis error:', error);
      throw error;
    }
  }

  getAnalysisById(id: string): AnalysisResult | null {
    return this.analysisDataStore.getAnalysisById(id);
  }

  getAnalysisByFileName(fileName: string): AnalysisResult | null {
    return this.analysisDataStore.getAnalysisByFileName(fileName);
  }

  getCurrentAnalysis(): AnalysisResult | null {
    return this.analysisDataStore.currentAnalysis;
  }
}

export const analysisService = AnalysisService.getInstance();