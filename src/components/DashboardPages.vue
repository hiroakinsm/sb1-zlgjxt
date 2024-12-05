<template>
  <div>
    <!-- ヘッダー -->
    <div class="bg-white shadow rounded-lg p-4 mb-6">
      <h2 class="text-xl font-bold">解析対象: {{ fileName }}</h2>
      <p class="text-sm text-gray-600">解析日時: {{ analysisDate }}</p>
    </div>

    <!-- ページ切り替えタブ -->
    <div class="flex space-x-4 mb-6">
      <button 
        v-for="page in pages" 
        :key="page.id"
        @click="currentPage = page.id"
        :class="[
          'px-4 py-2 rounded-lg',
          currentPage === page.id 
            ? 'bg-blue-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        ]"
      >
        {{ page.name }}
      </button>
    </div>

    <!-- メインページ -->
    <div v-if="currentPage === 'main'" class="grid grid-cols-3 grid-rows-2 gap-4 h-[calc(100vh-16rem)]">
      <div class="bg-white rounded-lg shadow">
        <CodeMetricsChart 
          title="コード構造分析" 
          :data="metrics.codeMetrics" 
        />
      </div>
      <div class="bg-white rounded-lg shadow">
        <ComplexityChart 
          title="複雑度分析" 
          :data="metrics.complexity" 
        />
      </div>
      <div class="bg-white rounded-lg shadow">
        <QualityMetricsChart 
          title="品質メトリクス" 
          :data="metrics.quality" 
        />
      </div>
      <div class="bg-white rounded-lg shadow">
        <DataFlowChart 
          title="データフロー分析" 
          :data="metrics.dataFlow" 
        />
      </div>
      <div class="bg-white rounded-lg shadow">
        <SecurityChart 
          title="セキュリティ分析" 
          :data="metrics.security" 
        />
      </div>
      <div class="bg-white rounded-lg shadow">
        <DependencyChart 
          title="依存関係分析" 
          :data="metrics.dependencies" 
        />
      </div>
    </div>

    <!-- 他のページコンテンツは変更なし -->
  </div>
</template>

<script>
// 既存のインポート文は変更なし

export default {
  name: 'DashboardPages',
  // 既存のコンポーネント定義は変更なし
  props: {
    metrics: {
      type: Object,
      required: true
    },
    mermaidDiagrams: {
      type: Object,
      required: true
    },
    fileName: {
      type: String,
      default: '未選択'
    }
  },
  computed: {
    analysisDate() {
      return new Date().toLocaleString('ja-JP')
    }
  },
  data() {
    return {
      currentPage: 'main',
      pages: [
        { id: 'main', name: 'メイン' },
        { id: 'standards', name: 'コーディング規約' },
        { id: 'integration', name: 'システム連携' },
        { id: 'diagrams', name: 'ダイアグラム' }
      ]
    }
  }
}
</script>