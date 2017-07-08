'use strict'

import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, playState, collectedGoodies }) {
    super(game)

    // store reference to play state:
    this.play = playState

    // define sounds:
    this.menuSelectSound = game.add.audio('menu_select', 0.5, false)
    this.victoryMenu = game.add.audio('victory_menu')

    // sounds:
    game.sound.stopAll()
    this.victoryMenu.play()

    // make menuButton invisible:
    this.play.menuButton.visible = false
    this.play.menuButtonBackground.visible = false

    // create overlay:
    let rectangle = new Phaser.Graphics(game, -50, -50)
    rectangle.beginFill(0x000000, 0.5)
    rectangle.drawRect(-50, -50, game.width + 100, game.height + 100)
    rectangle.endFill()
    this.overlay = game.add.image(-50, -50, rectangle.generateTexture())
    this.overlay.fixedToCamera = true

    // add text message
    let menuText = game.add.bitmapText(0, 100, 'font_white_32', 'Level\ncompleted!', 32)
    menuText.x = Math.floor(game.width / 2) - menuText.textWidth * 0.5
    menuText.align = 'center'
    menuText.fixedToCamera = true

    if (collectedGoodies <= 3) {
      // add borders around collected goodies:
      for (var count = 0; count < 3; count++) {
        var goodyBorder = game.add.sprite(((Math.floor(game.width / 2) - 50) + (50 * count)), 200, 'goody_border')
        goodyBorder.anchor.setTo(0.5, 0.5)
        goodyBorder.scale.setTo(4, 4)
        goodyBorder.fixedToCamera = true
      }

      // add indication of collected goodies:
      for (let count = 0; count < collectedGoodies; count++) {
        let goody = game.add.sprite(((Math.floor(game.width / 2) - 50) + (50 * count)), 200, 'goody')
        goody.anchor.setTo(0.5, 0.5)
        goody.scale.setTo(0, 0)
        goody.fixedToCamera = true
        game.add.tween(goody.scale).to(
          {x: 4.0, y: 4.0},
          500,                      // duration
          Phaser.Easing.Bounce.Out, // easing
          true,                     // autostart
          300 * (count + 1),        // delay
          true                      // no-repeat
        )
      }
    } else {
      let goodiesText = game.add.bitmapText((Math.floor(game.width / 2) - 50), 200, 'font_white_24', collectedGoodies + ' / 40', 24)
      goodiesText.x = Math.floor(game.width * 0.5) - goodiesText.textWidth * 0.5
      goodiesText.align = 'center'
      goodiesText.fixedToCamera = true
    }

    // button to go to next level:
    let nextLevelText = game.add.bitmapText(Math.floor(game.width / 2) - 50, 250, 'font_white_16', 'Next level', 16)
    nextLevelText.fixedToCamera = true
    let nextLevelBtn = game.add.sprite(Math.floor(game.width / 2) - 100, 230, 'empty')
    nextLevelBtn.fixedToCamera = true
    nextLevelBtn.width = 200
    nextLevelBtn.height = 50
    nextLevelBtn.inputEnabled = true
    nextLevelBtn.events.onInputDown.add(() => {
      this.menuSelectSound.play()
      this.play.goToNextLevel()
    })
    // do not show button after last level:
    if (this.currentLevel === 29) {
      nextLevelText.destroy()
      nextLevelBtn.destroy()
    }

    // button to restart level:
    let retryText = game.add.bitmapText(Math.floor(game.width / 2) - 50, 300, 'font_white_16', 'Retry', 16)
    retryText.fixedToCamera = true
    let retryBtn = game.add.sprite(Math.floor(game.width / 2) - 100, 280, 'empty')
    retryBtn.fixedToCamera = true
    retryBtn.width = 200
    retryBtn.height = 50
    retryBtn.inputEnabled = true
    retryBtn.events.onInputDown.add(() => {
      this.menuSelectSound.play()
      game.state.start('Play')
    })

    // button to go to menu:
    let menuText2 = game.add.bitmapText(Math.floor(game.width / 2) - 50, 350, 'font_white_16', 'Menu', 16)
    menuText2.fixedToCamera = true
    let menuBtn = game.add.sprite(Math.floor(game.width / 2) - 100, 330, 'empty')
    menuBtn.fixedToCamera = true
    menuBtn.width = 200
    menuBtn.height = 50
    menuBtn.inputEnabled = true
    menuBtn.events.onInputDown.add(() => {
      this.menuSelectSound.play()
      game.state.start('Menu')
    })
  }
}
