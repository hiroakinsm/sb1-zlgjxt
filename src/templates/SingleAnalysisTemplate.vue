<template>
  <div class="document-template">
    <!-- 表紙 -->
    <div class="cover-page">
      <h1>{{ title }}</h1>
      <div class="metadata">
        <p>作成日: {{ formatDate(date) }}</p>
        <p>ファイル名: {{ sourceData.name }}</p>
      </div>
    </div>

    <!-- 目次 -->
    <div v-if="showTableOfContents" class="table-of-contents">
      <h2>目次</h2>
      <div class="toc-content">
        <ol>
          <li>
            ソースコード分析機能
            <ol>
              <li>
                ソースコード構造
                <ol>
                  <li>プログラム名・目的</li>
                  <li>プログラム基本構造</li>
                  <li>更新履歴</li>
                  <li>行数統計</li>
                  <li>DIVISION毎の構成比</li>
                </ol>
              </li>
              <!-- ... 他の目次項目 ... -->
            </ol>
          </li>
        </ol>
      </div>
    </div>

    <!-- コンテンツ -->
    <div class="content">
      <!-- 1. ソースコード分析機能 -->
      <section id="source-code-analysis">
        <h2>1. ソースコード分析機能</h2>

        <!-- 1.1 ソースコード構造 -->
        <section id="code-structure">
          <h3>1.1 ソースコード構造</h3>

          <!-- 1.1.1 プログラム名・目的 -->
          <div class="subsection">
            <h4>1.1.1 プログラム名・目的</h4>
            <table class="info-table">
              <tbody>
                <tr>
                  <th>プログラム名</th>
                  <td>{{ sourceData.name }}</td>
                </tr>
                <tr>
                  <th>目的</th>
                  <td>{{ sourceData.purpose || '未設定' }}</td>
                </tr>
                <tr>
                  <th>作成者</th>
                  <td>{{ sourceData.author || '未設定' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 1.1.2 プログラム基本構造 -->
          <div class="subsection">
            <h4>1.1.2 プログラム基本構造</h4>
            <div v-if="sourceData.structure" class="chart-container">
              <ProgramStructureChart
                :data="sourceData.structure"
              />
            </div>
            <div class="description">
              <p>プログラムの基本構造に関する解説テキスト...</p>
            </div>
          </div>
        </section>
      </section>

      <!-- 8. ダイアグラム -->
      <section v-if="showDiagrams && hasDiagrams" id="diagrams">
        <h2>8. ダイアグラム</h2>

        <!-- 8.1 Mermaid記法によるフローチャート -->
        <div v-if="diagrams.flowchart" class="subsection">
          <h3>8.1 Mermaid記法によるフローチャート</h3>
          <div class="mermaid">
            {{ diagrams.flowchart.content }}
          </div>
          <div class="description">
            <p>フローチャートに関する解説テキスト...</p>
          </div>
        </div>

        <!-- 8.2 Mermaid記法によるシーケンス図 -->
        <div v-if="diagrams.sequence" class="subsection">
          <h3>8.2 Mermaid記法によるシーケンス図</h3>
          <div class="mermaid">
            {{ diagrams.sequence.content }}
          </div>
          <div class="description">
            <p>シーケンス図に関する解説テキスト...</p>
          </div>
        </div>

        <!-- 8.3 データフロー図 -->
        <div v-if="diagrams.dataFlow" class="subsection">
          <h3>8.3 データフロー図</h3>
          <div class="mermaid">
            {{ diagrams.dataFlow.content }}
          </div>
          <div class="description">
            <p>データフロー図に関する解説テキスト...</p>
          </div>
        </div>

        <!-- 8.4 システム構成図 -->
        <div v-if="diagrams.systemStructure" class="subsection">
          <h3>8.4 システム構成図</h3>
          <div class="mermaid">
            {{ diagrams.systemStructure.content }}
          </div>
          <div class="description">
            <p>システム構成図に関する解説テキスト...</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as charts from '../components/charts'

const props = defineProps({
  sourceData: {
    type: Object,
    required: true
  },
  showTableOfContents: {
    type: Boolean,
    default: true
  },
  showDiagrams: {
    type: Boolean,
    default: true
  }
})

const date = ref(new Date())

const title = computed(() => {
  return `${props.sourceData.name} - COBOLソース解析レポート`
})

const diagrams = computed(() => {
  return props.sourceData.diagrams || {}
})

const hasDiagrams = computed(() => {
  return Object.keys(diagrams.value).length > 0
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ja-JP')
}
</script>

<style>
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

.table-of-contents {
  margin-bottom: 20mm;
}

.table-of-contents ol {
  list-style-type: decimal;
  margin-left: 5mm;
}

.table-of-contents ol ol {
  list-style-type: lower-alpha;
  margin-left: 10mm;
}

.content section {
  margin-bottom: 10mm;
}

.subsection {
  margin: 5mm 0;
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 5mm;
}

.info-table th,
.info-table td {
  border: 1px solid #ddd;
  padding: 2mm;
  text-align: left;
}

.info-table th {
  background-color: #f5f5f5;
  width: 30%;
}

.chart-container {
  margin: 5mm 0;
  height: 60mm;
}

.description {
  margin: 3mm 0;
  font-size: 10pt;
  line-height: 1.6;
}

.mermaid {
  margin: 5mm 0;
  text-align: center;
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