
/* global localStorage */

/**
 * Names to use in local storage.
 * These are horrible, but chosen to guarantee backwards-compatability.
 */
const LEVELS = 'gravity-gun'
const MUTED = 'gravity-gun-mute'
const MENU = 'gravity-gun-menu'

const storeLevelResult = (level, collectedGoodies) => {
  let stats = JSON.parse(localStorage.getItem(LEVELS))
  if (stats) {
    if (typeof stats[level] === 'undefined' ||
      collectedGoodies > stats[level]) {
      stats[level] = collectedGoodies
    }
  } else {
    stats = []
    stats[level] = collectedGoodies
  }
  localStorage.setItem(LEVELS, JSON.stringify(stats))
}

const loadLevelStats = () => {
  let stats = JSON.parse(localStorage.getItem(LEVELS))
  if (stats && Array.isArray(stats)) {
    return stats
  }
  return []
}

const storeMuted = (muted) => {
  localStorage.setItem(MUTED, JSON.stringify(muted))
}

const loadMuted = () => {
  let muted = JSON.parse(localStorage.getItem(MUTED))
  if (typeof mute !== 'boolean') {
    return muted
  }
  return false
}

const storeMenuPosition = (value) => {
  if (!value) value = 0
  localStorage.setItem(MENU, value)
}

const retrieveMenuPosition = () => {
  let menuPosition = JSON.parse(localStorage.getItem(MENU))
  if (typeof menuPosition === 'number') {
    return menuPosition
  }
  return 0
}

module.exports = {
  storeLevelResult,
  loadLevelStats,
  storeMuted,
  loadMuted,
  storeMenuPosition,
  retrieveMenuPosition
}
