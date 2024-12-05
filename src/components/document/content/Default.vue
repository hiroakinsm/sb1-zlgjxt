```vue
<template>
  <div class="text-gray-500 italic">
    このセクションのコンテンツは利用できません
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>
```