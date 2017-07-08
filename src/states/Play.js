'use strict'

import Phaser from 'phaser'
import Levels from '../Levels'
import Asteroid from '../sprites/Asteroid'
import Nova from '../sprites/Nova'
import AntiForceField from '../sprites/AntiForceField'
import Goody from '../sprites/Goody'
import Player from '../sprites/Player'
import Alien from '../sprites/Alien'
import VictoryMenu from '../sprites/VictoryMenu'
import PauseMenu from '../sprites/PauseMenu'
import Intro from '../sprites/Intro'
import Utils from '../utils'

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

    // make the world larger than the actual canvas (for camera to be follow):
    this.game.world.setBounds(0, 0, 1424, 1624)

    // add background:
    this.background = this.game.add.tileSprite(
      0,
      0,
      this.game.world.width,
      this.game.world.height,
      'background'
    )
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
    this.menuButton = this.game.add.sprite(
      this.game.width - 50,
      10,
      'menu_button'
    )
    this.menuButton.fixedToCamera = true
    this.menuButtonBackground = this.game.add.sprite(
      this.game.width - 60,
      0,
      'empty'
    )
    this.menuButtonBackground.fixedToCamera = true
    this.menuButtonBackground.width = 60
    this.menuButtonBackground.height = 60
    this.menuButtonBackground.inputEnabled = true

    // set up helper variables variable:
    this.gq = {
      collectedGoodies: 0,   // count of goodies collected so far
      playerReady: false,    // set to true once player has appeared
      levelCompleted: false, // whether the level is complete
      playerControls: true,  // whether player can be controlled
      introPlaying: false,   // whether we are currently playing an intro
      currentIntroScene: 0,  // the current scene of the intro
      introHasNext: false    //
    }

    // kick things off:
    this.showLevelTitle(this.game.currentLevel)

    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.player.appear()
        .then(() => {
          // get into INTRO mode if there is one:
          let intro = Levels[this.game.currentLevel].intro
          if (typeof intro !== 'undefined') {
            this.gq.introPlaying = true
            this.intro = new Intro({
              game: this.game,
              playState: this,
              intro: intro
            })
            this.game.add.existing(this.intro)
          }
        })
    })
  }

  setupLevel (levelNumber) {
    // get current level:
    let level = Levels[levelNumber]

    // add target:
    let target = this.game.add.sprite(
      level.target.x,
      level.target.y,
      level.target.key
    )
    target.scale.setTo(2, 2)
    target.anchor.setTo(0.5, 0.5)
    target.animations.add('spiral')
    target.animations.play('spiral', 6, true)
    this.target = target

    // add asteroids:
    if (Array.isArray(level.asteroids)) {
      this.asteroids = []
      this.hotAsteroids = []
      for (let ast of level.asteroids) {
        let asteroid = new Asteroid({
          game: this.game,
          x: ast.x,
          y: ast.y,
          asset: ast.key,
          enemy: ast.enemy
        })
        if (ast.enemy === true) {
          this.hotAsteroids.push(asteroid)
        } else {
          this.asteroids.push(asteroid)
        }
        this.game.add.existing(asteroid)
      }
    }

    // add novae:
    if (Array.isArray(level.novae)) {
      let novae = []
      level.novae.forEach(nov => {
        let nova = new Nova({
          game: this.game,
          x: nov.x,
          y: nov.y,
          asset: nov.key
        })
        this.game.add.existing(nova)
        novae.push(nova)
      })
      this.novae = novae
    }

    // add antiForceFields:
    if (Array.isArray(level.antiForceFields)) {
      level.antiForceFields.forEach(af => {
        let antiForceField = new AntiForceField({
          game: this.game,
          x: af.x,
          y: af.y,
          asset: af.key,
          playState: this
        })
        this.game.add.existing(antiForceField)
      })
    }

    // add goodies:
    if (Array.isArray(level.goodies)) {
      let goodies = []
      level.goodies.forEach(go => {
        let goody = new Goody({
          game: this.game,
          x: go.x,
          y: go.y
        })
        this.game.add.existing(goody)
        goodies.push(goody)
      })
      this.goodies = goodies
    }

    // create line between player and closest asteroid:
    this.line = this.game.add.sprite(0, 0, 'line')
    this.line.anchor.setTo(0, 0.5)

    // add player:
    this.player = new Player({
      game: this.game,
      x: level.player.x,
      y: level.player.y,
      playState: this
    })
    this.game.add.existing(this.player)

    // add aliens:
    if (Array.isArray(level.aliens)) {
      this.aliens = []
      level.aliens.forEach(al => {
        let alien = new Alien({
          game: this.game,
          x: al.x,
          y: al.y,
          playState: this
        })
        this.game.add.existing(alien)
        this.aliens.push(alien)
      })
    }

    // particle emitter for player:
    this.gunEmitter = this.game.add.emitter(0, 0, 25)
    this.gunEmitter.makeParticles(['line_particle_1', 'line_particle_2'])

    // set up maximum allowed distance between player and closest asteroid:
    this.maxDistance = level.maxDistance

    // make camera follow player:
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN)
    this.game.camera.deadzone = new Phaser.Rectangle(
      Math.floor(this.game.width * 0.5) - 50,
      Math.floor(this.game.height * 0.5) - 150,
      100,
      300
    )

    // position camera:
    if (typeof level.camera === 'object') {
      if (typeof level.camera.x !== 'undefined') {
        this.game.camera.x = level.camera.x
      } else {
        this.game.camera.x = this.player.x - Math.floor(this.game.width * 0.5)
      }
      if (typeof level.camera.y !== 'undefined') {
        this.game.camera.y = level.camera.y
      } else {
        this.game.camera.y = this.player.y - Math.floor(this.game.height * 0.5)
      }
    } else {
      this.game.camera.focusOn(this.player)
    }

    // create speech bubble to indicate being lost soon
    this.speechLost = this.game.add.sprite(this.player.x, this.player.y - 80, 'speechBubbleLost')
    this.speechLost.visible = false

    // finally, make the level available (to be used in update, for example)
    this.level = level
  }

  showLevelTitle (levelNumber) {
    return new Promise((resolve, reject) => {
      // Fade-in:
      let levelTitleBackground = this.game.add.graphics(0, 0)
      levelTitleBackground.beginFill(0x000000, 1)
      levelTitleBackground.drawRect(0, 0, this.game.world.width, this.game.world.height)
      levelTitleBackground.alpha = 1
      levelTitleBackground.endFill()
      this.game.time.events.add(Phaser.Timer.SECOND * 0.5, () => {
        this.game.add.tween(levelTitleBackground).to({alpha: 0}, 800, 'Linear', 0).start()
      })

      // Level title:
      let title = 'Level ' + levelNumber
      if (levelNumber > 26) {
        title = 'Bonus ' + (levelNumber - 26).toString()
      }

      let text = this.game.add.bitmapText(
        this.game.width * 0.5 - 70,
        this.game.height * 0.5 - 20,
        'font_white_32',
        title,
        32
      )
      text.fixedToCamera = true

      this.game.time.events.add(Phaser.Timer.SECOND, () => {
        this.game.add.tween(text).to(
          {alpha: 0},
          1000,
          'Linear',
          0
        ).start().onComplete.add(() => {
          resolve()
        })
      })
    })
  }

  update () {
    // CASE: player ain't ready:
    if (!this.gq.playerReady) {
      return
    }

     // CASE: intro playing:
    if (this.gq.introPlaying) {
      return
    }

    // CASE: no controls:
    if (!this.gq.playerControls) {
      return
    }

    // CASE: player is lost
    let closest = this.getClosestAsteroid()
    if (closest.distance > this.maxDistance) {
      this.loosePlayer('You are lost!')
    } else if (closest.distance > this.maxDistance - 50) {
      this.speechLost.x = this.player.x + 10
      this.speechLost.y = this.player.y - 50
      this.speechLost.visible = true
    } else {
      this.speechLost.visible = false
    }

    // CASE: gravity gun active:
    if (this.game.input.activePointer.isDown) {
      // show player shooting:
      this.player.animations.play('shoot')

      // rotate player:
      this.player.rotation = this.angleBetween(this.player, closest.asteroid)

      // move player to asteroid:
      let force = Math.min(30, 30 * (1 - closest.distance / this.maxDistance)) * 1.3
      this.game.physics.arcade.accelerateToObject(this.player, closest.asteroid, force)

      // move asteroid to player:
      this.game.physics.arcade.accelerateToObject(closest.asteroid, this.player, 1 / closest.asteroid.width)

      // paint connection between player and closest asteroid:
      this.line.visible = true
      this.line.alpha = Math.min(1.0, 1.3 - (closest.distance / this.maxDistance)) // make line visible
      this.line.x = this.player.x
      this.line.y = this.player.y
      let angle = this.angleBetween(this.player, closest.asteroid)
      this.line.rotation = angle
      this.line.width = closest.distance - closest.asteroid.width * 0.5
      this.line.height = Math.min(15, 15 * (1.4 - closest.distance / this.maxDistance))

      // emit particles at asteroid:
      this.gunEmitter.x = closest.asteroid.x - Math.cos(angle) * closest.asteroid.width * 0.5
      this.gunEmitter.y = closest.asteroid.y - Math.sin(angle) * closest.asteroid.width * 0.5
      if (!this.gunEmitter.on) {
        this.gunEmitter.start(false, 100, 15)
      }
      this.gunEmitter.alpha = 1 - (closest.distance / this.maxDistance) // make emitter visible
      if (!this.gunSound.isPlaying) {
        this.gunSound.play('', 0, 0.3, true)
      }
    // CASE: gravity gun not active
    } else {
      // reset visuals:
      this.line.visible = false // make line invisible
      this.gunEmitter.on = false // stop emitter
      this.gunSound.stop() // stop the sound of the gun
      this.player.animations.play('idle')

      // disable accelleration:
      this.game.physics.arcade.accelerateToObject(this.player, closest.asteroid, 0)
      this.game.physics.arcade.accelerateToObject(closest.asteroid, this.player, 0)
    }

    // parallax scrolling:
    // store last camera position (for parallax background)
    if (typeof this.cameraLastX === 'undefined') {
      this.cameraLastX = this.game.camera.x
    }
    if (typeof this.cameraLastY === 'undefined') {
      this.cameraLastY = this.game.camera.y
    }

    if (this.game.camera.x !== this.cameraLastX) {
      this.background.x -= 0.3 * (this.cameraLastX - this.game.camera.x)
      this.cameraLastX = this.game.camera.x
    }
    if (this.game.camera.y !== this.cameraLastY) {
      this.background.y -= 0.3 * (this.cameraLastY - this.game.camera.y)
      this.cameraLastY = this.game.camera.y
    }

    /**
     * Collisions
     **/
    // player vs. target:
    if (this.collidesRectCircle(this.player, this.target)) {
      this.completedLevel()
    }

      // player vs. novae:
    if (typeof this.novae !== 'undefined') {
      this.novae.forEach(nova => {
        if (this.collidesRectCircle(this.player, nova)) {
          this.burnPlayer('Hydrogen\nburning!')
        }
      })
    }

      // player vs. asteroids:
    if (typeof this.hotAsteroids !== 'undefined') {
      this.hotAsteroids.forEach(asteroid => {
        if (this.collidesRectCircle(this.player, asteroid)) {
          this.burnPlayer('Too hot!')
        }
      })
    }

    // player vs. goodies:
    if (typeof this.goodies !== 'undefined') {
      let toRemove
      this.goodies.forEach((goody, i) => {
        if (this.collidesRectCircle(this.player, goody)) {
          console.log('collision with', i)
          toRemove = i
          goody.collect()
          this.gq.collectedGoodies++
          goody.destroy()
        }
      })
      if (typeof toRemove === 'number') {
        console.log('remove', toRemove)
        this.goodies.splice(toRemove, 1)
      }
    }

    // aliens:
    if (typeof this.aliens !== 'undefined') {
      // player vs. aliens:
      this.aliens.forEach(alien => {
        if (this.collidesRectCircle(this.player, alien)) {
          this.burnPlayer('Busted by\naliens!')
        }
      })

      // aliens vs. aliens:
      this.aliens.forEach((alien1, i1) => {
        this.aliens.forEach((alien2, i2) => {
          if (i2 > i1 && alien1.alive && alien2.alive &&
            this.collidesCircleCircle(alien1, alien2)) {
            alien1.explode()
            alien2.explode()
          }
        })
      })
    }
  }

  getClosestAsteroid () {
    let minDistance = Number.MAX_VALUE
    let asteroid
    this.asteroids.forEach(ast => {
      let distance = this.distanceBetween(ast, this.player)
      if (distance < minDistance) {
        minDistance = distance
        asteroid = ast
      }
    })
    this.hotAsteroids.forEach(ast => {
      let distance = this.distanceBetween(ast, this.player)
      if (distance < minDistance) {
        minDistance = distance
        asteroid = ast
      }
    })
    return {asteroid: asteroid, distance: minDistance}
  }

  pauseUpdate () {
    if (this.game.input.activePointer.isDown || this.game.input.pointer1.isDown) {
      var y = this.game.input.activePointer.y
      if (this.game.input.pointer1.y !== -1) {
        y = this.game.input.pointer1.y
      }
      if (typeof this.pauseMenu !== 'undefined') {
        this.pauseMenu.processInput(y)
      }
    }
  }

  completedLevel () {
    // disable player controls:
    this.gq.playerControls = false

    // hide gun:
    this.line.visible = false // make line invisible
    this.gunEmitter.on = false // stop emitter
    this.gunSound.stop() // stop the sound of the gun

    // save completion of level:
    Utils.storeLevelResult(this.game.currentLevel, this.gq.collectedGoodies)

    // play animation:
    this.player.absorb(this.target.x, this.target.y, () => {
      new VictoryMenu({
        game: this.game,
        playState: this,
        collectedGoodies: this.gq.collectedGoodies
      })
    })
  }

  goToNextLevel () {
    this.game.currentLevel++
    if (this.currentLevel !== 26) {
      this.game.state.start('Play')
    } else {
      this.game.state.start('Outro')
    }
  }

  loosePlayer (message) {
    // disable player controls:
    this.gq.playerControls = false
    this.player.animations.play('twist')

    // hide gun:
    this.line.visible = false // make line invisible
    this.gunEmitter.on = false // stop emitter
    this.gunSound.stop() // stop the sound of the gun

    this.pauseMenu = new PauseMenu({
      game: this.game,
      playState: this,
      message,
      noResume: true
    })
  }

  burnPlayer (message) {
    // disable player controls:
    this.gq.playerControls = false

    // hide gun:
    this.line.visible = false // make line invisible
    this.gunEmitter.on = false // stop emitter
    this.gunSound.stop() // stop the sound of the gun

    this.player.burn(() => {
      this.pauseMenu = new PauseMenu({
        game: this.game,
        playState: this,
        message,
        noResume: true
      })
    })
  }

  collidesRectCircle (rect, circle) {
    if (typeof circle !== 'undefined') {
      let radius = Math.floor(circle.width * 0.5)
      // quick check, whether collision is actually possible:
      if (Math.abs(circle.position.x - rect.position.x) < radius + 19 &&
        Math.abs(circle.position.y - rect.position.y) < radius + 19) {
        // adjust rotation to only use positive radians
        // (see Brad Green's comment from http://www.migapro.com/circle-and-
        //  rotated-rectangle-collision-detection/)
        let rotation = rect.rotation > 0 ? rect.rotation : -1 * rect.rotation + Math.PI
        rotation = rect.rotation > 0 ? -1 * rotation : rotation

        // Rotate circle's center point back (use 'rotation' because it is in radian, in contrast to angle in degree)
        let unrotatedCircleX = Math.cos(rotation) * (circle.position.x - rect.position.x) -
            Math.sin(rotation) * (circle.position.y - rect.position.y) + rect.position.x
        let unrotatedCircleY = Math.sin(rotation) * (circle.position.x - rect.position.x) +
            Math.cos(rotation) * (circle.position.y - rect.position.y) + rect.position.y

        // Closest point in the rectangle to the center of circle rotated backwards(unrotated)
        let closestX, closestY

        let rectX = rect.position.x - (rect.width * 0.5)
        let rectY = rect.position.y - (rect.height * 0.5)

        // Find the unrotated closest x point from center of unrotated circle
        if (unrotatedCircleX < rectX) {
          closestX = rectX
        } else if (unrotatedCircleX > rectX + rect.width) {
          closestX = rectX + rect.width
        } else {
          closestX = unrotatedCircleX
        }

        // Find the unrotated closest y point from center of unrotated circle
        if (unrotatedCircleY < rectY) {
          closestY = rectY
        } else if (unrotatedCircleY > rectY + rect.height) {
          closestY = rectY + rect.height
        } else {
          closestY = unrotatedCircleY
        }

        let distance = this.findPowDistance(unrotatedCircleX, unrotatedCircleY, closestX, closestY)
        if (distance < radius * radius) {
          return true // Collision
        }
      }
    }
    return false
  }

  collidesCircleCircle (circle1, circle2) {
    var radius1 = Math.floor(circle1.width * 0.5)
    var radius2 = Math.floor(circle2.width * 0.5)
    if (Math.abs(circle1.x - circle2.x) < radius1 + radius2 &&
      Math.abs(circle1.y - circle2.y) < radius1 + radius2) {
      var distance = this.findPowDistance(circle1.x, circle1.y, circle2.x, circle2.y)
      if (distance < (radius1 + radius2) * (radius1 + radius2)) {
        return true // Collision
      }
    }
    return false
  }

  findPowDistance (fromX, fromY, toX, toY) {
    var a = Math.abs(fromX - toX)
    var b = Math.abs(fromY - toY)
    return (a * a) + (b * b)
  }

  angleBetween (source, target) {
    return Math.atan2(target.position.y - source.position.y,
      target.position.x - source.position.x)
  }

  distanceBetween (source, target) {
    let dx = source.position.x - target.position.x
    let dy = source.position.y - target.position.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}
