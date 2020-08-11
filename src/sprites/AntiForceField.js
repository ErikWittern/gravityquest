'use strict'

class AntiForceField extends Phaser.Sprite {
  constructor ({ game, x, y, asset, playState }) {
    super(game, x, y, asset)

    // store reference to play state:
    this.play = playState

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)

    // define animations:
    this.animations.add('expand')
    this.animations.play('expand', 10, true)

    // enable Arcade physics:
    game.physics.enable(this, Phaser.Physics.ARCADE)
  }

  update () {
    let distance = this.play.distanceBetween(this, this.play.player)

    // push player away:
    if (distance < this.width * 0.5) {
      this.game.physics.arcade.accelerateToObject(this.play.player, this, -20)
    }
  }
}

module.exports = AntiForceField
