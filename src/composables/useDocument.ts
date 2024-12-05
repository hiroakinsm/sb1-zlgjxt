import { ref, computed } from 'vue';
import { pdfService } from '../services/pdfService';
import { useAnalysis } from './useAnalysis';
import type { DocumentSettings } from '../types/analysisTypes';

export function useDocument() {
  const { currentAnalysis } = useAnalysis();
  const isGenerating = ref(false);
  const error = ref<string | null>(null);
  const progress = ref({ current: 0, total: 100, message: '' });

  const settings = ref<DocumentSettings>({
    showTableOfContents: true,
    showDiagrams: true,
    includeCharts: true,
    pageNumbers: true,
    headerFooter: true
  });

  const canGenerate = computed(() => currentAnalysis.value !== null);

  async function generateDocument() {
    if (!canGenerate.value) {
      error.value = '解析結果が見つかりません';
      return false;
    }

    isGenerating.value = true;
    error.value = null;
    progress.value = { current: 0, total: 100, message: 'PDFを生成中...' };

    try {
      const result = await pdfService.generateDocument(
        currentAnalysis.value!,
        settings.value
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      progress.value = { current: 100, total: 100, message: '完了' };
      return true;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'PDF生成中にエラーが発生しました';
      return false;
    } finally {
      isGenerating.value = false;
    }
  }

  function updateSettings(newSettings: Partial<DocumentSettings>) {
    settings.value = {
      ...settings.value,
      ...newSettings
    };
  }

  return {
    isGenerating,
    error,
    progress,
    settings,
    canGenerate,
    generateDocument,
    updateSettings
  };
}