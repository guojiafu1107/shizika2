import { pinyin } from 'pinyin-pro'

let charactersCache = null

function enrichCharacter(c) {
  if (!c.pinyin) {
    try {
      c.pinyin = pinyin(c.hanzi, { toneType: 'symbol' })
    } catch {
      c.pinyin = ''
    }
  }
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
