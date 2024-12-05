<template>
  <div class="h-full bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
    <div class="h-[calc(100%-4rem)] overflow-auto">
      <div ref="mermaidContainer" class="mermaid-container">
        <pre class="mermaid">
          {{ content }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const mermaidContainer = ref(null)

const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
      curve: 'basis',
      padding: 20
    },
    sequence: {
      showSequenceNumbers: true,
      actorMargin: 50,
      messageMargin: 40
    }
  })
}

const renderDiagram = async () => {
  if (!mermaidContainer.value) return

  try {
    // Clear previous content
    const container = mermaidContainer.value
    container.innerHTML = `<pre class="mermaid">${props.content.trim()}</pre>`

    // Re-render diagram
    await mermaid.run({
      nodes: [container.querySelector('.mermaid')]
    })
  } catch (error) {
    console.error('Mermaid rendering error:', error)
  }
}

onMounted(() => {
  initializeMermaid()
  nextTick(() => renderDiagram())
})

watch(() => props.content, () => {
  nextTick(() => renderDiagram())
})
</script>

<style scoped>
.mermaid-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.mermaid) {
  width: 100%;
  text-align: center;
}

:deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>