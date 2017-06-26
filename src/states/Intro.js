'use strict'

/* global localStorage */

import Phaser from 'phaser'
import Player from '../sprites/Player'
import config from '../config'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    // stop all eventually ongoing sounds:
    this.game.sound.stopAll()

    // load sounds:
    this.shuttleExplosionSound = this.game.add.audio('shuttle_explosion')
    this.gunSound = this.game.add.audio('gun')
    this.absorbSound = this.game.add.audio('absorb')
    this.music = this.game.add.audio('space_intro')

    // make the world larger than the actual canvas (for camera to be able to follow):
    this.game.world.setBounds(0, 0, 1424, 1624)

    let playerX = 200
    let playerY = Math.floor(this.game.height * 0.5) + 50

    // enable Arcade physics:
    this.game.physics.enable(this, Phaser.Physics.ARCADE)

    // add background:
    this.ground = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background')
    this.ground.scale.setTo(2, 2)

    // create line between player and closest asteroid:
    this.line = this.game.add.sprite(0, 0, 'line')
    this.line.anchor.setTo(0, 0.5)

    // add small asteroid:
    this.smallAsteroid = this.game.add.sprite(playerX + 120, playerY + 660, 'asteroid_32')
    this.smallAsteroid.scale.setTo(2.0, 2.0)
    this.smallAsteroid.anchor.setTo(0.5, 0.5)
    this.game.physics.enable(this.smallAsteroid, Phaser.Physics.ARCADE)

    // add target:
    this.target = this.game.add.sprite(playerX + 170, playerY + 450, 'target')
    this.target.scale.setTo(2, 2)
    this.target.anchor.setTo(0.5, 0.5)
    this.target.animations.add('spiral')
    this.target.animations.play('spiral', 6, true)

    // add goodies:
    var goodie1 = this.game.add.sprite(playerX + 15, playerY - 5, 'goody')
    goodie1.scale.setTo(2.0, 2.0)
    var goodie2 = this.game.add.sprite(playerX - 80, playerY - 50, 'goody')
    goodie2.scale.setTo(2.0, 2.0)
    var goodie3 = this.game.add.sprite(playerX - 70, playerY - 140, 'goody')
    goodie3.scale.setTo(2.0, 2.0)

    // add player:
    this.player = new Player({
      game: this,
      x: playerX,
      y: playerY,
      asset: 'player'
    })
    this.add.existing(this.player)
    // no animation when player enters this time:
    this.player.scale.setTo(1, 1)

    // make camera follow player:
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.x = 80

    // add shuttle:
    this.shuttle = this.game.add.sprite(playerX + 100, playerY - 120, 'shuttle')
    this.shuttle.animations.add('idle', [0])
    this.shuttle.animations.add('damaged', [1])
    this.shuttle.animations.play('idle', 1, false)
    this.shuttle.scale.setTo(2.0, 2.0)
    this.shuttle.anchor.setTo(0.5, 0.5)

    // add asteroid:
    this.asteroid = this.game.add.sprite(playerX + 100, playerY - 450, 'asteroid_64')
    this.asteroid.scale.setTo(2.0, 2.0)
    this.asteroid.anchor.setTo(0.5, 0.5)

    // particle emitter for player:
    this.emitter = this.game.add.emitter(0, 0, 250)
    this.emitter.makeParticles(['line_particle_1', 'line_particle_2'])

    this.smokeEmitter = this.game.add.emitter(this.shuttle.x, this.shuttle.y, 20)
    this.smokeEmitter.setXSpeed(10, 20)
    this.smokeEmitter.setYSpeed(-10, -20)
    this.smokeEmitter.makeParticles('smoke')
    this.smokeEmitter.gravity = false
    this.smokeEmitter.setScale(0.2, 1, 0.2, 1, 5000, Phaser.Easing.Linear.InOut, false)
    this.smokeEmitter.setAlpha(1, 0, 5000, Phaser.Easing.Quartic.In, false)

    // add bubble and text:
    this.bubble = this.game.add.sprite(playerX, playerY - 80, 'speechBubble')
    this.bubble.visible = false
    this.bubbleText = this.game.add.bitmapText(this.player.x + 8, this.player.y - 74, 'font_black_12', '', 12)
    this.bubbleText.visible = false
    this.bubbleText.align = 'center'

    // store that intro was viewed:
    if (typeof Storage !== 'undefined') {
      var stats = JSON.parse(localStorage.getItem('gravity-gun'))
      if (stats) {
        stats[0] = '0'
      } else {
        stats = []
        stats[0] = '0'
      }
      localStorage.setItem('gravity-gun', JSON.stringify(stats))
    }

    // start scenes:
    this.scene1()

    // setup menu button:
    this.menuButton = this.game.add.button(config.gameWidht - 50, 10, 'menu_button', this.goToMenu, this)
    this.menuButton.fixedToCamera = true
  }

  render () {}

  scene1 () { // FadeIn:
    // overlay:
    let overlay = this.game.add.graphics(0, 0)
    overlay.beginFill(0x000000, 1)
    overlay.drawRect(0, 0, this.game.world.width, this.game.world.height)
    overlay.alpha = 1
    overlay.endFill()
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(overlay).to({alpha: 0}, 800, 'Linear', false).start()
    })

    // message:
    var text = this.game.add.bitmapText(0, 0, 'font_white_32', 'Far, far\nfrom earth...', 32)
    text.x = this.game.width * 0.5 - text.textWidth * 0.5
    text.y = this.game.height * 0.5 - text.textHeight * 0.5
    text.fixedToCamera = true

    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(text).to({alpha: 0}, 1000, 'Linear', false).start()
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
      this.scene2()
    })
  }

  scene2 () { // Monologue about research:
    this.bubble.visible = true
    this.bubbleText.visible = true

    this.bubbleText.setText('These rare\nminerals are\nincredible!')

    this.game.time.events.add(Phaser.Timer.SECOND * 5, () => {
      this.bubbleText.setText('They will drive\nyears of\nresearch.')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 10, () => {
      this.bubbleText.setText('I can already\nsmell an article\nin \'Nature\'.')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 15, () => {
      this.bubble.visible = false
      this.bubbleText.visible = false
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 18, () => {
      this.scene3()
    })
  }

  scene3 () { // Animate asteroid to hit shuttle:
    this.game.add.tween(this.asteroid).to({x: this.shuttle.x + 33, y: this.shuttle.y - 55}, 5000, 'Linear', 0).start().onComplete.add(() => {
      // animate damage:
      this.shuttle.animations.play('damaged')
      this.smokeEmitter.start(false, 3000, 400, 200)
      this.shuttleExplosionSound.play()
      this.game.add.tween(this.shuttle).to({x: this.shuttle.x - 300, y: this.shuttle.y + 200, angle: 160}, 15000, 'Linear', 0).start()
      this.game.add.tween(this.asteroid).to({x: this.asteroid.x + 300, y: this.shuttle.y + 200}, 15000, 'Linear', 0).start()

      this.game.time.events.add(Phaser.Timer.SECOND, () => {
        this.bubble.visible = true
        this.bubbleText.visible = true
        this.bubbleText.setText('Uargh,\nthe shuttle!')
      })

      this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
        this.bubble.visible = false
        this.bubbleText.visible = false
      })

      // go to scene 4 upon impact on player:
      this.game.time.events.add(Phaser.Timer.SECOND * 5.3, () => {
        this.scene4()
      })
    })

    var smallBubble = this.game.add.sprite(this.player.x, this.player.y - 40, 'speechBubbleLost')
    smallBubble.visible = false

    this.game.time.events.add(Phaser.Timer.SECOND * 2.5, () => {
      smallBubble.visible = true
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 3.5, () => {
      smallBubble.destroy()
    })
  }

  scene4 () { // player drifts away:
    this.game.add.tween(this.player).to({x: this.smallAsteroid.x - 60, y: this.smallAsteroid.y, angle: -360}, 28000, 'Linear', 0).start().onComplete.add(() => {
      this.scene5()
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.music.play()
      this.bubble.visible = true
      this.bubbleText.visible = true
      this.bubbleText.setText('...and I am\ndrifting away...')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 8, () => {
      this.bubble.visible = false
      this.bubbleText.visible = false
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 13, () => {
      this.bubble.visible = true
      this.bubbleText.visible = true
      this.bubbleText.setText('A black hole!\nSo they do exist!')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 16, () => {
      this.bubbleText.setText('It is my only\nchance to ever\nreturn to earth!')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 21, () => {
      this.bubble.visible = false
      this.bubbleText.visible = false
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 22, () => {
      this.bubble.visible = true
      this.bubbleText.visible = true
      this.bubbleText.setText('Maybe I can use\nmy gravitygun\nto reach it...')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 26, () => {
      this.bubble.visible = false
      this.bubbleText.visible = false
    })
  }

  scene5 () { // use of gravitygun:
    this.player.body.acceleration.y = 1500

    this.useGravityGun = true
    this.player.animations.play('shoot')

    this.game.time.events.add(Phaser.Timer.SECOND * 5, () => {
      this.useGravityGun = false
      this.player.animations.play('idle')
      this.player.body.acceleration.setTo(0, 0)
      this.game.add.tween(this.player).to({x: this.target.x, y: this.target.y + 25}, 6000, 'Linear', 0).start().onComplete.add(() => {
        this.player.absorb(this.target.x, this.target.y, () => {
          this.scene6()
        })
      })
    })
  }

  scene6 () { // fade out:
    // overlay:
    var overlay = this.game.add.graphics(0, 0)
    overlay.beginFill(0x000000, 1)
    overlay.drawRect(0, 0, this.game.world.width, this.game.world.height)
    overlay.alpha = 0
    overlay.endFill()
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(overlay).to({alpha: 1}, 800, 'Linear', 0).start().onComplete.add(() => {
        this.game.state.start('Play')
      })
    })
  }

  goToMenu () {
    this.game.state.start('Menu')
  }

  update () {
    this.smokeEmitter.x = this.shuttle.x
    this.smokeEmitter.y = this.shuttle.y

    this.bubble.x = this.player.x
    this.bubble.y = this.player.y - 80

    this.bubbleText.x = this.bubble.x + Math.floor(this.bubble.width * 0.5) - Math.floor(this.bubbleText.textWidth * 0.5)
    this.bubbleText.y = this.bubble.y + Math.floor(this.bubble.height * 0.5) - 4 - Math.floor(this.bubbleText.textHeight * 0.5)

    if (this.useGravityGun) {
      // move player to force field:
      this.game.physics.arcade.accelerateToObject(this.player, this.smallAsteroid, 20)

      // rotate player:
      this.player.rotation = this.angleBetween(this.player, this.smallAsteroid)

      // paint connection between player and closest asteroid:
      this.line.alpha = 1 // make line visible
      this.line.x = this.player.x
      this.line.y = this.player.y
      var angle = this.angleBetween(this.player, this.smallAsteroid)
      this.line.rotation = angle
      this.line.width = this.distanceBetween(this.smallAsteroid, this.player) - this.smallAsteroid.width * 0.5

      // emit particles:
      this.emitter.x = this.smallAsteroid.x - Math.cos(angle) * this.smallAsteroid.width * 0.5
      this.emitter.y = this.smallAsteroid.y - Math.sin(angle) * this.smallAsteroid.width * 0.5
      if (!this.emitter.on) {
        this.emitter.start(false, 100, 15)
      }
      if (!this.gunSound.isPlaying) {
        this.gunSound.play('', 0, 0.3, true)
      }
    } else {
      this.line.alpha = 0 // make line invisible
      this.emitter.on = false // stop emitter
      this.gunSound.stop()
      // this.game.physics.arcade.accelerateToObject(this.player, this.smallAsteroid, 0)
    }
  }

  angleBetween (source, target) {
    return Math.atan2(target.y - source.y, target.x - source.x)
  }

  distanceBetween (source, target) {
    var dx = source.x - target.x
    var dy = source.y - target.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}
