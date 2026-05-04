import { pinyin } from 'pinyin-pro'
import stroke from 'chinese-stroke'

let charactersCache = null

function enrichCharacter(c) {
  if (!c.pinyin) {
    try {
      c.pinyin = pinyin(c.hanzi, { toneType: 'symbol' })
    } catch {
      c.pinyin = ''
    }
  }
  // 笔画数：使用 chinese-stroke 查询
  if (!c.strokeCount || c.strokeCount === 0) {
    try {
      const n = stroke.get(c.hanzi)
      c.strokeCount = isNaN(n) ? 0 : n
    } catch {
      c.strokeCount = 0
    }
  }
  if (!c.sentence) {
    c.sentence = `我会写${c.hanzi}字。`
  }
  if (!c.words) c.words = []
  if (!c.strokes) c.strokes = []
  return c
}

export async function loadCharacters() {
  if (charactersCache) return charactersCache
  const response = await fetch('./data/characters.json')
  const raw = await response.json()
  charactersCache = raw.map(enrichCharacter)
  return charactersCache
}

export async function getCharacterById(id) {
  const chars = await loadCharacters()
  return chars.find(c => c.id === id) || null
}

export async function getCharactersRange(start, end) {
  const chars = await loadCharacters()
  return chars.filter(c => c.id >= start && c.id <= end)
}

export async function getTotalCount() {
  const chars = await loadCharacters()
  return chars.length
}

export async function getRandomCharacters(count, excludeId = null) {
  const chars = await loadCharacters()
  const pool = chars.filter(c => c.id !== excludeId)
  const shuffled = pool.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
