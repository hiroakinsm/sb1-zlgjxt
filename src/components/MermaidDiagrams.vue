<template>
  <div class="space-y-6">
    <div v-for="(diagram, type) in diagrams" :key="type" 
         class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">{{ diagram.title }}</h3>
      <div class="bg-gray-50 p-4 rounded-lg">
        <MermaidDiagram
          :content="diagram.content"
          :title="diagram.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MermaidDiagram from './MermaidDiagram.vue'

export default {
  name: 'MermaidDiagrams',
  components: {
    MermaidDiagram
  },
  props: {
    diagrams: {
      type: Object,
      required: true
    }
  }
}
</script>