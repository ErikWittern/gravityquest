'use strict'

/* global localStorage */

/**
 * Names to use in local storage.
 * These are horrible, but chosen to guarantee backwards-compatability.
 */
const LEVELS = 'gravity-gun'
const MUTED = 'gravity-gun-mute'
const MENU = 'gravity-gun-menu'

const isFullyCompleted = () => {
  let stats = loadLevelStats()

  // all levels are completed:
  if (stats.length < 26) return false

  // all levels have 3 minerals:
  for (let i = 1; (i < stats.length && i < 26); i++) {
    if (stats[i] < 3) return false
  }

  return true
}

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
  if (typeof muted === 'boolean') {
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
  retrieveMenuPosition,
  isFullyCompleted
}
