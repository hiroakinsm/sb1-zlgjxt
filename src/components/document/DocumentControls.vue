```vue
<template>
  <div class="space-y-6">
    <!-- 文書設定 -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">文書設定</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">目次</label>
            <p class="text-xs text-gray-500">ドキュメントに目次を含めます</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="localControls.showTableOfContents"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">ダイアグラム</label>
            <p class="text-xs text-gray-500">フローチャートなどのダイアグラムを含めます</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="localControls.showDiagrams"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">チャート</label>
            <p class="text-xs text-gray-500">メトリクスのチャートを含めます</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="localControls.includeCharts"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">ページ番号</label>
            <p class="text-xs text-gray-500">各ページにページ番号を表示します</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="localControls.pageNumbers"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">ヘッダー/フッター</label>
            <p class="text-xs text-gray-500">各ページにヘッダーとフッターを表示します</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="localControls.headerFooter"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- フォント設定 -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">フォント設定</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">フォントサイズ</label>
          <select
            v-model="localControls.fontSize"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="10">10pt</option>
            <option value="11">11pt</option>
            <option value="12">12pt</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">フォントファミリー</label>
          <select
            v-model="localControls.fontFamily"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="IPAexGothic">IPAex明朝</option>
            <option value="IPAexMincho">IPAexゴシック</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const localControls = ref({ ...props.modelValue })

watch(localControls, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>
```