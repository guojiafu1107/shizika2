<template>
  <div class="flex flex-col gap-4 py-2">
    <div class="text-center">
      <h2 class="title-kid">🏆 学习进度</h2>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="card-kid flex flex-col items-center gap-1">
        <div class="text-3xl">📖</div>
        <div class="text-2xl font-bold text-primary">{{ progress.learnedIds.length }}</div>
        <div class="text-xs text-gray-400">已学汉字</div>
      </div>
      <div class="card-kid flex flex-col items-center gap-1">
        <div class="text-3xl">⭐</div>
        <div class="text-2xl font-bold text-secondary">{{ progress.stars }}</div>
        <div class="text-xs text-gray-400">累计星星</div>
      </div>
      <div class="card-kid flex flex-col items-center gap-1">
        <div class="text-3xl">✅</div>
        <div class="text-2xl font-bold text-kid-green">{{ progress.masteredIds.length }}</div>
        <div class="text-xs text-gray-400">已掌握</div>
      </div>
      <div class="card-kid flex flex-col items-center gap-1">
        <div class="text-3xl">📅</div>
        <div class="text-lg font-bold text-functional">{{ lastLearnDate }}</div>
        <div class="text-xs text-gray-400">最近学习</div>
      </div>
    </div>

    <div class="card-kid">
      <ProgressBar :percent="learnPercent" label="学习进度" />
      <div class="mt-2 text-xs text-gray-400 text-center">
        {{ progress.learnedIds.length }} / {{ total }} 字
      </div>
    </div>

    <div class="card-kid">
      <div class="font-bold text-gray-700 mb-2">易错字</div>
      <div v-if="wrongList.length === 0" class="text-sm text-gray-400 py-2">暂无错题，继续保持！</div>
      <div v-else class="flex flex-wrap gap-2">
        <router-link
          v-for="item in wrongList"
          :key="item.id"
          :to="`/learn/${item.id}`"
          class="px-3 py-1 bg-red-50 text-kid-red rounded-full text-sm font-medium"
        >
          {{ item.hanzi }} (错{{ item.count }}次)
        </router-link>
      </div>
    </div>

    <div class="card-kid">
      <div class="font-bold text-gray-700 mb-2">已掌握</div>
      <div v-if="masteredList.length === 0" class="text-sm text-gray-400 py-2">还没有掌握的字哦，快去练习吧！</div>
      <div v-else class="flex flex-wrap gap-2">
        <router-link
          v-for="item in masteredList"
          :key="item.id"
          :to="`/learn/${item.id}`"
          class="px-3 py-1 bg-green-50 text-kid-green rounded-full text-sm font-medium"
        >
          {{ item.hanzi }}
        </router-link>
      </div>
    </div>

    <button class="bg-red-400 hover:bg-red-500 text-white rounded-kid px-4 py-2 text-sm mx-auto shadow-md transition-transform active:scale-95" @click="clearAll">
      🗑️ 清空学习记录
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProgressBar from '@/components/common/ProgressBar.vue'
import { getProgress, saveProgress } from '@/utils/storage.js'
import { loadCharacters } from '@/utils/data.js'

const progress = ref(getProgress())
const total = ref(500)
const charMap = ref(new Map())

const learnPercent = computed(() => {
  if (total.value === 0) return 0
  return (progress.value.learnedIds.length / total.value) * 100
})

const lastLearnDate = computed(() => {
  if (!progress.value.lastLearnTime) return '从未'
  const d = new Date(progress.value.lastLearnTime)
  return `${d.getMonth() + 1}/${d.getDate()}`
})

const wrongList = computed(() => {
  return Object.entries(progress.value.wrongCount)
    .map(([id, count]) => ({ id: Number(id), count, hanzi: charMap.value.get(Number(id)) || '?' }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20)
})

const masteredList = computed(() => {
  return progress.value.masteredIds
    .map(id => ({ id, hanzi: charMap.value.get(id) || '?' }))
    .slice(0, 50)
})

function clearAll() {
  if (confirm('确定要清空所有学习记录吗？此操作不可恢复。')) {
    saveProgress({
      currentId: 1,
      learnedIds: [],
      masteredIds: [],
      wrongCount: {},
      stars: 0,
      lastLearnTime: new Date().toISOString()
    })
    progress.value = getProgress()
  }
}

onMounted(async () => {
  const chars = await loadCharacters()
  total.value = chars.length
  chars.forEach(c => charMap.value.set(c.id, c.hanzi))
})
</script>
