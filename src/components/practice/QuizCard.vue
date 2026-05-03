<template>
  <div class="card-kid flex flex-col items-center gap-6">
    <div class="text-sm font-bold text-gray-500">第 {{ current + 1 }} / {{ total }} 题</div>

    <div class="flex flex-col items-center gap-2">
      <div class="text-lg text-gray-600">请选出读音为</div>
      <div class="pinyin-kid text-secondary">{{ question.pinyin }}</div>
      <div class="text-lg text-gray-600">的汉字</div>
    </div>

    <div class="grid grid-cols-2 gap-4 w-full">
      <button
        v-for="opt in question.options"
        :key="opt.id"
        class="h-24 rounded-2xl border-2 text-4xl font-kai shadow-sm transition-all active:scale-95 flex items-center justify-center"
        :class="getOptionClass(opt)"
        :disabled="answered"
        @click="selectOption(opt)"
      >
        {{ opt.hanzi }}
      </button>
    </div>

    <div v-if="answered" class="flex items-center gap-2 text-lg font-bold animate-pop"
      :class="isCorrect ? 'text-kid-green' : 'text-kid-red'"
    >
      <span>{{ isCorrect ? '✅ 答对啦！真棒！' : '❌ 再试一次哦' }}</span>
    </div>

    <button
      v-if="answered"
      class="btn-kid-green px-8 py-3 text-lg"
      @click="next"
    >
      {{ isLast ? '完成练习' : '下一题' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  current: { type: Number, default: 0 },
  total: { type: Number, default: 1 },
  isLast: { type: Boolean, default: false }
})

const emit = defineEmits(['answer', 'next'])

const answered = ref(false)
const selected = ref(null)
const isCorrect = computed(() => selected.value?.id === props.question.answerId)

function selectOption(opt) {
  if (answered.value) return
  selected.value = opt
  answered.value = true
  emit('answer', { correct: isCorrect.value, charId: opt.id })
}

function next() {
  answered.value = false
  selected.value = null
  emit('next')
}

function getOptionClass(opt) {
  if (!answered.value) return 'bg-white border-gray-200 hover:border-primary hover:bg-green-50'
  if (opt.id === props.question.answerId) return 'bg-green-100 border-kid-green text-gray-900'
  if (opt.id === selected.value?.id && !isCorrect.value) return 'bg-red-100 border-kid-red text-gray-900 animate-shake'
  return 'bg-white border-gray-200 opacity-60'
}
</script>
