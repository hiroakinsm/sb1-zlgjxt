<template>
  <div class="document-template">
    <!-- 表紙 -->
    <div class="cover-page">
      <h1>COBOLソース解析サマリレポート</h1>
      <div class="metadata">
        <p>作成日: {{ formatDate(date) }}</p>
        <p>解析対象: {{ sourceData.length }}ファイル</p>
      </div>
    </div>

    <!-- メトリクスグリッド -->
    <div class="metrics-grid">
      <div class="metric-card">
        <h4>プログラム構成</h4>
        <table>
          <tbody>
            <tr>
              <th>メインモジュール</th>
              <td>{{ summaryData.structure.programHierarchy.mainModules }}</td>
            </tr>
            <tr>
              <th>サブモジュール</th>
              <td>{{ summaryData.structure.programHierarchy.subModules }}</td>
            </tr>
            <tr>
              <th>ユーティリティモジュール</th>
              <td>{{ summaryData.structure.programHierarchy.utilityModules }}</td>
            </tr>
            <tr>
              <th>共通モジュール</th>
              <td>{{ summaryData.structure.programHierarchy.commonModules }}</td>
            </tr>
            <tr>
              <th>外部モジュール</th>
              <td>{{ summaryData.structure.programHierarchy.externalModules }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="metric-card">
        <h4>コードメトリクス</h4>
        <table>
          <tbody>
            <tr>
              <th>総行数</th>
              <td>{{ summaryData.structure.codeMetrics.totalLines }}</td>
            </tr>
            <tr>
              <th>実行行数</th>
              <td>{{ summaryData.structure.codeMetrics.codeLines }}</td>
            </tr>
            <tr>
              <th>コメント行数</th>
              <td>{{ summaryData.structure.codeMetrics.commentLines }}</td>
            </tr>
            <tr>
              <th>空行数</th>
              <td>{{ summaryData.structure.codeMetrics.emptyLines }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 複雑度メトリクス -->
    <div class="complexity-metrics">
      <table>
        <thead>
          <tr>
            <th>メトリクス</th>
            <th>値</th>
            <th>評価</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>サイクロマティック複雑度</td>
            <td>{{ summaryData.structure.complexity.cyclomaticComplexity }}</td>
            <td>{{ getComplexityEvaluation(summaryData.structure.complexity.cyclomaticComplexity) }}</td>
          </tr>
          <tr>
            <td>ネスト深度</td>
            <td>{{ summaryData.structure.complexity.nestingDepth }}</td>
            <td>{{ getComplexityEvaluation(summaryData.structure.complexity.nestingDepth) }}</td>
          </tr>
          <tr>
            <td>条件分岐複雑度</td>
            <td>{{ summaryData.structure.complexity.conditionalComplexity }}</td>
            <td>{{ getComplexityEvaluation(summaryData.structure.complexity.conditionalComplexity) }}</td>
          </tr>
          <tr>
            <td>データフロー複雑度</td>
            <td>{{ summaryData.structure.complexity.dataFlowComplexity }}</td>
            <td>{{ getComplexityEvaluation(summaryData.structure.complexity.dataFlowComplexity) }}</td>
          </tr>
          <tr>
            <td>保守性指標</td>
            <td>{{ summaryData.structure.complexity.maintainabilityIndex }}</td>
            <td>{{ getMaintainabilityEvaluation(summaryData.structure.complexity.maintainabilityIndex) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- システム連携分析 -->
    <div class="system-integration">
      <h3>システム間連携の総合分析</h3>
      <table>
        <thead>
          <tr>
            <th>連携種別</th>
            <th>件数</th>
            <th>評価</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in summaryData.dependencies.systemIntegration" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
            <td>{{ getIntegrationEvaluation(value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- データフロー分析 -->
    <div class="data-flow">
      <h3>データフローの総合分析</h3>
      <table>
        <thead>
          <tr>
            <th>フロー種別</th>
            <th>評価スコア</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in summaryData.dependencies.dataFlow" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ダイアグラム -->
    <div v-if="showDiagrams" class="diagrams">
      <h3>システム構造図</h3>
      <div v-for="(diagram, type) in summaryData.diagrams" :key="type" class="diagram">
        <h4>{{ diagram.title }}</h4>
        <div class="mermaid">{{ diagram.content }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SummaryAnalysisTemplate',
  props: {
    sourceData: {
      type: Array,
      required: true
    },
    summaryData: {
      type: Object,
      required: true
    },
    showDiagrams: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    date() {
      return new Date()
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('ja-JP')
    },
    getComplexityEvaluation(value) {
      if (value <= 10) return '良好'
      if (value <= 20) return '要注意'
      return '改善必要'
    },
    getMaintainabilityEvaluation(value) {
      if (value >= 85) return '良好'
      if (value >= 65) return '要注意'
      return '改善必要'
    },
    getIntegrationEvaluation(value) {
      if (value >= 8) return '多い'
      if (value >= 4) return '普通'
      return '少ない'
    }
  }
}
</script>

<style scoped>
.document-template {
  max-width: 210mm;
  margin: 0 auto;
  padding: 20mm;
  font-family: "Noto Sans JP", sans-serif;
}

.cover-page {
  text-align: center;
  margin-bottom: 40mm;
}

.cover-page h1 {
  font-size: 24pt;
  margin-bottom: 20mm;
}

.metadata {
  font-size: 12pt;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5mm;
  margin-bottom: 5mm;
}

.metric-card {
  border: 1px solid #ddd;
  padding: 3mm;
  border-radius: 2mm;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 5mm;
}

th, td {
  border: 1px solid #ddd;
  padding: 2mm;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.diagram {
  margin: 10mm 0;
}

@media print {
  .document-template {
    padding: 0;
  }

  @page {
    size: A4;
    margin: 20mm;
  }
}
</style>