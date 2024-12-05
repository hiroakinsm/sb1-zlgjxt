<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">
        目次の表示
      </label>
      <div class="mt-1">
        <input
          type="checkbox"
          v-model="localSettings.showTableOfContents"
          class="h-4 w-4 text-indigo-600 rounded"
        >
        <span class="ml-2 text-sm text-gray-600">目次を含める</span>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        ダイアグラムの表示
      </label>
      <div class="mt-1">
        <input
          type="checkbox"
          v-model="localSettings.showDiagrams"
          class="h-4 w-4 text-indigo-600 rounded"
        >
        <span class="ml-2 text-sm text-gray-600">ダイアグラムを含める</span>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        チャートの表示
      </label>
      <div class="mt-1">
        <input
          type="checkbox"
          v-model="localSettings.includeCharts"
          class="h-4 w-4 text-indigo-600 rounded"
        >
        <span class="ml-2 text-sm text-gray-600">チャートを含める</span>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        ページ番号
      </label>
      <div class="mt-1">
        <input
          type="checkbox"
          v-model="localSettings.pageNumbers"
          class="h-4 w-4 text-indigo-600 rounded"
        >
        <span class="ml-2 text-sm text-gray-600">ページ番号を表示</span>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">
        ヘッダー/フッター
      </label>
      <div class="mt-1">
        <input
          type="checkbox"
          v-model="localSettings.headerFooter"
          class="h-4 w-4 text-indigo-600 rounded"
        >
        <span class="ml-2 text-sm text-gray-600">ヘッダーとフッターを表示</span>
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

const localSettings = ref({ ...props.modelValue })

watch(localSettings, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>