<template>
  <div class="flex flex-col items-center gap-6 py-6">
    <div class="text-center">
      <h1 class="text-3xl sm:text-4xl font-bold text-primary mb-2">📚 拼音汉字学习卡</h1>
      <p class="text-gray-500">快乐识字，轻松衔接小学</p>
    </div>

    <div class="w-full max-w-md bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
      <div class="text-6xl">🌟</div>
      <div class="text-lg font-bold text-gray-700">继续学习</div>
      <ProgressBar :percent="progressPercent" label="整体进度" />
      <div class="text-sm text-gray-500">
        已学 <span class="font-bold text-primary">{{ progress.learnedIds.length }}</span> 字 / 共 {{ total }} 字
      </div>
      <router-link
        :to="`/learn/${nextId}`"
        class="btn-kid-green px-8 py-4 text-xl w-full"
      >
        {{ progress.learnedIds.length === 0 ? '开始学习' : '继续学习' }}
      </router-link>
    </div>

    <div class="w-full max-w-md grid grid-cols-2 gap-4">
      <router-link to="/practice" class="card-kid flex flex-col items-center gap-2 hover:shadow-lg transition-shadow">
        <span class="text-4xl">🎮</span>
        <span class="font-bold text-gray-700">游戏练习</span>
        <span class="text-xs text-gray-400">巩固记忆</span>
      </router-link>
      <router-link to="/profile" class="card-kid flex flex-col items-center gap-2 hover:shadow-lg transition-shadow">
        <span class="text-4xl">🏆</span>
        <span class="font-bold text-gray-700">学习进度</span>
        <span class="text-xs text-gray-400">查看成就</span>
      </router-link>
    </div>

    <div class="w-full max-w-md card-kid">
      <div class="font-bold text-gray-700 mb-3">今日推荐</div>
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-3xl font-kai text-primary">
          {{ dailyChar.hanzi }}
        </div>
        <div>
          <div class="text-lg font-bold text-gray-800">{{ dailyChar.hanzi }} <span class="text-functional text-base">{{ dailyChar.pinyin }}</span></div>
          <div class="text-sm text-gray-500">{{ dailyChar.sentence }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { getProgress } from '@/utils/storage.js'
import { loadCharacters, getCharacterById } from '@/utils/data.js'

const total = ref(500)
const progress = ref(getProgress())
const dailyChar = ref({ hanzi: '一', pinyin: 'yī', sentence: '我会写一字。' })

const nextId = computed(() => {
  return progress.value.currentId || 1
})

const progressPercent = computed(() => {
  if (total.value === 0) return 0
  return (progress.value.learnedIds.length / total.value) * 100
})

onMounted(async () => {
  const chars = await loadCharacters()
  total.value = chars.length
  const today = new Date().getDate()
  const dc = await getCharacterById((today % total.value) + 1)
  if (dc) dailyChar.value = dc
})
</script>
