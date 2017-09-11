import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import LoadState from './states/Load'
import MenuState from './states/Menu'
import IntroState from './states/Intro'
import PlayState from './states/Play'
import OutroState from './states/Outro'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    // setup the game:
    super(config.gameWidth, config.gameHeight, Phaser.AUTO, null, null)

    // NOTE: scaling is done in preload function of 'Boot.js'!!!

    this.state.add('Boot', BootState, false)
    this.state.add('Load', LoadState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Intro', IntroState, false)
    this.state.add('Play', PlayState, false)
    this.state.add('Outro', OutroState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
