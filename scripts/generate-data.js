import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const inputFile = path.join(__dirname, '..', '附件一：基础字库清单 (Top 500 High-Frequency Characters).txt')
const outputFile = path.join(__dirname, '..', 'public', 'data', 'characters.json')

const text = fs.readFileSync(inputFile, 'utf8')
const hanziList = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)

const data = hanziList.map((hanzi, index) => ({
  id: index + 1,
  hanzi
}))

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2))

console.log(`已生成 characters.json，共 ${data.length} 个汉字`)
