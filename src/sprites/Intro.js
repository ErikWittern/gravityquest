'use strict'

class Intro extends Phaser.Sprite {
  constructor ({ game, playState, intro }) {
    super(game)

    // store reference to game and play state:
    this.game = game
    this.play = playState

    // destructure the intro arguments:
    this.numScenes = intro.numScenes
    this.playScene = intro.playScene

    // start with 0 scene:
    this.currentScene = 0

    // play the first scene:
    this.playNextScene()

    // overlay to react to clicks:
    let overlay = game.add.sprite(0, 0, 'empty')
    overlay.height = game.height
    overlay.width = game.width
    overlay.inputEnabled = true
    overlay.fixedToCamera = true
    overlay.events.onInputDown.add(() => {
      this.playNextScene(overlay)
    })
  }

  update () {}

  playNextScene (overlay) {
    this.currentScene++
    if (this.currentScene <= this.numScenes) {
      this.playScene(
        this.game,
        this.play.player.x,
        this.play.player.y,
        this.currentScene
      )
    } else {
      this.play.gq.introPlaying = false
      overlay.destroy()
    }
  }
}

module.exports = Intro
