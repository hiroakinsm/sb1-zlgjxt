<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900">プレビュー</h2>
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-500"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div class="overflow-auto max-h-[calc(100vh-12rem)]">
      <!-- タイトルページ -->
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">COBOLソース解析レポート</h1>
        <p class="text-gray-600">{{ sourceData.fileName }}</p>
        <p class="text-gray-500">{{ formatDate(new Date()) }}</p>
      </div>

      <!-- 目次 -->
      <div v-if="settings.showTableOfContents" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">目次</h2>
        <ul class="space-y-2">
          <li v-for="(section, index) in sections" :key="section.id" 
              class="text-gray-700">
            <a :href="`#${section.id}`" class="hover:text-indigo-600">
              {{ index + 1 }}. {{ section.title }}
            </a>
            <ul v-if="section.subsections" class="ml-6 mt-2 space-y-1">
              <li v-for="(subsection, subIndex) in section.subsections" 
                  :key="subsection.id">
                <a :href="`#${section.id}_${subsection.id}`" 
                   class="text-gray-600 hover:text-indigo-600">
                  {{ index + 1 }}.{{ subIndex + 1 }}. {{ subsection.title }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- 各セクション -->
      <div v-for="(section, index) in sections" :key="section.id" 
           class="mb-8" :id="section.id">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          {{ index + 1 }}. {{ section.title }}
        </h2>
        
        <div v-for="(subsection, subIndex) in section.subsections" 
             :key="subsection.id"
             class="mb-6" 
             :id="`${section.id}_${subsection.id}`">
          <h3 class="text-lg font-medium text-gray-900 mb-3">
            {{ index + 1 }}.{{ subIndex + 1 }}. {{ subsection.title }}
          </h3>
          
          <component 
            :is="getContentComponent(subsection.type)"
            :data="getContentData(section.id, subsection.id)"
          />
        </div>
      </div>

      <!-- ダイアグラム -->
      <div v-if="settings.showDiagrams && hasDiagrams" class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">ダイアグラム</h2>
        <div v-for="(diagram, type) in sourceData.diagrams" 
             :key="type" 
             class="mb-6">
          <h3 class="text-lg font-medium text-gray-900 mb-3">
            {{ diagram.title }}
          </h3>
          <div class="mermaid">
            {{ diagram.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as contentComponents from './content'
import mermaid from 'mermaid'

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['single', 'summary'].includes(value)
  },
  sourceData: {
    type: Object,
    required: true
  },
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// セクション定義
const sections = computed(() => [
  {
    id: 'program_info',
    title: 'プログラム基本情報',
    subsections: [
      { id: 'basic', title: '基本情報', type: 'BasicInfo' },
      { id: 'metrics', title: 'メトリクス', type: 'Metrics' }
    ]
  },
  {
    id: 'structure',
    title: '構造分析',
    subsections: [
      { id: 'division', title: 'DIVISION構成', type: 'DivisionStructure' },
      { id: 'complexity', title: '複雑度分析', type: 'Complexity' }
    ]
  },
  {
    id: 'data_flow',
    title: 'データフロー分析',
    subsections: [
      { id: 'working_storage', title: 'WORKING-STORAGE', type: 'WorkingStorage' },
      { id: 'linkage', title: 'LINKAGE', type: 'Linkage' },
      { id: 'operations', title: 'データ操作', type: 'DataOperations' }
    ]
  },
  {
    id: 'control_flow',
    title: '制御フロー分析',
    subsections: [
      { id: 'problems', title: '問題コード', type: 'ProblemCode' },
      { id: 'nesting', title: 'ネスト分析', type: 'Nesting' }
    ]
  },
  {
    id: 'quality',
    title: '品質分析',
    subsections: [
      { id: 'standards', title: 'コーディング規約', type: 'CodingStandards' },
      { id: 'maintainability', title: '保守性', type: 'Maintainability' }
    ]
  }
])

const hasDiagrams = computed(() => {
  return props.sourceData.diagrams && Object.keys(props.sourceData.diagrams).length > 0
})

const getContentComponent = (type) => {
  return contentComponents[type] || contentComponents.Default
}

const getContentData = (sectionId, subsectionId) => {
  return props.sourceData[sectionId]?.[subsectionId] || {}
}

const formatDate = (date) => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Mermaidの初期化
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose'
})
</script>

<style>
.mermaid {
  background: white;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>