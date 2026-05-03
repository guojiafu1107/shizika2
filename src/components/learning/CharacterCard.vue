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

    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="bg-orange-50 rounded-xl p-3">
        <div class="text-xs text-orange-600 font-bold mb-1">组词</div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="word in char.words"
            :key="word"
            class="px-3 py-1 bg-white rounded-full text-orange-700 text-sm font-medium shadow-sm cursor-pointer active:scale-95 transition-transform"
            @click="speak(word)"
          >
            {{ word }}
          </span>
        </div>
      </div>
      <div class="bg-blue-50 rounded-xl p-3">
        <div class="text-xs text-blue-600 font-bold mb-1">例句</div>
        <p
          class="text-blue-800 text-sm leading-relaxed cursor-pointer"
          @click="speak(char.sentence)"
        >
          {{ char.sentence }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-4 text-sm text-gray-500">
      <span>笔画：{{ char.strokeCount }}画</span>
      <span v-if="char.structure">结构：{{ char.structure }}</span>
    </div>
  </div>
</template>

<script setup>
import { speak } from '@/utils/speech.js'

defineProps({
  char: { type: Object, required: true }
})
</script>
