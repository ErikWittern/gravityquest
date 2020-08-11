'use strict'

const Utils = require('../utils')

class Mute extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'mute_button')

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)
    this.fixedToCamera = true

    // define animations:
    this.animations.add('loud', [0])
    this.animations.add('mute', [1])

    // define clickable area:
    this.btn = game.add.sprite(x, y, 'empty')
    this.btn.anchor.setTo(0.5, 0.5)
    this.btn.fixedToCamera = true
    this.btn.width = this.btn.height = 40

    // define sounds:
    this.menuSelectSound = game.add.audio('menu_select', 0.5, false)

    // enable input:
    this.btn.inputEnabled = true
    this.btn.events.onInputDown.add(() => {
      this.toggleMuted()
    })

    // set initial state:
    if (Utils.loadMuted() === true) {
      game.sound.mute = true
      this.animations.play('mute')
    } else {
      this.animations.play('loud')
    }
  }

  update () {}

  toggleMuted () {
    let muted = Utils.loadMuted()
    if (muted) {
      muted = false
      this.game.sound.mute = false
      this.animations.play('loud')
      Utils.storeMuted(false)
    } else {
      muted = true
      this.game.sound.mute = true
      this.animations.play('mute')
      Utils.storeMuted(true)
    }
  }
}

module.exports = Mute
