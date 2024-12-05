import { ref, computed } from 'vue';
import { analysisService } from '../services/analysisService';
import type { AnalysisResult } from '../types/analysisTypes';

export function useAnalysis() {
  const isAnalyzing = ref(false);
  const error = ref<string | null>(null);

  const currentAnalysis = computed(() => analysisService.getCurrentAnalysis());

  async function analyzeSource(fileName: string, content: string) {
    isAnalyzing.value = true;
    error.value = null;

    try {
      const result = await analysisService.analyzeSource(fileName, content);
      return result;
    } catch (e) {
      error.value = e instanceof Error ? e.message : '解析中にエラーが発生しました';
      throw e;
    } finally {
      isAnalyzing.value = false;
    }
  }

  function getAnalysisById(id: string): AnalysisResult | null {
    return analysisService.getAnalysisById(id);
  }

  function getAnalysisByFileName(fileName: string): AnalysisResult | null {
    return analysisService.getAnalysisByFileName(fileName);
  }

  return {
    isAnalyzing,
    error,
    currentAnalysis,
    analyzeSource,
    getAnalysisById,
    getAnalysisByFileName
  };
}