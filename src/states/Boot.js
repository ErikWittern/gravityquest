'use strict'

import Phaser from 'phaser'

export default class extends Phaser.State {
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
  }

  render () {
    this.state.start('Load')
  }
}
