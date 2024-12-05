```vue
<template>
  <div class="space-y-4">
    <table class="min-w-full divide-y divide-gray-200">
      <tbody class="divide-y divide-gray-200">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/3">
            プログラム名
          </th>
          <td class="px-4 py-3 text-sm text-gray-900">
            {{ data.name }}
          </td>
        </tr>
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 bg-gray-50">
            目的
          </th>
          <td class="px-4 py-3 text-sm text-gray-900">
            {{ data.purpose }}
          </td>
        </tr>
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 bg-gray-50">
            作成者
          </th>
          <td class="px-4 py-3 text-sm text-gray-900">
            {{ data.author || '未設定' }}
          </td>
        </tr>
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium text-gray-500 bg-gray-50">
            最終更新日
          </th>
          <td class="px-4 py-3 text-sm text-gray-900">
            {{ formatDate(data.lastModified) }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 更新履歴 -->
    <div v-if="data.updateHistory && data.updateHistory.length > 0">
      <h4 class="text-sm font-medium text-gray-900 mb-2">更新履歴</h4>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">日付</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">作成者</th>
            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500">内容</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(history, index) in data.updateHistory" :key="index">
            <td class="px-4 py-2 text-sm text-gray-900">
              {{ formatDate(history.date) }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              {{ history.author }}
            </td>
            <td class="px-4 py-2 text-sm text-gray-900">
              {{ history.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      purpose: '',
      author: '',
      lastModified: null,
      updateHistory: []
    })
  }
})

const formatDate = (date) => {
  if (!date) return '未設定'
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
```