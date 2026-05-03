export function speak(text, isPinyin = false) {
  if (!window.speechSynthesis) {
    alert('您的浏览器不支持发音功能，推荐使用Chrome浏览器')
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = isPinyin ? 'zh-CN' : 'zh-CN'
  utterance.rate = 0.8
  utterance.pitch = 1.2

  window.speechSynthesis.speak(utterance)
}

export function speakSentence(text) {
  speak(text, false)
}
