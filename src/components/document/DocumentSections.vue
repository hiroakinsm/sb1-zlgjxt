```vue
<template>
  <div class="space-y-6">
    <!-- セクション選択 -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">セクション選択</h3>
      <div class="space-y-4">
        <div v-for="section in sections" :key="section.id"
             class="flex items-center justify-between">
          <div>
            <label class="text-sm font-medium text-gray-700">{{ section.title }}</label>
            <p class="text-xs text-gray-500">{{ section.description }}</p>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="selectedSections[section.id]"
              class="h-4 w-4 text-indigo-600 rounded border-gray-300"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- セクション順序 -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">セクション順序</h3>
      <div class="space-y-2">
        <div v-for="(section, index) in orderedSections" :key="section.id"
             class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span class="text-sm font-medium text-gray-900">{{ section.title }}</span>
          <div class="flex space-x-2">
            <button
              @click="moveSection(index, -1)"
              :disabled="index === 0"
              class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              @click="moveSection(index, 1)"
              :disabled="index === orderedSections.length - 1"
              class="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:sections'])

const selectedSections = ref(
  Object.fromEntries(props.sections.map(section => [section.id, true]))
)

const orderedSections = computed(() => {
  return props.sections.filter(section => selectedSections.value[section.id])
})

const moveSection = (index, direction) => {
  const newIndex = index + direction
  if (newIndex < 0 || newIndex >= orderedSections.value.length) return
  
  const sections = [...orderedSections.value]
  const temp = sections[index]
  sections[index] = sections[newIndex]
  sections[newIndex] = temp
  
  emit('update:sections', sections)
}
</script>
```