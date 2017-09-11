'use strict'

import Phaser from 'phaser'
import Mute from '../sprites/mute'
import Utils from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    // stop all eventually ongoing sounds:
    this.game.sound.stopAll()

    // add menu sounds:
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

    // load level stats:
    this.levelStats = Utils.loadLevelStats()

    // space between entries:
    this.entrySpace = 50

    // space on top before level start:
    this.topSpace = 300

    // determine number of entries to show:
    this.numOfEntries = Math.floor((this.game.height - this.topSpace) / this.entrySpace)

    // current offset:
    this.offset = Utils.retrieveMenuPosition()

    // List of all level names for menu:
    this.textChoice = ['Intro', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6',
      'Level 7', 'Level 8', 'Level 9', 'Level 10', 'Level 11', 'Level 12', 'Level 13',
      'Level 14', 'Level 15', 'Level 16', 'Level 17', 'Level 18', 'Level 19', 'Level 20',
      'Level 21', 'Level 22', 'Level 23', 'Level 24', 'Level 25', 'Outro']

    // Add bonus levels if all 75 minerals have been collected:
    if (Utils.isFullyCompleted()) {
      // store that outro was viewed:
      Utils.storeLevelResult(26, 0)

      // add entries for bonus levels:
      this.textChoice.push('Bonus 1')
      this.textChoice.push('Bonus 2')
      this.textChoice.push('Bonus 3')
    }

    // add navigation buttons:
    this.nextLevels = this.game.add.sprite(
      this.game.width - 30,
      this.topSpace - 40 + (this.game.height - this.topSpace) * 0.5,
      'triangle')
    this.nextLevels.anchor.setTo(0.5, 0.5)
    this.nextLevels.scale.setTo(2, 2)
    this.nextLevelsBtn = this.game.add.sprite(this.nextLevels.x, this.nextLevels.y, 'empty')
    this.nextLevelsBtn.inputEnabled = true
    this.nextLevelsBtn.anchor.setTo(0.5, 0.5)
    this.nextLevelsBtn.width = 60
    this.nextLevelsBtn.height = 250
    this.nextLevelsBtn.events.onInputDown.add(() => {
      if (this.offset + this.numOfEntries < this.textChoice.length &&
        this.levelStats[this.offset + this.numOfEntries - 1] >= 0 &&
        this.levelStats[this.offset + this.numOfEntries - 1] !== null) {
        this.offset += this.numOfEntries
        this.showLevels()
        this.menuSelectSound.play()
      }
    })

    this.previousLevels = this.game.add.sprite(
      30,
      this.topSpace - 40 + (this.game.height - this.topSpace) * 0.5,
      'triangle')
    this.previousLevels.rotation = 3.14
    this.previousLevels.anchor.setTo(0.5, 0.5)
    this.previousLevels.scale.setTo(2, 2)
    this.previousLevelsBtn = this.game.add.sprite(
      this.previousLevels.x,
      this.previousLevels.y,
      'empty')
    this.previousLevelsBtn.inputEnabled = true
    this.previousLevelsBtn.anchor.setTo(0.5, 0.5)
    this.previousLevelsBtn.width = 60
    this.previousLevelsBtn.height = 250
    this.previousLevelsBtn.events.onInputDown.add(() => {
      if (this.offset > 0) {
        this.offset = Math.max(this.offset - this.numOfEntries, 0)
        this.showLevels()
        this.menuSelectSound.play()
      }
    })

    // add mute button:
    this.add.existing(new Mute({
      game: this.game,
      x: this.game.width - 25,
      y: this.game.height - 25
    }))

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
    let statsBtn = this.levelStats[this.offset + this.numOfEntries - 1]
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
    Utils.storeMenuPosition(this.offset)

    // group to hold level stats:
    if (typeof this.levelStatsGroup !== 'undefined') {
      this.levelStatsGroup.destroy()
    }
    this.levelStatsGroup = this.add.group()

    let lastLevel = Math.min(this.numOfEntries + this.offset, this.textChoice.length)

    let leftPad = Math.floor(this.game.width * 0.5) - 90

    for (let i = this.offset; i < lastLevel; i++) {
      if (i === 0) {
        // show "Intro:"
        let levelText = this.game.add.bitmapText(leftPad, this.topSpace + (i - this.offset) * this.entrySpace, 'font_white_16', this.textChoice[i], 16)
        this.levelStatsGroup.add(levelText)

        // create intro btn:
        let levelBtn = this.add.sprite(leftPad, this.topSpace - 20 + (i - this.offset) * this.entrySpace, 'empty')
        levelBtn.height = this.entrySpace
        levelBtn.width = 180
        levelBtn.level = i
        levelBtn.inputEnabled = true
        levelBtn.events.onInputDown.add(this.goToLevel, this)
        this.levelStatsGroup.add(levelBtn)
      } else {
        // show title and button, if previous level is finished:
        let statsPrev = this.levelStats[i - 1]
        if (typeof statsPrev !== 'undefined' && statsPrev !== null) {
          // create level names:
          var levelText = this.game.add.bitmapText(leftPad, this.topSpace + (i - this.offset) * this.entrySpace, 'font_white_16', this.textChoice[i], 16)
          this.levelStatsGroup.add(levelText)

          // create level btn:
          var levelBtn = this.game.add.sprite(leftPad, this.topSpace - 20 + (i - this.offset) * this.entrySpace, 'empty')
          levelBtn.height = this.entrySpace
          levelBtn.width = 180
          levelBtn.level = i
          levelBtn.inputEnabled = true
          levelBtn.events.onInputDown.add(this.goToLevel, this)
          this.levelStatsGroup.add(levelBtn)
        }
        // show stats, if available:
        var stats = this.levelStats[i]
        if (typeof stats !== 'undefined' && stats !== null && i !== 26) {
          this.showLevelStats(stats, this.topSpace + (i - this.offset) * this.entrySpace)
        }
      }
    }
  }

  showLevelStats (stats, y) {
    let leftPad = Math.floor(this.game.width * 0.5) + 15
    if (stats <= 3) {
      // add borders around collected goodies:
      for (let count = 0; count < 3; count++) {
        let goodyBorder = this.game.add.sprite(Math.floor(leftPad + (30 * count)), y + 7, 'goody_border')
        goodyBorder.anchor.setTo(0.5, 0.5)
        goodyBorder.scale.setTo(2, 2)
        goodyBorder.fixedToCamera = true
        this.levelStatsGroup.add(goodyBorder)
      }

      // add indication of collected goodies:
      for (let count = 0; count < stats; count++) {
        let goody = this.game.add.sprite(Math.floor(leftPad + (30 * count)), y + 7, 'goody')
        goody.anchor.setTo(0.5, 0.5)
        goody.scale.setTo(0, 0)
        goody.fixedToCamera = true
        this.game.add.tween(goody.scale).to(
          {x: 2.0, y: 2.0},
          500,                       // duration
          Phaser.Easing.Elastic.Out, // easing
          true,                      // autostart
          100 * (count + 1),         // delay
          true                       // no-repeat
        )
        this.levelStatsGroup.add(goody)
      }
    } else {
      // add indication that more than 3 minerals have been collected:
      var goodiesText = this.game.add.bitmapText(leftPad, y, 'font_white_16', stats + ' / 40', 16)
      goodiesText.fixedToCamera = true
      this.levelStatsGroup.add(goodiesText)
    }
  }

  fadeIn () {
    // overlay:
    let overlay = this.add.graphics(0, 0)
    overlay.beginFill(0x000000, 1)
    overlay.drawRect(0, 0, this.game.width, this.game.height)
    overlay.alpha = 1
    overlay.endFill()
    this.add.tween(overlay).to({alpha: 0}, 800, 0).start()
  }
}
