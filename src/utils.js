
/* global localStorage */

const storeLevelResult = (level, collectedGoodies) => {
  let stats = JSON.parse(localStorage.getItem('gravityquest'))
  if (stats) {
    if (typeof stats[level] === 'undefined' ||
      collectedGoodies > stats[level]) {
      stats[level] = collectedGoodies
    }
  } else {
    stats = []
    stats[level] = collectedGoodies
  }
  localStorage.setItem('gravityquest', JSON.stringify(stats))
}

const loadLevelStats = () => {
  let stats = JSON.parse(localStorage.getItem('gravityquest'))
  if (stats && Array.isArray(stats)) {
    return stats
  }
  return []
}

const storeMuted = (muted) => {
  localStorage.setItem('gravityquest-muted', JSON.stringify(muted))
}

const loadMuted = () => {
  let muted = JSON.parse(localStorage.getItem('gravityquest-muted'))
  if (typeof mute !== 'boolean') {
    return muted
  }
  return false
}

module.exports = {
  storeLevelResult,
  loadLevelStats,
  storeMuted,
  loadMuted
}
