'use strict'

import Phaser from 'phaser'
import Levels from '../Levels'
import Asteroid from '../sprites/Asteroid'
import Nova from '../sprites/Nova'
import AntiForceField from '../sprites/AntiForceField'
import Goody from '../sprites/Goody'
import Player from '../sprites/Player'
import Alien from '../sprites/Alien'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    // stop all eventually ongoing sounds:
    this.game.sound.stopAll()

    // define sounds:
    this.gunSound = this.game.add.audio('gun')

    // enable to allow display of fps
    this.game.time.advancedTiming = true

    // enable arcade physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // make the world larger than the actual canvas (for camera to be able to follow):
    this.game.world.setBounds(0, 0, 1424, 1624)

    // add background:
    this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background')
    this.background.scale.setTo(2, 2)

    // load the current level:
    this.setupLevel(this.game.currentLevel)

    // setup layer for control:
    this.inputLayer = this.game.add.sprite(0, 0, 'empty')
    this.inputLayer.fixedToCamera = true
    this.inputLayer.width = this.game.world.width
    this.inputLayer.height = this.game.world.height
    this.inputLayer.inputEnabled = true
    this.inputLayer.input.enableDrag()

    // setup menu button:
    this.menuButton = this.game.add.sprite(this.game.width - 50, 10, 'menu_button')
    this.menuButton.fixedToCamera = true

    this.menuButtonBackground = this.game.add.sprite(this.game.width - 60, 0, 'empty')
    this.menuButtonBackground.fixedToCamera = true
    this.menuButtonBackground.width = 60
    this.menuButtonBackground.height = 60
    this.menuButtonBackground.inputEnabled = true
    // this.menuButtonBackground.events.onInputDown.add(() => {
    //   this.pauseMenu = new PauseMenu(game, this, 'Paused', false)
    // })

    // counter to store whether distance calculation is performed:
    this.updateCounter = 0

    // this.fpsText = game.add.bitmapText(30, 30, 'font_white_12', '60', 12);
    // this.fpsText.fixedToCamera = true;
  }

  setupLevel (level) {
    // get current level:
    this.level = Levels[level]

    // setup variable to store collected goodies:
    this.collectedGoodies = 0

    // help variable:
    this.levelCompleted = false
    this.game.playerReady = false

    // add target:
    this.target = this.game.add.sprite(this.level.target.x + 200, this.level.target.y + 300, this.level.target.key)
    this.target.scale.setTo(2, 2)
    this.target.anchor.setTo(0.5, 0.5)
    this.target.animations.add('spiral')
    this.target.animations.play('spiral', 6, true)

    // add asteroids:
    if (typeof this.level.asteroids !== 'undefined') {
      this.asteroids = this.game.add.group()
      this.hotAsteroids = this.game.add.group()
      for (let i = 0; i < this.level.asteroids.length; i++) {
        let asteroid = new Asteroid({
          game: this,
          x: this.level.asteroids[i].x + 200,
          y: this.level.asteroids[i].y + 200,
          asset: this.level.asteroids[i].key,
          enemy: this.level.asteroids[i].enemy
        })
        this.game.add.existing(asteroid)
        this.asteroids.add(asteroid)
        if (this.level.asteroids[i].enemy === true) {
          this.hotAsteroids.add(asteroid)
        } else {
          this.asteroids.add(asteroid)
        }
      }
    }

    // add novae:
    if (typeof this.level.novae !== 'undefined' && this.level.novae.length > 0) {
      this.novae = this.game.add.group()
      for (let i = 0; i < this.level.novae.length; i++) {
        let nova = new Nova({
          game: this,
          x: this.level.novae[i].x + 200,
          y: this.level.novae[i].y + 300,
          asset: this.level.novae[i].key
        })
        this.game.add.existing(nova)
        this.novae.add(nova)
      }
    }

    // add antiForceFields:
    if (typeof this.level.antiForceFields !== 'undefined') {
      for (let i = 0; i < this.level.antiForceFields.length; i++) {
        let antiForceField = new AntiForceField({
          game: this,
          x: this.level.antiForceFields[i].x + 200,
          y: this.level.antiForceFields[i].y + 300,
          asset: this.level.antiForceFields[i].key,
          play: this
        })
        this.game.add.existing(antiForceField)
      }
    }

    // add goodies:
    if (typeof this.level.goodies !== 'undefined') {
      this.goodies = this.game.add.group()
      for (var i = 0; i < this.level.goodies.length; i++) {
        let goody = new Goody({
          game: this.game,
          x: this.level.goodies[i].x + 200,
          y: this.level.goodies[i].y + 300
        })
        this.game.add.existing(goody)
        this.goodies.add(goody)
      }
    }

    // create line between player and closest asteroid:
    this.line = this.game.add.sprite(0, 0, 'line')
    this.line.anchor.setTo(0, 0.5)

    // add player:
    this.player = new Player({
      game: this.game,
      x: this.level.player.x + 200,
      y: this.level.player.y + 300,
      playState: this
    })
    this.game.add.existing(this.player)
    this.player.appear()

    // add aliens:
    if (typeof this.level.aliens !== 'undefined') {
      this.aliens = this.game.add.group()
      for (let i = 0; i < this.level.aliens.length; i++) {
        var alien = new Alien({
          game: this.game,
          x: this.level.aliens[i].x + 200,
          y: this.level.aliens[i].y + 300,
          play: this
        })
        this.game.add.existing(alien)
        this.aliens.add(alien)
      }
    }

    // particle emitter for player:
    this.gunEmitter = this.game.add.emitter(0, 0, 25)
    this.gunEmitter.makeParticles(['line_particle_1', 'line_particle_2'])

    // set up maximum allowed distance between player and closest asteroid:
    this.maxDistance = this.level.maxDistance

    // enable playerControls:
    this.game.playerControls = true

    // make camera follow player:
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.deadzone = new Phaser.Rectangle(Math.floor(this.game.width * 0.5) - 50, Math.floor(this.game.height * 0.5) - 150, 100, 300)

    // position camera:
    if (typeof this.level.camera !== 'undefined') {
      if (typeof this.level.camera.x !== 'undefined') {
        this.game.camera.x = this.level.camera.x
      } else {
        this.game.camera.x = this.player.x - Math.floor(this.game.width * 0.5)
      }
      if (typeof this.level.camera.y !== 'undefined') {
        this.game.camera.y = this.level.camera.y
      } else {
        this.game.camera.y = this.player.y - Math.floor(this.game.height * 0.5)
      }
    } else {
      this.game.camera.focusOn(this.player)
    }

    this.cameraLastX = this.camera.x
    this.cameraLastY = this.camera.y

    // create speech bubble to indicate being lost soon
    this.speechLost = this.game.add.sprite(this.player.x, this.player.y - 80, 'speechBubbleLost')
    this.speechLost.visible = false

    this.showLevelTitle(this.game.currentLevel)
  }

  showLevelTitle (currentLevel) {
    // Fade-in:
    let levelTitleBackground = this.game.add.graphics(0, 0)
    levelTitleBackground.beginFill(0x000000, 1)
    levelTitleBackground.drawRect(0, 0, this.game.world.width, this.game.world.height)
    levelTitleBackground.alpha = 1
    levelTitleBackground.endFill()
    this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
      this.game.add.tween(levelTitleBackground).to({alpha: 0}, 800, 'Linear', 0).start()
    })
    // tween.onComplete.add(function(){});

    // Level title:
    var title = 'Level ' + currentLevel
    if (currentLevel > 26) {
      title = 'Bonus ' + (currentLevel - 26).toString()
    }

    var text = this.game.add.bitmapText(this.game.width * 0.5 - 70, this.game.height * 0.5 - 20, 'font_white_32', title, 32)
    text.fixedToCamera = true
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(text).to({alpha: 0}, 1000, 'Linear', 0).start()
    })
  }

  update () {
    var closest = this.getClosestAsteroid()
    if (this.game.playerControls && closest.distance > this.maxDistance) {
      this.loosePlayer('You are lost!')
    } else if (this.game.playerControls && closest.distance > this.maxDistance - 50 && this.game.playerReady) {
      this.speechLost.visible = true
    } else {
      this.speechLost.visible = false
    }
    if (this.inputLayer.input.isDragged &&
      !this.game.playerControls &&
      this.game.playerReady &&
      this.inputClicked !== true) {
      if (typeof this.level.intro !== 'undefined' && this.level.intro.nextSceneAllowed) {
        this.level.intro.nextSceneAllowed = false
        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, function () {
          this.level.intro.nextSceneAllowed = true
        }.bind(this))
        this.level.currentScene += 1
        this.level.intro(this.game, this.player.x, this.player.y, this.level.currentScene)
      }
      this.inputClicked = true
    } else if (this.inputLayer.input.isDragged && this.game.playerControls && this.game.playerReady) {
      // move player to force field:
      var force = Math.min(30, 30 * (1 - closest.distance / this.maxDistance)) * 1.3
      this.game.physics.arcade.accelerateToObject(this.player, closest.asteroid, force)

      // move force field to player:
      this.game.physics.arcade.accelerateToObject(closest.asteroid, this.player, 1 / closest.asteroid.width)

      // animate player:
      this.player.animations.play('shoot')

      // rotate player:
      this.player.rotation = this.angleBetween(this.player, closest.asteroid)

      // paint connection between player and closest asteroid:
      this.line.visible = true
      this.line.alpha = Math.min(1.0, 1.3 - (closest.distance / this.maxDistance)) // make line visible
      this.line.x = this.player.x
      this.line.y = this.player.y
      var angle = this.angleBetween(this.player, closest.asteroid)
      this.line.rotation = angle
      this.line.width = closest.distance - closest.asteroid.width * 0.5
      this.line.height = Math.min(15, 15 * (1.4 - closest.distance / this.maxDistance))

      // emit particles:
      this.gunEmitter.x = closest.asteroid.x - Math.cos(angle) * closest.asteroid.width * 0.5
      this.gunEmitter.y = closest.asteroid.y - Math.sin(angle) * closest.asteroid.width * 0.5
      if (!this.gunEmitter.on) {
        this.gunEmitter.start(false, 100, 15)
      }
      this.gunEmitter.alpha = 1 - (closest.distance / this.maxDistance) // make emitter visible
      if (!this.gunSound.isPlaying) {
        this.gunSound.play('', 0, 0.3, true)
      }
    } else {
      this.updateCounter++
      this.line.visible = false // make line invisible
      this.gunEmitter.on = false // stop emitter
      this.gunSound.stop() // stop the sound of the gun
      this.game.physics.arcade.accelerateToObject(this.player, closest.asteroid, 0)
      this.game.physics.arcade.accelerateToObject(closest.asteroid, this.player, 0)
      if (this.game.playerReady) {
        this.player.animations.play('idle')
      }
    }
    if (!this.inputLayer.input.isDragged) {
      this.inputClicked = false
    }
    if (this.game.camera.x !== this.cameraLastX) {
      this.background.x -= 0.2 * (this.cameraLastX - this.game.camera.x)
      this.cameraLastX = this.game.camera.x
    }
    if (this.game.camera.y !== this.cameraLastY) {
      this.background.y -= 0.2 * (this.cameraLastY - this.game.camera.y)
      this.cameraLastY = this.game.camera.y
    }
    this.speechLost.x = this.player.x + 10
    this.speechLost.y = this.player.y - 50

    // Collision:
    if (this.game.playerControls) {
      // player vs. target:
      if (this.collidesRectCircle(this.player, this.target)) {
        this.completedLevel()
      }

      // player vs. novae:
      if (typeof this.novae !== 'undefined') {
        this.novae.forEach(function (nova) {
          if (this.collidesRectCircle(this.player, nova)) {
            this.burnPlayer('Hydrogen\nburning!')
          }
        }.bind(this))
      }

      // player vs. asteroids:
      if (typeof this.hotAsteroids !== 'undefined') {
        this.hotAsteroids.forEach(function (asteroid) {
          if (this.collidesRectCircle(this.player, asteroid)) {
            this.burnPlayer('Too hot!')
          }
        }.bind(this))
      }

      // player vs. goodies:
      if (typeof this.goodies !== 'undefined') {
        this.goodies.forEach(function (goody) {
          if (this.collidesRectCircle(this.player, goody)) {
            goody.destroy()
            this.collectedGoodies += 1
            goody.collect()
          }
        }.bind(this))
      }

      // aliens:
      if (typeof this.aliens !== 'undefined') {
        // player vs. aliens:
        this.aliens.forEach(function (alien) {
          if (this.collidesRectCircle(this.player, alien)) {
            this.burnPlayer('Busted by\naliens!')
          }
        }.bind(this))
        // aliens vs. aliens:
        var i = 0
        var toDestroy = []
        this.aliens.forEach(function (alien1) {
          var j = 0
          this.aliens.forEach(function (alien2) {
            if (i > j && this.collidesCircleCircle(alien1, alien2)) {
              alien1.explode()
              alien2.explode()
              toDestroy.push(alien1)
              toDestroy.push(alien2)
            }
            j++
          }.bind(this))
          i++
        }.bind(this))
        for (let i = toDestroy.length - 1; i >= 0; i--) {
          this.aliens.remove(toDestroy[i], false)
        };
      }
    }
  }

  getClosestAsteroid () {
    var minDistance = Number.MAX_VALUE
    var asteroid
    this.asteroids.forEach(function (ast) {
      var distance = this.distanceBetween(ast, this.player)
      if (distance < minDistance) {
        minDistance = distance
        asteroid = ast
      }
    }, this)
    this.hotAsteroids.forEach(function (ast) {
      var distance = this.distanceBetween(ast, this.player)
      if (distance < minDistance) {
        minDistance = distance
        asteroid = ast
      }
    }, this)
    return {asteroid: asteroid, distance: minDistance}
  }

  distanceBetween (source, target) {
    var dx = source.x - target.x
    var dy = source.y - target.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}
