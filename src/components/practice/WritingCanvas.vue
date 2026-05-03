<template>
  <div class="card-kid flex flex-col items-center gap-3">
    <div class="text-sm font-bold text-gray-600">书写练习：{{ hanzi }}</div>
    <div class="relative">
      <canvas
        ref="canvas"
        :width="canvasSize"
        :height="canvasSize"
        class="bg-white rounded-xl border-2 border-gray-200 touch-none"
        @mousedown="startDraw"
        @mousemove="draw"
        @mouseup="endDraw"
        @mouseleave="endDraw"
        @touchstart.prevent="handleTouchStart"
        @touchmove.prevent="handleTouchMove"
        @touchend="endDraw"
      />
      <div
        v-if="showHint"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <span class="text-gray-200 font-kid text-[10rem] select-none">{{ hanzi }}</span>
      </div>
    </div>
    <div class="flex gap-3">
      <button class="btn-kid-blue px-4 py-2 text-sm" @click="toggleHint">
        {{ showHint ? '隐藏描红' : '显示描红' }}
      </button>
      <button class="btn-kid-orange px-4 py-2 text-sm" @click="clearCanvas">
        🧹 擦除
      </button>
      <button class="btn-kid-green px-4 py-2 text-sm" @click="checkWriting">
        ✅ 完成
      </button>
    </div>
    <div v-if="feedback" class="text-lg font-bold animate-pop"
      :class="feedback.ok ? 'text-kid-green' : 'text-kid-red'"
    >
      {{ feedback.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  hanzi: { type: String, default: '一' }
})

const canvasSize = 320
const canvas = ref(null)
const ctx = ref(null)
const isDrawing = ref(false)
const lastPos = ref({ x: 0, y: 0 })
const showHint = ref(true)
const feedback = ref(null)

onMounted(() => {
  ctx.value = canvas.value.getContext('2d')
  drawGrid()
})

watch(() => props.hanzi, () => {
  clearCanvas()
})

function drawGrid() {
  const c = ctx.value
  const s = canvasSize
  c.clearRect(0, 0, s, s)
  c.strokeStyle = '#f0f0f0'
  c.lineWidth = 2
  c.strokeRect(0, 0, s, s)
  c.beginPath()
  c.moveTo(s / 2, 0)
  c.lineTo(s / 2, s)
  c.moveTo(0, s / 2)
  c.lineTo(s, s / 2)
  c.stroke()
  // dashed cross
  c.setLineDash([8, 8])
  c.beginPath()
  c.moveTo(0, 0)
  c.lineTo(s, s)
  c.moveTo(s, 0)
  c.lineTo(0, s)
  c.stroke()
  c.setLineDash([])
}

function getPos(e) {
  const rect = canvas.value.getBoundingClientRect()
  const clientX = e.touches ? e.touches[0].clientX : e.clientX
  const clientY = e.touches ? e.touches[0].clientY : e.clientY
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  }
}

function startDraw(e) {
  isDrawing.value = true
  lastPos.value = getPos(e)
}

function draw(e) {
  if (!isDrawing.value) return
  const pos = getPos(e)
  const c = ctx.value
  c.strokeStyle = '#ff4d4f'
  c.lineWidth = 6
  c.lineCap = 'round'
  c.lineJoin = 'round'
  c.beginPath()
  c.moveTo(lastPos.value.x, lastPos.value.y)
  c.lineTo(pos.x, pos.y)
  c.stroke()
  lastPos.value = pos
}

function endDraw() {
  isDrawing.value = false
}

function handleTouchStart(e) {
  startDraw(e)
}

function handleTouchMove(e) {
  draw(e)
}

function clearCanvas() {
  drawGrid()
  feedback.value = null
}

function toggleHint() {
  showHint.value = !showHint.value
}

function checkWriting() {
  // Simplified check: ensure user has drawn something
  const imageData = ctx.value.getImageData(0, 0, canvasSize, canvasSize).data
  let drawnPixels = 0
  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i] > 200 && imageData[i + 3] > 0) drawnPixels++
  }
  if (drawnPixels > 100) {
    feedback.value = { ok: true, text: '书写完成！继续加油！' }
  } else {
    feedback.value = { ok: false, text: '写得有点少哦，再写一次吧' }
  }
}
</script>
