<template>
  <div class="card-kid flex flex-col items-center gap-4">
    <div class="flex items-center justify-center w-full gap-4">
      <div class="flex flex-col items-center">
        <div class="hanzi-kid">{{ char.hanzi }}</div>
        <div class="pinyin-kid">{{ char.pinyin }}</div>
      </div>
      <button
        class="w-14 h-14 rounded-full bg-functional text-white text-2xl shadow-md flex items-center justify-center active:scale-90 transition-transform"
        @click="speak(char.hanzi)"
        aria-label="朗读汉字"
      >
        🔊
      </button>
    </div>
  </div>
</template>

<script setup>
import { speak } from '@/utils/speech.js'

defineProps({
  char: { type: Object, required: true }
})
</script>
