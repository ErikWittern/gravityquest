'use strict'

class BootState extends Phaser.State {
  init () {
    // set some basic options:
    this.stage.backgroundColor = '#000000'
    this.currentLevel = 1
    this.muted = false
    this.stage.smoothed = false
  }

  preload () {
    this.load.image('loadbar_frame', 'assets/images/loadbar_frame.png')
    this.load.image('loadbar', 'assets/images/loadbar.png')

    // scale the game:
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
  }

  render () {
    this.state.start('Load')
  }
}

module.exports = BootState
