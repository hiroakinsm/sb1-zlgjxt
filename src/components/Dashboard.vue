<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <!-- ファイル選択パネル -->
      <div v-if="!selectedFile" class="mb-8">
        <FileList :files="files" @select-file="selectFile" />
      </div>

      <!-- メトリクス表示 -->
      <div v-else>
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

        <!-- 6分割グリッド -->
        <div class="grid grid-cols-3 grid-rows-2 gap-4 h-[calc(100vh-12rem)]">
          <!-- 上段 -->
          <div class="bg-white p-4 rounded-lg shadow">
            <CodeMetricsChart title="コード構造分析" :data="metrics.codeMetrics" />
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <ComplexityChart title="複雑度分析" :data="metrics.complexity" />
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <QualityMetricsChart title="品質メトリクス" :data="metrics.quality" />
          </div>

          <!-- 下段 -->
          <div class="bg-white p-4 rounded-lg shadow">
            <DataFlowChart title="データフロー分析" :data="metrics.dataFlow" />
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <SecurityChart title="セキュリティ分析" :data="metrics.security" />
          </div>
          <div class="bg-white p-4 rounded-lg shadow">
            <DependencyChart title="依存関係分析" :data="metrics.dependencies" />
          </div>
        </div>

        <!-- Mermaidダイアグラム (別ページ) -->
        <div v-if="currentPage === 'diagrams'" class="mt-4 grid grid-cols-2 gap-4">
          <div v-for="(diagram, type) in mermaidDiagrams" 
               :key="type" 
               class="bg-white p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-4">{{ diagram.title }}</h3>
            <div class="mermaid">{{ diagram.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// スクリプト部分は変更なし
</script>

<style>
.mermaid {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>