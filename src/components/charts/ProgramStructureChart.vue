<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <div class="h-[calc(100%-4rem)] overflow-auto">
      <div class="flex flex-col space-y-4">
        <!-- DIVISION構造 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">DIVISION構造</h4>
          <div class="relative h-40">
            <div v-for="(value, key) in data.divisionStructure" 
                 :key="key"
                 class="absolute h-full"
                 :style="{
                   left: `${getStartPosition(key)}%`,
                   width: `${value}%`,
                   backgroundColor: getDivisionColor(key)
                 }"
            >
              <div class="absolute bottom-full mb-1 text-xs whitespace-nowrap">
                {{ key }} ({{ value }}%)
              </div>
            </div>
          </div>
        </div>

        <!-- モジュール階層 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">モジュール階層</h4>
          <div class="space-y-2">
            <div v-for="(module, index) in data.moduleHierarchy" 
                 :key="index"
                 class="flex items-center"
                 :style="{ paddingLeft: `${module.level * 20}px` }"
            >
              <div class="w-4 h-4 rounded-full" 
                   :class="getModuleTypeColor(module.type)">
              </div>
              <span class="ml-2 text-sm">{{ module.name }}</span>
            </div>
          </div>
        </div>

        <!-- 依存関係マトリクス -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">依存関係マトリクス</h4>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-2 py-1"></th>
                  <th v-for="module in data.dependencies.modules" 
                      :key="module"
                      class="px-2 py-1 text-xs font-medium text-gray-500">
                    {{ module }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in data.dependencies.matrix" :key="i">
                  <td class="px-2 py-1 text-xs font-medium text-gray-500">
                    {{ data.dependencies.modules[i] }}
                  </td>
                  <td v-for="(value, j) in row" 
                      :key="j"
                      class="px-2 py-1"
                      :class="getDependencyClass(value)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramStructureChart',
  props: {
    title: {
      type: String,
      default: 'プログラム構造分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        divisionStructure: {
          'IDENTIFICATION DIVISION': 5,
          'ENVIRONMENT DIVISION': 15,
          'DATA DIVISION': 30,
          'PROCEDURE DIVISION': 50
        },
        moduleHierarchy: [
          { name: 'メインモジュール', level: 0, type: 'main' },
          { name: 'サブモジュール1', level: 1, type: 'sub' },
          { name: 'ユーティリティ1', level: 2, type: 'utility' },
          { name: 'サブモジュール2', level: 1, type: 'sub' },
          { name: '共通モジュール1', level: 2, type: 'common' }
        ],
        dependencies: {
          modules: ['M1', 'M2', 'M3', 'M4', 'M5'],
          matrix: [
            [0, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0]
          ]
        }
      })
    }
  },
  methods: {
    getStartPosition(division) {
      const divisions = Object.keys(this.data.divisionStructure)
      const index = divisions.indexOf(division)
      return divisions
        .slice(0, index)
        .reduce((sum, key) => sum + this.data.divisionStructure[key], 0)
    },
    getDivisionColor(division) {
      const colors = {
        'IDENTIFICATION DIVISION': 'rgba(54, 162, 235, 0.5)',
        'ENVIRONMENT DIVISION': 'rgba(255, 99, 132, 0.5)',
        'DATA DIVISION': 'rgba(255, 206, 86, 0.5)',
        'PROCEDURE DIVISION': 'rgba(75, 192, 192, 0.5)'
      }
      return colors[division]
    },
    getModuleTypeColor(type) {
      const colors = {
        main: 'bg-blue-500',
        sub: 'bg-green-500',
        utility: 'bg-yellow-500',
        common: 'bg-purple-500'
      }
      return colors[type]
    },
    getDependencyClass(value) {
      return value === 1 
        ? 'bg-indigo-500' 
        : 'bg-gray-100'
    }
  }
}
</script>