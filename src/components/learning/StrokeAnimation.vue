<template>
  <div class="card-kid flex flex-col items-center gap-3">
    <div class="text-sm font-bold text-gray-600">笔顺演示</div>
    <div ref="writerContainer" class="w-64 h-64 sm:w-80 sm:h-80 bg-white rounded-xl border-2 border-gray-100 relative">
      <!-- hanzi-writer 挂载点 -->
    </div>
    <div class="flex gap-3">
      <button class="btn-kid-blue px-4 py-2 text-sm" @click="playAnimation">
        ▶️ 播放笔顺
      </button>
      <button class="btn-kid-orange px-4 py-2 text-sm" @click="resetAnimation">
        🔄 重置
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import HanziWriter from 'hanzi-writer'

const props = defineProps({
  hanzi: { type: String, required: true }
})

const writerContainer = ref(null)
let writer = null

async function initWriter() {
  if (!writerContainer.value || !props.hanzi) return
  // 等待 DOM 更新完成，确保容器已清空/重建
  await nextTick()

  if (writer) {
    writer.cancelAnimation()
    writer = null
  }
  writerContainer.value.innerHTML = ''

  try {
    writer = HanziWriter.create(writerContainer.value, props.hanzi, {
      width: 320,
      height: 320,
      padding: 10,
      strokeAnimationSpeed: 1,
      strokeHighlightSpeed: 2,
      strokeFadeDuration: 400,
      strokeColor: '#333',
      radicalColor: '#4CAF50',
      outlineColor: '#e0e0e0',
      drawingColor: '#ff4d4f',
      showCharacter: false,
      showOutline: true,
      showHintAfterMisses: 3,
      highlightOnComplete: true,
      highlightColor: '#4CAF50'
    })
    // 新字创建后自动播放笔顺
    writer.animateCharacter()
  } catch (e) {
    console.error('HanziWriter init failed:', e)
    writerContainer.value.innerHTML = `<div class="flex items-center justify-center h-full text-gray-400">笔顺数据加载中...</div>`
  }
}

function playAnimation() {
  if (writer) {
    writer.animateCharacter()
  }
}

function resetAnimation() {
  if (writer) {
    writer.cancelAnimation()
    writer.hideCharacter()
    setTimeout(() => writer.animateCharacter(), 100)
  }
}

onMounted(initWriter)
watch(() => props.hanzi, () => initWriter())
onUnmounted(() => { writer = null })
</script>
