<template>
  <div class="flex flex-col gap-4 py-2">
    <div class="flex items-center justify-between gap-2">
      <button class="btn-kid-blue px-4 py-2 text-sm" @click="prev" :disabled="currentId <= 1">⬅️ 上一个</button>

      <div class="text-center flex items-center gap-1">
        <input
          ref="jumpInput"
          v-model="jumpValue"
          type="number"
          :min="1"
          :max="total"
          class="w-16 text-center text-lg font-bold text-primary bg-primary/10 rounded-lg border-0 outline-none focus:ring-2 focus:ring-primary"
          @keyup.enter="jumpTo"
          @blur="jumpTo"
        />
        <span class="text-xs text-gray-400">/ {{ total }}</span>
      </div>

      <button class="btn-kid-blue px-4 py-2 text-sm" @click="next" :disabled="currentId >= total">下一个 ➡️</button>
    </div>
    <div class="text-center text-sm font-bold text-primary">{{ char?.hanzi }} · {{ char?.pinyin }}</div>

    <CharacterCard v-if="char" :char="char" />
    <StrokeAnimation v-if="char" :key="char.hanzi" :hanzi="char.hanzi" />
    <WritingCanvas v-if="char" :hanzi="char.hanzi" />

    <div class="flex justify-center gap-4 py-2">
      <button class="btn-kid-green px-6 py-3 text-lg" @click="markLearnedAndNext">
        ✅ 学会了，下一个
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CharacterCard from '@/components/learning/CharacterCard.vue'
import StrokeAnimation from '@/components/learning/StrokeAnimation.vue'
import WritingCanvas from '@/components/practice/WritingCanvas.vue'
import { getCharacterById, getTotalCount } from '@/utils/data.js'
import { markLearned } from '@/utils/storage.js'

const route = useRoute()
const router = useRouter()

const currentId = ref(1)
const total = ref(500)
const char = ref(null)
const jumpValue = ref('')
const jumpInput = ref(null)

async function loadChar(id) {
  char.value = await getCharacterById(id)
  jumpValue.value = String(id)
}

function jumpTo() {
  let id = parseInt(jumpValue.value)
  if (isNaN(id) || id < 1) id = 1
  if (id > total.value) id = total.value
  if (id !== currentId.value) {
    currentId.value = id
    router.replace(`/learn/${id}`)
  }
  jumpValue.value = String(id)
}

function prev() {
  if (currentId.value > 1) {
    currentId.value--
    router.replace(`/learn/${currentId.value}`)
  }
}

function next() {
  if (currentId.value < total.value) {
    currentId.value++
    router.replace(`/learn/${currentId.value}`)
  }
}

function markLearnedAndNext() {
  markLearned(currentId.value)
  if (currentId.value < total.value) {
    next()
  }
}

onMounted(async () => {
  total.value = await getTotalCount()
  const id = parseInt(route.params.id) || 1
  currentId.value = Math.max(1, Math.min(id, total.value))
  await loadChar(currentId.value)
})

watch(() => route.params.id, async (newId) => {
  const id = parseInt(newId) || 1
  currentId.value = Math.max(1, Math.min(id, total.value))
  await loadChar(currentId.value)
})
</script>
