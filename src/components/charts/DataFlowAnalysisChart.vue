<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <div class="h-[calc(100%-4rem)] overflow-auto">
      <div class="flex flex-col space-y-4">
        <!-- データ定義分析 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">データ定義分析</h4>
          <div class="space-y-4">
            <!-- WORKING-STORAGE SECTION -->
            <div>
              <h5 class="text-xs font-medium text-gray-600 mb-1">WORKING-STORAGE SECTION</h5>
              <div class="space-y-1">
                <div v-for="item in data.workingStorage" 
                     :key="item.name"
                     class="flex items-center text-sm"
                     :style="{ paddingLeft: `${item.level * 12}px` }">
                  <span class="w-4 h-4 rounded-full" 
                        :class="getDataTypeColor(item.type)">
                  </span>
                  <span class="ml-2">{{ item.name }}</span>
                  <span v-if="item.redefines" 
                        class="ml-2 text-xs text-gray-500">
                    (REDEFINES {{ item.redefines }})
                  </span>
                </div>
              </div>
            </div>

            <!-- LINKAGE SECTION -->
            <div>
              <h5 class="text-xs font-medium text-gray-600 mb-1">LINKAGE SECTION</h5>
              <div class="space-y-1">
                <div v-for="item in data.linkage" 
                     :key="item.name"
                     class="flex items-center text-sm">
                  <span class="w-4 h-4 rounded-full" 
                        :class="getDataTypeColor(item.type)">
                  </span>
                  <span class="ml-2">{{ item.name }}</span>
                  <span class="ml-2 text-xs" 
                        :class="getDirectionColor(item.direction)">
                    {{ item.direction }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- データ操作分析 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">データ操作分析</h4>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="(operations, type) in data.operations" 
                 :key="type"
                 class="p-2 rounded-lg"
                 :class="getOperationTypeBackground(type)">
              <h5 class="text-xs font-medium mb-1">{{ type }}</h5>
              <div class="text-2xl font-bold">{{ operations.count }}</div>
              <div class="text-xs">操作回数</div>
            </div>
          </div>
        </div>

        <!-- データフロー可視化 -->
        <div class="border rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">データフロー可視化</h4>
          <div class="relative h-60">
            <svg class="w-full h-full">
              <g v-for="(node, index) in data.dataFlow.nodes" 
                 :key="node.id">
                <circle
                  :cx="getNodePosition(index, data.dataFlow.nodes.length).x"
                  :cy="getNodePosition(index, data.dataFlow.nodes.length).y"
                  r="20"
                  :class="getNodeColor(node.type)"
                />
                <text
                  :x="getNodePosition(index, data.dataFlow.nodes.length).x"
                  :y="getNodePosition(index, data.dataFlow.nodes.length).y"
                  class="text-xs"
                  text-anchor="middle"
                  alignment-baseline="middle"
                >
                  {{ node.name }}
                </text>
              </g>
              <g v-for="(link, index) in data.dataFlow.links" 
                 :key="index">
                <path
                  :d="getLinkPath(link, data.dataFlow.nodes)"
                  class="stroke-current"
                  :class="getLinkColor(link.type)"
                  fill="none"
                  stroke-width="2"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataFlowAnalysisChart',
  props: {
    title: {
      type: String,
      default: 'データフロー分析'
    },
    data: {
      type: Object,
      required: true,
      default: () => ({
        workingStorage: [
          { name: 'WS-GROUP-1', level: 1, type: 'group' },
          { name: 'WS-ITEM-1', level: 2, type: 'alphanumeric' },
          { name: 'WS-ITEM-2', level: 2, type: 'numeric', redefines: 'WS-ITEM-1' }
        ],
        linkage: [
          { name: 'LK-PARAM-1', type: 'alphanumeric', direction: 'input' },
          { name: 'LK-PARAM-2', type: 'numeric', direction: 'output' }
        ],
        operations: {
          'MOVE': { count: 45 },
          'COMPUTE': { count: 23 },
          'STRING': { count: 12 }
        },
        dataFlow: {
          nodes: [
            { id: 'n1', name: 'Input', type: 'input' },
            { id: 'n2', name: 'Process', type: 'process' },
            { id: 'n3', name: 'Output', type: 'output' }
          ],
          links: [
            { source: 'n1', target: 'n2', type: 'data' },
            { source: 'n2', target: 'n3', type: 'data' }
          ]
        }
      })
    }
  },
  methods: {
    getDataTypeColor(type) {
      const colors = {
        group: 'bg-blue-500',
        alphanumeric: 'bg-green-500',
        numeric: 'bg-yellow-500'
      }
      return colors[type]
    },
    getDirectionColor(direction) {
      const colors = {
        input: 'text-blue-500',
        output: 'text-green-500',
        both: 'text-purple-500'
      }
      return colors[direction]
    },
    getOperationTypeBackground(type) {
      const backgrounds = {
        'MOVE': 'bg-blue-100',
        'COMPUTE': 'bg-green-100',
        'STRING': 'bg-yellow-100'
      }
      return backgrounds[type]
    },
    getNodePosition(index, total) {
      const radius = 100
      const angle = (index / total) * 2 * Math.PI
      return {
        x: radius * Math.cos(angle) + 120,
        y: radius * Math.sin(angle) + 120
      }
    },
    getNodeColor(type) {
      const colors = {
        input: 'fill-blue-500',
        process: 'fill-green-500',
        output: 'fill-yellow-500'
      }
      return colors[type]
    },
    getLinkColor(type) {
      const colors = {
        data: 'text-gray-400',
        control: 'text-blue-400'
      }
      return colors[type]
    },
    getLinkPath(link, nodes) {
      const source = nodes.find(n => n.id === link.source)
      const target = nodes.find(n => n.id === link.target)
      const sourcePos = this.getNodePosition(
        nodes.indexOf(source),
        nodes.length
      )
      const targetPos = this.getNodePosition(
        nodes.indexOf(target),
        nodes.length
      )
      return `M ${sourcePos.x} ${sourcePos.y} L ${targetPos.x} ${targetPos.y}`
    }
  }
}
</script>