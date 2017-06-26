'use strict'

/* global localStorage */

import Phaser from 'phaser'
import Mute from '../sprites/mute'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    // stop all eventually ongoing sounds:
    this.game.sound.stopAll()

    // add sounds:
    this.menuSelectSound = this.add.audio('menu_select', 0.5, false)
    this.music = this.add.audio('C95')

    // play menu music:
    this.music.play('', 0, 1, true)

    // add background
    this.ground = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background')
    this.ground.scale.setTo(2, 2)
    this.ground.autoScroll(-5, -10)

    // add title:
    this.title = this.add.sprite(Math.floor(this.game.width * 0.5), 60, 'logo')
    this.title.anchor.setTo(0.5, 0.5)

    // add player:
    this.player = this.add.sprite(Math.floor(this.game.width / 2) - 10, 150, 'player')
    this.player.anchor.setTo(0.5, 0.5)
    this.add.tween(this.player).to({angle: 360}, 20000, null, true, 0, Number.MAX_VALUE)

    // add subtitle:
    this.subtitle = this.add.bitmapText(Math.floor(this.game.width / 2) - 150, 220, 'font_white_24', 'Escape from space!', 24)
    this.subtitle.x = Math.floor(this.game.width / 2) - this.subtitle.textWidth * 0.5

    // space between entries:
    this.entrySpace = 50

    // space on top before level start:
    this.topSpace = 300

    // determine number of entries to show:
    this.numOfEntries = Math.floor((this.game.height - this.topSpace) / this.entrySpace)

    // current offset:
    this.offset = this.retrieveMenuPosition()

    // List of all level names for menu:
    this.textChoice = ['Intro', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6',
      'Level 7', 'Level 8', 'Level 9', 'Level 10', 'Level 11', 'Level 12', 'Level 13',
      'Level 14', 'Level 15', 'Level 16', 'Level 17', 'Level 18', 'Level 19', 'Level 20',
      'Level 21', 'Level 22', 'Level 23', 'Level 24', 'Level 25', 'Outro']

    // Add bonus levels if all 75 minerals have been collected:
    this.overallScore = 0
    for (var i = this.textChoice.length - 1; i >= 0; i--) {
      var stats = this.loadLevelStats(i)
      if (typeof stats !== 'undefined' && stats !== null) {
        this.overallScore = this.overallScore + parseInt(stats)
      }
    }

    if (this.overallScore >= 75) {
      // store that outro was viewed:
      if (typeof Storage !== 'undefined') {
        let stats = JSON.parse(localStorage.getItem('gravityquest'))
        if (stats) {
          stats[26] = 0
        } else {
          stats = []
          stats[26] = 0
        }
        localStorage.setItem('gravityquest', JSON.stringify(stats))
      }

      // add entries for bonus levels:
      this.textChoice.push('Bonus 1')
      this.textChoice.push('Bonus 2')
      this.textChoice.push('Bonus 3')
    }

    // add navigation buttons:
    this.nextLevels = this.game.add.sprite(this.game.width - 30, this.topSpace - 40 + (this.game.height - this.topSpace) * 0.5, 'triangle')
    this.nextLevels.anchor.setTo(0.5, 0.5)
    this.nextLevels.scale.setTo(2, 2)
    this.nextLevelsBtn = this.game.add.sprite(this.nextLevels.x, this.nextLevels.y, 'empty')
    this.nextLevelsBtn.inputEnabled = true
    this.nextLevelsBtn.anchor.setTo(0.5, 0.5)
    this.nextLevelsBtn.width = 60
    this.nextLevelsBtn.height = 250
    this.nextLevelsBtn.events.onInputDown.add(function () {
      if (this.offset + this.numOfEntries < this.textChoice.length && this.loadLevelStats(this.offset + this.numOfEntries - 1) >= 0 && this.loadLevelStats(this.offset + this.numOfEntries - 1) !== null) {
        this.offset += this.numOfEntries
        this.showLevels()
        this.menuSelectSound.play()
      }
    }, this)

    this.previousLevels = this.game.add.sprite(30, this.topSpace - 40 + (this.game.height - this.topSpace) * 0.5, 'triangle')
    this.previousLevels.rotation = 3.14
    this.previousLevels.anchor.setTo(0.5, 0.5)
    this.previousLevels.scale.setTo(2, 2)
    this.previousLevelsBtn = this.game.add.sprite(this.previousLevels.x, this.previousLevels.y, 'empty')
    this.previousLevelsBtn.inputEnabled = true
    this.previousLevelsBtn.anchor.setTo(0.5, 0.5)
    this.previousLevelsBtn.width = 60
    this.previousLevelsBtn.height = 250
    this.previousLevelsBtn.events.onInputDown.add(function () {
      if (this.offset > 0) {
        this.offset = Math.max(this.offset - this.numOfEntries, 0)
        this.showLevels()
        this.menuSelectSound.play()
      }
    }, this)

    // add mute button:
    this.mute = new Mute({
      game: this,
      x: this.world.width - 25,
      y: this.world.height - 15,
      asset: 'mute'
    })
    this.add.existing(this.mute)

    // show initial levels:
    this.showLevels()

    // // fade in:
    // this.fadeIn()
  }

  render () {}

  goToLevel (levelBtn, pointer) {
    this.menuSelectSound.play()
    this.game.time.events.add(Phaser.Timer.SECOND * 0.1, () => {
      if (levelBtn.level === 0) {
        this.game.state.start('Intro')
      } else if (this.textChoice[levelBtn.level] === 'Outro') { // levelBtn.level === this.textChoice.length - 1){
        this.game.state.start('Outro')
      } else {
        this.game.currentLevel = levelBtn.level
        this.game.state.start('Play')
      }
    })
  }

  showLevels () {
    var statsBtn = this.loadLevelStats(this.offset + this.numOfEntries - 1)
    if (!(statsBtn >= 0 && statsBtn !== null && this.offset + this.numOfEntries <= 29)) {
      this.nextLevelsBtn.visible = false
      this.nextLevels.visible = false
    } else {
      this.nextLevelsBtn.visible = true
      this.nextLevels.visible = true
    }
    if (this.offset === 0) {
      this.previousLevelsBtn.visible = false
      this.previousLevels.visible = false
    } else {
      this.previousLevelsBtn.visible = true
      this.previousLevels.visible = true
    }

    // store current menu position:
    this.storeMenuPosition(this.offset)

    // group to hold level stats:
    if (typeof this.levelStats !== 'undefined') {
      this.levelStats.destroy()
    }
    this.levelStats = this.add.group()

    var lastLevel = Math.min(this.numOfEntries + this.offset, this.textChoice.length)
    for (var i = this.offset; i < lastLevel; i++) {
      if (i === 0) {
        // show "Intro:"
        var levelText = this.game.add.bitmapText(70, this.topSpace + (i - this.offset) * this.entrySpace, 'font_white_16', this.textChoice[i], 16)
        this.levelStats.add(levelText)

        // create intro btn:
        var levelBtn = this.add.sprite(70, this.topSpace - 20 + (i - this.offset) * this.entrySpace, 'empty')
        levelBtn.height = this.entrySpace
        levelBtn.width = 180
        levelBtn.level = i
        levelBtn.inputEnabled = true
        levelBtn.events.onInputDown.add(this.goToLevel, this)
        this.levelStats.add(levelBtn)
      } else {
        // show title and button, if previous level is finished:
        var statsPrev = this.loadLevelStats(i - 1)
        if (typeof statsPrev !== 'undefined' && statsPrev !== null) {
          // create level names:
          var levelText = this.game.add.bitmapText(70, this.topSpace + (i - this.offset) * this.entrySpace, 'font_white_16', this.textChoice[i], 16)
          this.levelStats.add(levelText)

          // create level btn:
          var levelBtn = game.add.sprite(70, this.topSpace - 20 + (i - this.offset) * this.entrySpace, 'empty')
          levelBtn.height = this.entrySpace
          levelBtn.width = 180
          levelBtn.level = i
          levelBtn.inputEnabled = true
          levelBtn.events.onInputDown.add(this.goToLevel, this)
          this.levelStats.add(levelBtn)
        }
        // show stats, if available:
        var stats = this.loadLevelStats(i)
        if (typeof stats !== 'undefined' && stats !== null && i !== 26) {
          this.showLevelStats(stats, this.topSpace + (i - this.offset) * this.entrySpace)
        }
      }
    }
  }

  showLevelStats (stats, y) {
    if (stats <= 3) {
      // add borders around collected goodies:
      for (var count = 0; count < 3; count++) {
        var goodyBorder = game.add.sprite(Math.floor(170 + (30 * count)), y + 5, 'goody_border')
        goodyBorder.anchor.setTo(0.5, 0.5)
        goodyBorder.scale.setTo(2, 2)
        goodyBorder.fixedToCamera = true
        this.levelStats.add(goodyBorder)
      }

      // add indication of collected goodies:
      for (var count = 0; count < stats; count++) {
        var goody = game.add.sprite(Math.floor(170 + (30 * count)), y + 5, 'goody')
        goody.anchor.setTo(0.5, 0.5)
        goody.scale.setTo(0, 0)
        goody.fixedToCamera = true
        game.add.tween(goody.scale).to({x: 2.0, y: 2.0}, 500, Phaser.Easing.Bounce.Out, true, 0, false).delay(100 * (count + 1)).start()
        this.levelStats.add(goody)
      }
    } else {
      // add indication that more than 3 minerals have been collected:
      var goodiesText = game.add.bitmapText(160, y, 'font_white_16', stats + ' / 40', 16)
      goodiesText.fixedToCamera = true
      this.levelStats.add(goodiesText)
    }
  }

  loadLevelStats (level) {
    if (typeof Storage !== 'undefined') {
      var stats = JSON.parse(localStorage.getItem('gravity-gun'))
      if (stats !== null && typeof stats !== 'undefined') {
        return stats[level]
      }
      return null
    }
  }

  storeMenuPosition (value) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('gravityquest-menu', value)
    }
  }

  retrieveMenuPosition () {
    if (typeof Storage !== 'undefined') {
      var position = JSON.parse(localStorage.getItem('gravityquest-menu'))
      if (position !== null && typeof position !== 'undefined') {
        return position
      }
    }
    return 0
  }

  fadeIn () {
    // overlay:
    var overlay = this.add.graphics(0, 0)
    overlay.beginFill(0x000000, 1)
    overlay.drawRect(0, 0, this.world.width, this.world.height)
    overlay.alpha = 1
    overlay.endFill()
    var titleTween = this.add.tween(overlay).to({alpha: 0}, 800, 0).start()
  }
}
