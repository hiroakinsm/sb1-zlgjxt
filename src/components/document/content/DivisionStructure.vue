```vue
<template>
  <div class="space-y-6">
    <!-- DIVISION構成比 -->
    <div>
      <h4 class="text-sm font-medium text-gray-900 mb-3">DIVISION構成比</h4>
      <div class="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <div v-for="(division, index) in divisions" :key="division.id"
             class="absolute top-0 h-full"
             :class="division.color"
             :style="{ 
               width: `${division.ratio}%`,
               left: `${getDivisionOffset(index)}%`
             }">
        </div>
      </div>
      <div class="mt-2 grid grid-cols-4 gap-4">
        <div v-for="division in divisions" :key="division.id"
             class="text-center">
          <div class="text-xs font-medium text-gray-900">
            {{ division.name }}
          </div>
          <div class="text-xs text-gray-500">
            {{ division.ratio }}%
          </div>
        </div>
      </div>
    </div>

    <!-- DIVISION詳細 -->
    <div class="space-y-4">
      <div v-for="division in divisions" :key="division.id"
           class="bg-gray-50 rounded-lg p-4">
        <h5 class="text-sm font-medium text-gray-900 mb-2">
          {{ division.name }}
        </h5>
        <dl class="grid grid-cols-2 gap-4">
          <div>
            <dt class="text-xs font-medium text-gray-500">行数</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ formatNumber(division.lines) }}行
            </dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-gray-500">構成比</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ division.ratio }}%
            </dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-gray-500">セクション数</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ division.sections }}
            </dd>
          </div>
          <div>
            <dt class="text-xs font-medium text-gray-500">複雑度</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ division.complexity }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      identification: 0,
      environment: 0,
      data: 0,
      procedure: 0
    })
  }
})

const divisions = [
  {
    id: 'identification',
    name: 'IDENTIFICATION',
    ratio: props.data.identification,
    lines: 100, // 実際のデータから計算
    sections: 1,
    complexity: 'Low',
    color: 'bg-blue-500'
  },
  {
    id: 'environment',
    name: 'ENVIRONMENT',
    ratio: props.data.environment,
    lines: 200,
    sections: 2,
    complexity: 'Low',
    color: 'bg-green-500'
  },
  {
    id: 'data',
    name: 'DATA',
    ratio: props.data.data,
    lines: 500,
    sections: 3,
    complexity: 'Medium',
    color: 'bg-yellow-500'
  },
  {
    id: 'procedure',
    name: 'PROCEDURE',
    ratio: props.data.procedure,
    lines: 1000,
    sections: 5,
    complexity: 'High',
    color: 'bg-red-500'
  }
]

const getDivisionOffset = (index) => {
  return divisions
    .slice(0, index)
    .reduce((sum, division) => sum + division.ratio, 0)
}

const formatNumber = (num) => {
  return num.toLocaleString('ja-JP')
}
</script>
```