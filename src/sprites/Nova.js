'use strict'

class Nova extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)

    // define animations:
    this.animations.add('flicker', [0, 1, 2, 3, 2, 1])
    this.animations.play('flicker', 5, true)
  }
}

module.exports = Nova
