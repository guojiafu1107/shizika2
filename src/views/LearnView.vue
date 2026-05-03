<template>
  <div class="flex flex-col gap-4 py-2">
    <div class="flex items-center justify-between">
      <button class="btn-kid-blue px-4 py-2" @click="prev" :disabled="currentId <= 1">⬅️ 上一个</button>
      <div class="text-center">
        <div class="text-xs text-gray-400">第 {{ currentId }} / {{ total }} 字</div>
        <div class="text-sm font-bold text-primary">{{ char?.hanzi }}</div>
      </div>
      <button class="btn-kid-blue px-4 py-2" @click="next" :disabled="currentId >= total">下一个 ➡️</button>
    </div>

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

async function loadChar(id) {
  char.value = await getCharacterById(id)
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
