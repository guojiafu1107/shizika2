<template>
  <div class="flex flex-col gap-4 py-2">
    <div class="text-center">
      <h2 class="title-kid">🎮 游戏练习</h2>
      <p class="text-sm text-gray-400 mt-1">选择正确的汉字，赢取星星！</p>
    </div>

    <div v-if="!started" class="flex justify-center py-8">
      <button class="btn-kid-orange px-10 py-4 text-2xl" @click="startQuiz">
        🚀 开始挑战
      </button>
    </div>

    <QuizCard
      v-else-if="currentQuestion && !finished"
      :question="currentQuestion"
      :current="currentIndex"
      :total="quizCount"
      :is-last="currentIndex === quizCount - 1"
      @answer="onAnswer"
      @next="onNext"
    />

    <div v-if="finished" class="card-kid flex flex-col items-center gap-4 py-8">
      <div class="text-6xl">🎉</div>
      <div class="text-2xl font-bold text-primary">练习完成！</div>
      <div class="text-lg text-gray-600">
        答对 <span class="text-kid-green font-bold">{{ correctCount }}</span> / {{ quizCount }} 题
      </div>
      <div class="text-lg text-secondary font-bold">
        ⭐ 获得 {{ earnedStars }} 颗星星
      </div>
      <div class="flex gap-3 mt-2">
        <button class="btn-kid-blue px-6 py-2" @click="restart">再来一次</button>
        <router-link to="/" class="btn-kid-green px-6 py-2">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QuizCard from '@/components/practice/QuizCard.vue'
import { loadCharacters, getRandomCharacters } from '@/utils/data.js'
import { addStars, addWrong, markMastered } from '@/utils/storage.js'

const started = ref(false)
const finished = ref(false)
const currentIndex = ref(0)
const correctCount = ref(0)
const quizCount = 10
const questions = ref([])
const currentQuestion = computed(() => questions.value[currentIndex.value] || null)
const earnedStars = computed(() => Math.floor(correctCount.value / 2))

async function startQuiz() {
  const allChars = await loadCharacters()
  if (allChars.length < 4) return
  const qs = []
  const shuffled = [...allChars].sort(() => 0.5 - Math.random())
  for (let i = 0; i < Math.min(quizCount, shuffled.length); i++) {
    const answer = shuffled[i]
    const distractors = await getRandomCharacters(3, answer.id)
    const options = [answer, ...distractors].sort(() => 0.5 - Math.random())
    qs.push({
      pinyin: answer.pinyin,
      answerId: answer.id,
      options: options.map(o => ({ id: o.id, hanzi: o.hanzi }))
    })
  }
  questions.value = qs
  started.value = true
  finished.value = false
  currentIndex.value = 0
  correctCount.value = 0
}

function onAnswer({ correct, charId }) {
  if (correct) {
    correctCount.value++
    markMastered(charId)
  } else {
    addWrong(charId)
  }
}

function onNext() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  } else {
    finished.value = true
    addStars(earnedStars.value)
  }
}

function restart() {
  started.value = false
  finished.value = false
  currentIndex.value = 0
  correctCount.value = 0
  questions.value = []
}
</script>
