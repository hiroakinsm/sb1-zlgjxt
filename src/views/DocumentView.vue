<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- ヘッダー -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">ドキュメント生成</h1>
        <p class="mt-2 text-sm text-gray-600">解析結果のドキュメントを生成します</p>
      </div>

      <!-- ドキュメント設定 -->
      <div class="mb-8">
        <DocumentSettings
          v-model:settings="documentSettings"
          @update:settings="updateSettings"
        />
      </div>

      <!-- プレビュー -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-semibold text-gray-900">プレビュー</h2>
          <button
            @click="generateDocument"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            :disabled="documentStore.isGenerating"
          >
            {{ documentStore.isGenerating ? '生成中...' : 'PDF生成' }}
          </button>
        </div>

        <!-- エラー表示 -->
        <div v-if="documentStore.error" class="mb-6">
          <div class="bg-red-50 border border-red-200 rounded-md p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-red-800">
                  {{ documentStore.error }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- プレビューコンテンツ -->
        <div class="prose max-w-none">
          <!-- プログラム基本情報 -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">プログラム基本情報</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <dl class="grid grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">プログラム名</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ analysisResults.programInfo.name }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">目的</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ analysisResults.programInfo.purpose }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">作成者</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ analysisResults.programInfo.author }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">最終更新日</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(analysisResults.programInfo.lastModified) }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <!-- 構造分析 -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">構造分析</h3>
            <div class="grid grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">コードメトリクス</h4>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">総行数</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.metrics.totalLines }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">実行行数</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.metrics.codeLines }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">コメント行数</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.metrics.commentLines }}</dd>
                  </div>
                </dl>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">複雑度分析</h4>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">サイクロマチック複雑度</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.complexity.cyclomaticComplexity }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">ネスト深度</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.complexity.nestingDepth }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm text-gray-500">保守性指標</dt>
                    <dd class="text-sm text-gray-900">{{ analysisResults.structure.complexity.maintainabilityIndex }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <!-- データフロー分析 -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">データフロー分析</h3>
            <div class="space-y-6">
              <!-- WORKING-STORAGE SECTION -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">WORKING-STORAGE SECTION</h4>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">項目名</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">型</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">使用状況</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in analysisResults.dataFlow.workingStorage" :key="item.name">
                      <td class="px-4 py-2 text-sm text-gray-900">{{ item.name }}</td>
                      <td class="px-4 py-2 text-sm text-gray-500">{{ item.type }}</td>
                      <td class="px-4 py-2 text-sm text-gray-500">{{ item.usage.join(', ') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- LINKAGE SECTION -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">LINKAGE SECTION</h4>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">項目名</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">型</th>
                      <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">方向</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="item in analysisResults.dataFlow.linkage" :key="item.name">
                      <td class="px-4 py-2 text-sm text-gray-900">{{ item.name }}</td>
                      <td class="px-4 py-2 text-sm text-gray-500">{{ item.type }}</td>
                      <td class="px-4 py-2 text-sm text-gray-500">{{ item.direction }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <!-- 制御フロー分析 -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">制御フロー分析</h3>
            <!-- フローチャート -->
            <div v-if="documentSettings.showDiagrams" class="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">フローチャート</h4>
              <div class="mermaid">
                {{ analysisResults.controlFlow.visualization.flowchart }}
              </div>
            </div>
            <!-- 問題コード -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">問題コード検出</h4>
              <div v-if="analysisResults.controlFlow.problemCode.length > 0">
                <ul class="space-y-2">
                  <li v-for="(problem, index) in analysisResults.controlFlow.problemCode" :key="index"
                      class="text-sm text-gray-500">
                    {{ problem.description }}
                  </li>
                </ul>
              </div>
              <p v-else class="text-sm text-gray-500">問題のあるコードは検出されませんでした。</p>
            </div>
          </section>

          <!-- 品質分析 -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">品質分析</h3>
            <div class="grid grid-cols-2 gap-6">
              <!-- コーディング規約準拠性 -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">コーディング規約準拠性</h4>
                <div class="flex items-center">
                  <div class="flex-1">
                    <div class="h-2 bg-gray-200 rounded-full">
                      <div class="h-2 bg-green-500 rounded-full"
                           :style="{ width: `${analysisResults.quality.codingStandards.complianceRate}%` }">
                      </div>
                    </div>
                  </div>
                  <span class="ml-2 text-sm text-gray-500">
                    {{ analysisResults.quality.codingStandards.complianceRate }}%
                  </span>
                </div>
              </div>
              <!-- 保守性評価 -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">保守性評価</h4>
                <dl class="space-y-2">
                  <div v-for="metric in analysisResults.quality.maintainability" :key="metric.name"
                       class="flex justify-between">
                    <dt class="text-sm text-gray-500">{{ metric.name }}</dt>
                    <dd class="text-sm text-gray-900">{{ metric.score }} ({{ metric.evaluation }})</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSingleAnalysisDocumentStore } from '../stores/singleAnalysisDocumentStore'
import { useAnalysisStore } from '../stores/analysisStore'
import DocumentSettings from '../components/DocumentSettings.vue'
import mermaid from 'mermaid'

const documentStore = useSingleAnalysisDocumentStore()
const analysisStore = useAnalysisStore()

const documentSettings = ref({
  showTableOfContents: true,
  showDiagrams: true,
  includeCharts: true,
  pageNumbers: true,
  headerFooter: true
})

const analysisResults = computed(() => {
  return analysisStore.analysisResults?.single || {
    programInfo: {
      name: '',
      purpose: '',
      author: '',
      lastModified: new Date()
    },
    structure: {
      metrics: {
        totalLines: 0,
        codeLines: 0,
        commentLines: 0
      },
      complexity: {
        cyclomaticComplexity: 0,
        nestingDepth: 0,
        maintainabilityIndex: 0
      }
    },
    dataFlow: {
      workingStorage: [],
      linkage: [],
      fileSection: []
    },
    controlFlow: {
      problemCode: [],
      visualization: {
        flowchart: ''
      }
    },
    quality: {
      codingStandards: {
        complianceRate: 0
      },
      maintainability: []
    }
  }
})

const updateSettings = (settings) => {
  documentSettings.value = settings
}

const generateDocument = async () => {
  await documentStore.generateDocument(analysisStore.singleSelectedFile, documentSettings.value)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ja-JP')
}

// Mermaidの初期化
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose'
})
</script>