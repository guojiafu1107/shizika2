<template>
  <div class="card-kid flex flex-col items-center gap-6 py-8 px-6">
    <div class="flex flex-col items-center gap-4">
      <div class="hanzi-kid text-9xl">{{ char.hanzi }}</div>
      <div class="pinyin-kid text-4xl">{{ char.pinyin }}</div>
      <button
        class="w-20 h-20 rounded-full bg-functional text-white text-3xl shadow-lg flex items-center justify-center active:scale-90 transition-transform mt-2"
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
