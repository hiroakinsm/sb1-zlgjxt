import { defineStore } from 'pinia';
import type { AnalysisResult } from '../types/analysisTypes';

export const useAnalysisDataStore = defineStore('analysisData', {
  state: () => ({
    currentAnalysis: null as AnalysisResult | null,
    analysisHistory: [] as AnalysisResult[],
    error: null as string | null
  }),

  getters: {
    hasCurrentAnalysis: (state) => state.currentAnalysis !== null,
    
    getAnalysisById: (state) => (id: string) => {
      return state.analysisHistory.find(analysis => analysis.id === id);
    },
    
    getAnalysisByFileName: (state) => (fileName: string) => {
      return state.analysisHistory.find(analysis => analysis.fileName === fileName);
    },
    
    getLatestAnalysis: (state) => {
      return state.analysisHistory[state.analysisHistory.length - 1] || null;
    }
  },

  actions: {
    setCurrentAnalysis(analysis: AnalysisResult) {
      this.currentAnalysis = analysis;
      this.error = null;
    },

    addAnalysisToHistory(analysis: AnalysisResult) {
      const existingIndex = this.analysisHistory.findIndex(a => a.id === analysis.id);
      if (existingIndex >= 0) {
        this.analysisHistory[existingIndex] = analysis;
      } else {
        this.analysisHistory.push(analysis);
      }
    },

    clearCurrentAnalysis() {
      this.currentAnalysis = null;
      this.error = null;
    },

    setError(error: string) {
      this.error = error;
    },

    clearError() {
      this.error = null;
    }
  }
});