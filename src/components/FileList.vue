<template>
  <div class="space-y-6">
    <!-- 解析済みファイル -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">解析済みファイル</h2>
      <div class="space-y-2">
        <div v-for="file in analyzedFiles" 
             :key="file.name"
             class="flex items-center justify-between p-2 rounded bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
             @click="$emit('select-file', file)">
          <div class="flex items-center space-x-2">
            <span class="text-green-600">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </span>
            <span class="text-sm text-gray-900">{{ file.name }}</span>
          </div>
          <span class="text-xs text-gray-500">解析済み</span>
        </div>
      </div>
    </div>

    <!-- 未解析ファイル -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">未解析ファイル</h2>
      <div class="space-y-2">
        <div v-for="file in unanalyzedFiles" 
             :key="file.name"
             class="flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors">
          <span class="text-sm text-gray-900">{{ file.name }}</span>
          <button 
            class="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            @click="$emit('analyze-file', file)"
          >
            解析開始
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileList',
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  emits: ['select-file', 'analyze-file'],
  computed: {
    analyzedFiles() {
      return this.files.filter(file => file.analyzed)
    },
    unanalyzedFiles() {
      return this.files.filter(file => !file.analyzed)
    }
  }
}
</script>