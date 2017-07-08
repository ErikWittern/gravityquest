'use strict'

import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init () {
    // load bar:
    this.preloadBar = this.add.sprite(Math.floor(config.gameWidth * 0.5) - 50, Math.floor(config.gameHeight * 0.5), 'loadbar_frame')
    this.preloadBar = this.add.sprite(Math.floor(config.gameWidth * 0.5) - 50, Math.floor(config.gameHeight * 0.5), 'loadbar')
    this.load.setPreloadSprite(this.preloadBar)
  }

  preload () {
    // load fonts: (created with: http://kvazars.com/littera/)
    this.load.bitmapFont('font_white_12', 'assets/fonts/font_white_12.png', 'assets/fonts/font_white_12' + (navigator.isCocoonJS ? '.json' : '.fnt'))
    this.load.bitmapFont('font_white_16', 'assets/fonts/font_white_16.png', 'assets/fonts/font_white_16' + (navigator.isCocoonJS ? '.json' : '.fnt'))
    this.load.bitmapFont('font_white_24', 'assets/fonts/font_white_24.png', 'assets/fonts/font_white_24' + (navigator.isCocoonJS ? '.json' : '.fnt'))
    this.load.bitmapFont('font_white_32', 'assets/fonts/font_white_32.png', 'assets/fonts/font_white_32' + (navigator.isCocoonJS ? '.json' : '.fnt'))

    this.load.bitmapFont('font_black_8', 'assets/fonts/font_black_8.png', 'assets/fonts/font_black_8' + (navigator.isCocoonJS ? '.json' : '.fnt'))
    this.load.bitmapFont('font_black_12', 'assets/fonts/font_black_12.png', 'assets/fonts/font_black_12' + (navigator.isCocoonJS ? '.json' : '.fnt'))
    this.load.bitmapFont('font_black_16', 'assets/fonts/font_black_16.png', 'assets/fonts/font_black_16' + (navigator.isCocoonJS ? '.json' : '.fnt'))

    // Load images:
    this.load.image('logo', 'assets/images/logo.png')
    this.load.image('empty', 'assets/images/empty.png')
    this.load.image('background', 'assets/images/background.png')
    this.load.image('menu_button', 'assets/images/menu_button.png')
    this.load.image('triangle', 'assets/images/triangle.png')
    this.load.spritesheet('player', 'assets/images/player.png', 20, 32)
    this.load.image('asteroid_32', 'assets/images/asteroid_32.png')
    this.load.image('asteroid_64', 'assets/images/asteroid_64.png')
    this.load.image('thermoAsteroid_32', 'assets/images/thermoAsteroid_32.png')
    this.load.image('thermoAsteroid_64', 'assets/images/thermoAsteroid_64.png')
    this.load.spritesheet('antiForceField_64', 'assets/images/antiForceField_64.png', 32, 32)
    this.load.spritesheet('antiForceField_96', 'assets/images/antiForceField_96.png', 48, 48)
    this.load.spritesheet('nova_32', 'assets/images/nova_32.png', 16, 16)
    this.load.spritesheet('nova_64', 'assets/images/nova_64.png', 32, 32)
    this.load.spritesheet('alien', 'assets/images/alien.png', 25, 25)
    this.load.spritesheet('target', 'assets/images/target.png', 18, 18) // http://preloaders.net/en/circular
    this.load.image('line', 'assets/images/line.png')
    this.load.image('line_particle_1', 'assets/images/line_particle_1.png')
    this.load.image('line_particle_2', 'assets/images/line_particle_2.png')
    this.load.image('spark', 'assets/images/spark.png')
    this.load.spritesheet('goody', 'assets/images/goody.png', 7, 6)
    this.load.image('goody_border', 'assets/images/goody_border.png')
    this.load.spritesheet('shuttle', 'assets/images/shuttle.png', 32, 32)
    this.load.image('smoke', 'assets/images/smoke.png')
    this.load.image('instructions', 'assets/images/instructions.png')
    this.load.image('earth', 'assets/images/earth.png')
    this.load.image('heart', 'assets/images/heart.png')
    this.load.spritesheet('mute_button', 'assets/images/mute_button.png', 11, 10)

    this.load.image('nova_spark_1', 'assets/images/nova_spark_1.png')
    this.load.image('nova_spark_2', 'assets/images/nova_spark_2.png')
    this.load.image('nova_spark_3', 'assets/images/nova_spark_3.png')
    this.load.image('nova_spark_4', 'assets/images/nova_spark_4.png')

    this.load.image('speechBubble', 'assets/images/speechBubble.png')
    this.load.image('speechBubbleLost', 'assets/images/speechBubbleLost.png')
    this.load.image('speechBubbleRadio', 'assets/images/speechBubbleRadio.png')

    // Load all audio files:
    this.load.audio('collect_goodie', 'assets/sounds/pickup_goodie.wav')
    this.load.audio('alien', 'assets/sounds/alien.mp3')
    this.load.audio('alien_explosion', 'assets/sounds/alien_explosion.mp3')
    this.load.audio('menu_select', 'assets/sounds/menu_select.mp3')
    this.load.audio('gun', 'assets/sounds/gun.wav')
    this.load.audio('absorb', 'assets/sounds/absorb.mp3')
    this.load.audio('victory_menu', 'assets/sounds/victory_menu.mp3')
    this.load.audio('burn', 'assets/sounds/burn.mp3')
    this.load.audio('appearance', 'assets/sounds/appearance.mp3')
    this.load.audio('shuttle_explosion', 'assets/sounds/shuttle_explosion.mp3')
    // Javolenus featuring Nickleus - "C95 - Routine Maintenance Mission"
    this.load.audio('C95', 'assets/sounds/Javolenus_-_C95-RoutineMaintenanceMission.mp3')
    // Karsten Holy Moly - "Space Intro"
    this.load.audio('space_intro', 'assets/sounds/Karstenholymoly_-_Space_Intro.mp3')
    // Deceased Superior Technician (DST) - "ALightIntro"
    this.load.audio('light', 'assets/sounds/DST-ALightIntro.mp3')
  }

  create () {
    if (window.opener && typeof window.opener.level !== 'undefined') {
      currentLevel = 0
      this.state.start('Play')
    } else {
      this.state.start('Menu')
    }
  }
}
