'use strict'

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, play }) {
    super(game, x, y, 'alien')

    // store reference to play state:
    this.play = play

    // define anchor and size:
    this.anchor.setTo(0.5, 0.5)
    this.scale.setTo(2, 2)

    // define animations:
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    this.animations.add('combat', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])

    // enable Arcade physics:
    game.physics.enable(this, Phaser.Physics.ARCADE)

    // define sounds:
    this.alienSound = game.add.audio('alien', 0.5, false)
    this.alienExplosionSound = game.add.audio('alien_explosion', 0.5, false)
  }

  update () {
    // calculate distance to player:
    let distance = this.play.distanceBetween(this, this.play.player)

    // attack player, if close:
    if (distance < 150 && this.play.player.alive) {
      this.animations.play('combat', 10, true)
      this.game.physics.arcade.accelerateToObject(this, this.play.player, 8)
      if (!this.alienSound.isPlaying) {
        this.alienSound.play('', 0, 0.3, true)
      }
    } else {
      this.animations.play('idle', 10, true)
      this.game.physics.arcade.accelerateToObject(this, this.play.player, 0)
      this.body.velocity.setTo(0, 0)
      this.alienSound.stop()
    }
  }

  explode () {
  // define emitter for explosion:
    let explosionEmitter = this.game.add.emitter(0, 0, 40) // position and number of particles
    explosionEmitter.gravity = 0
    explosionEmitter.minParticleSpeed.setTo(-50, -50)
    explosionEmitter.maxParticleSpeed.setTo(50, 50)
    explosionEmitter.setAlpha(1, 0, 2500, Phaser.Easing.Quartic.In, false) // from 1, to 0, 5000 ms to do it, quartic, no yoyo
    explosionEmitter.makeParticles('spark')
    explosionEmitter.x = this.x
    explosionEmitter.y = this.y
    explosionEmitter.z = this.z + 1
    explosionEmitter.start(true, 2000, null, 40)  // explodes, 1500 ms lifespan per particle, frequency ignored (explodes), 0 = launch all particles

    this.alienExplosionSound.play()

    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, () => {
      this.alienSound.stop()
      this.destroy()
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
      explosionEmitter.destroy()
    })
  }
}
