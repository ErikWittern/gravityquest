'use strict'

class PauseMenu extends Phaser.Sprite {
  constructor ({ game, playState, message, noResume }) {
    super(game)
    // store reference to play state:
    this.play = playState

    this.noResume = noResume

    // define sounds:
    this.menuSelectSound = game.add.audio('menu_select', 0.5, false)

    // stop emitter and hide line:
    this.play.gunEmitter.on = false
    this.play.line.alpha = 0

    // make menuButton invisible:
    this.play.menuButton.visible = false
    this.play.menuButtonBackground.visible = false

    // create overlay:
    var rectangle = new Phaser.Graphics(game, -50, -50)
    rectangle.beginFill(0x000000, 0.5)
    rectangle.drawRect(-50, -50, game.width + 100, game.height + 100)
    rectangle.endFill()
    this.overlay = game.add.image(-50, -50, rectangle.generateTexture())
    this.overlay.fixedToCamera = true

    // add message, if any
    if (typeof message !== 'undefined') {
      this.menuMessage = game.add.bitmapText(0, 100, 'font_white_32', message, 32)
      this.menuMessage.x = Math.floor(game.width / 2) - this.menuMessage.textWidth * 0.5
      this.menuMessage.fixedToCamera = true
    } else {
      this.menuMessage = game.add.bitmapText(0, 100, 'font_white_32', 'Paused', 32)
      this.menuMessage.x = Math.floor(game.width / 2) - this.menuMessage.textWidth * 0.5
      this.menuMessage.fixedToCamera = true
    }

    // button to resume game:
    if (!noResume) {
      this.resumeText = game.add.bitmapText(Math.floor(game.width / 2) - 50, 250, 'font_white_16', 'Resume', 16)
      this.resumeText.fixedToCamera = true
    }

    // button to restart game:
    this.retryText = game.add.bitmapText(Math.floor(game.width / 2) - 50, 300, 'font_white_16', 'Retry', 16)
    this.retryText.fixedToCamera = true

    // button to go to menu:
    this.menuText = game.add.bitmapText(Math.floor(game.width / 2) - 50, 350, 'font_white_16', 'Menu', 16)
    this.menuText.fixedToCamera = true

    // pause game:
    game.time.events.add(Phaser.Timer.SECOND * 0.2, function () {
      game.paused = true
    })
  }

  processInput (y) {
    if (!this.noResume && y > 240 && y < 290) {
      this.game.paused = false
      this.hidePauseMenu()
      this.menuSelectSound.play()
    } else if (y > 290 && y < 340) {
      this.game.paused = false
      this.game.state.start('Play')
      this.menuSelectSound.play()
    } else if (y > 340 && y < 390) {
      this.game.paused = false
      this.game.state.start('Menu')
      this.menuSelectSound.play()
    }
  }

  hidePauseMenu () {
    if (typeof this.overlay !== 'undefined') { this.overlay.destroy() }
    if (typeof this.menuMessage !== 'undefined') { this.menuMessage.destroy() }
    if (typeof this.resumeText !== 'undefined') { this.resumeText.destroy() }
    if (typeof this.retryText !== 'undefined') { this.retryText.destroy() }
    if (typeof this.menuText !== 'undefined') { this.menuText.destroy() }

    this.play.menuButton.visible = true
    this.play.menuButtonBackground.visible = true
  };
}

module.exports = PauseMenu
