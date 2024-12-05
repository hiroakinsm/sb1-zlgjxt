<template>
  <div class="min-h-screen bg-gray-100">
    <!-- ヘッダー -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">COBOLソース解析</h1>
          <nav class="flex space-x-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-50',
                'px-3 py-2 rounded-md text-sm font-medium'
              ]"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- メインコンテンツ -->
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
const navigation = [
  { name: 'ファイル選択', href: '/' },
  { name: '解析ダッシュボード', href: '/analysis' },
  { name: 'ドキュメント', href: '/document' }
]
</script>