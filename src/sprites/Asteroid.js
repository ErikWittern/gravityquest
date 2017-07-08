'use strict'

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset, enemy }) {
    super(game, x, y, asset)

    // store whether it is an enemy:
    this.enemy = enemy

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)

    // enable Arcade physics:
    game.physics.enable(this, Phaser.Physics.ARCADE)
  }
}
