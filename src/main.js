'use strict'

// Setting globals, see:
//   https://www.npmjs.com/package/phaser-ce#browserify--commonjs
window.PIXI   = require('phaser-ce/build/custom/pixi');
window.p2     = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

const BootState = require('./states/Boot')
const LoadState = require('./states/Load')
const MenuState = require('./states/Menu')
const IntroState = require('./states/Intro')
const PlayState = require('./states/Play')
const OutroState = require('./states/Outro')

const config = require('./config')

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
