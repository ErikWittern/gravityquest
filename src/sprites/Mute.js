'use strict'

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

  // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)
    this.fixedToCamera = true

  // define animations:
    // this.animations.add('loud', [0])
    // this.animations.add('mute', [1])

  // define clickable area:
    this.btn = game.add.sprite(x, y, 'empty')
    this.btn.anchor.setTo(0.5, 0.5)
    this.btn.fixedToCamera = true
    this.btn.width = this.btn.height = 40

  // define sounds:
    this.menuSelectSound = game.add.audio('menu_select', 0.5, false)

  // enable input:
    this.btn.inputEnabled = true
    this.btn.events.onInputDown.add(function () {
      this.toggleMuted()
    }, this)

  // set initial state:
    if (this.getMuted() === true) {
      game.sound.mute = true
      this.animations.play('mute')
    } else {
      this.animations.play('loud')
    }
  }

  update () {}

  toggleMuted () {
    let muted = this.getMuted()
    if (muted === false) {
      muted = true
      this.game.sound.mute = true
      this.animations.play('mute')
      this.setMuted(true)
    } else {
      muted = false
      this.game.sound.mute = false
      this.animations.play('loud')
      this.setMuted(false)
    }
  }

  getMuted () {
    if (typeof Storage !== 'undefined') {
    //  localStorage.removeItem('gravity-gun');
      var mute = JSON.parse(localStorage.getItem('gravityquest-muted'))
      if (mute && typeof mute !== 'undefined') {
        return mute
      }
      return false
    }
  }

  setMuted (muted) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('gravityquest-muted', muted)
    }
  }
}
