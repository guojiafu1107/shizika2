<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-600">{{ label }}</span>
      <span class="text-sm font-bold text-primary">{{ Math.round(percent) }}%</span>
    </div>
    <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        class="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
        :style="{ width: percent + '%' }"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  percent: { type: Number, default: 0 },
  label: { type: String, default: '进度' }
})
</script>
