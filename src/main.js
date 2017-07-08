import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import LoadState from './states/Load'
import GameState from './states/Game'
import MenuState from './states/Menu'
import IntroState from './states/Intro'
import PlayState from './states/Play'
import OutroState from './states/Outro'

import config from './config'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
    const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Load', LoadState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Menu', MenuState, false)
    this.state.add('Intro', IntroState, false)
    this.state.add('Play', PlayState, false)
    this.state.add('Outro', OutroState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
