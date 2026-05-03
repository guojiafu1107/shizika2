const STORAGE_KEY = 'pinyin_learning_progress'

export function getProgress() {
  const defaultProgress = {
    currentId: 1,
    learnedIds: [],
    masteredIds: [],
    wrongCount: {},
    stars: 0,
    lastLearnTime: new Date().toISOString()
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? { ...defaultProgress, ...JSON.parse(data) } : defaultProgress
  } catch {
    return defaultProgress
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function markLearned(id) {
  const p = getProgress()
  if (!p.learnedIds.includes(id)) {
    p.learnedIds.push(id)
  }
  if (id >= p.currentId) {
    p.currentId = id + 1
  }
  p.lastLearnTime = new Date().toISOString()
  saveProgress(p)
}

export function markMastered(id) {
  const p = getProgress()
  if (!p.masteredIds.includes(id)) {
    p.masteredIds.push(id)
  }
  saveProgress(p)
}

export function addWrong(id) {
  const p = getProgress()
  p.wrongCount[String(id)] = (p.wrongCount[String(id)] || 0) + 1
  saveProgress(p)
}

export function addStars(count) {
  const p = getProgress()
  p.stars += count
  saveProgress(p)
}
