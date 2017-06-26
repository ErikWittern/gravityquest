'use strict'

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'goody')

    // define sounds:
    this.collectSound = game.add.audio('collect_goodie', 1, false)

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)

    // define animations:
    this.animations.add('sparkle', [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    this.animations.play('sparkle', 10, true)
  }

  collect () {
    this.collectSound.play()
  }
}
