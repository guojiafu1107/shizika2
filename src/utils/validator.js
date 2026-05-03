export function normalizeStroke(points) {
  if (!points || points.length < 2) return []
  const minX = Math.min(...points.map(p => p.x))
  const minY = Math.min(...points.map(p => p.y))
  const maxX = Math.max(...points.map(p => p.x))
  const maxY = Math.max(...points.map(p => p.y))
  const w = maxX - minX || 1
  const h = maxY - minY || 1
  const scale = Math.max(w, h)
  return points.map(p => ({
    x: (p.x - minX) / scale,
    y: (p.y - minY) / scale
  }))
}

export function compareStrokes(userPoints, templatePoints, tolerance = 0.3) {
  if (!userPoints || userPoints.length < 5) return false
  const u = normalizeStroke(userPoints)
  const t = normalizeStroke(templatePoints)
  if (u.length < 3 || t.length < 3) return false

  let matched = 0
  const step = Math.max(1, Math.floor(u.length / t.length))
  for (let i = 0; i < t.length; i++) {
    const ui = Math.min(i * step, u.length - 1)
    const dx = Math.abs(u[ui].x - t[i].x)
    const dy = Math.abs(u[ui].y - t[i].y)
    if (dx < tolerance && dy < tolerance) matched++
  }
  return matched / t.length >= 0.5
}
