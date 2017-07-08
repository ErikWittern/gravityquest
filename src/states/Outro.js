'use strict'

import Phaser from 'phaser'
import Utils from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
    // stop all eventually ongoing sounds:
    this.game.sound.stopAll()

    // define sounds:
    this.appearanceSound = this.game.add.audio('appearance', 0.5, false)
    this.music = this.game.add.audio('light')

    this.music.play()

    // credits texts:
    this.creditsMeText = 'Created by\n\nErik Wittern'

    this.creditsPeopleText = 'Big thanks to:\n\n' +
                  '- Martin Boeckle\n' +
                  '- Beni Dietz\n' +
                  '- Gesina Gudehus\n' +
                  '- Gregory Katsaros\n' +
                  '- Malte Schiebelmann\n' +
                  '- Philippe Suter\n' +
                  '- Arne Wittern\n\n' +
                  '...for contributing\nlevels and their\ncritical input!'

    this.creditsCodeText = 'Coded with:\n\n- Phaser.js\n- Cocoon.JS\n- Fabric.js'
    this.creditsArtworkText = 'Artwork created with:\n\n- Pixen App\n- Pixelmator'
    this.creditsTypoText = 'Typography:\n\n- Silkscreen (font)\n- Littera\n- Arcade Font Writer'
    this.creditsSoundText = 'Sound created with:\n\n- CFXR\n- UniversalSoundFX'
    this.creditsMusicText = '"C95 - Routine\nMaintenance Mission"\n\n' +
                  'by Javolenus featuring Nickleus\n' +
                  'available at: http://ccmixter.org/\nfiles/Javolenus/37693\n' +
                  'Under CC BY license\n' +
                  'http://creativecommons.org/\nlicenses/by/3.0/\n\n\n' +

                  '"Space Intro"\n\n' +
                  'by Karsten Holy Moly\n' +
                  'available at: http://dig.ccmixter.org/\nfiles/Karstenholymoly/40799\n' +
                  'Under CC BY license\n' +
                  'http://creativecommons.org/\nlicenses/by/3.0/\n\n\n' +

                  '"ALightIntro"\n\n' +
                  'by Deceased Superior Technician (DST)\n' +
                  'available at: http://www.nosoapradio.us\n' +
                  'Free License for Games and Movies\n' +
                  'http://www.dstgames.com'

    // make the world larger than the actual canvas (for camera to be able to follow):
    this.game.world.setBounds(0, 0, 1424, 1624)

    this.playerX = Math.floor(this.game.width / 2)
    this.playerY = Math.floor(this.game.height / 2) + 50

    // add background:
    this.ground = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background')
    this.ground.scale.setTo(2, 2)

    // add earth:
    this.earth = this.game.add.sprite(this.playerX + 60, this.playerY + 240, 'earth')
    this.earth.anchor.setTo(0.5, 0.5)
    this.earth.scale.setTo(2.0, 2.0)

    // add source:
    this.source = this.game.add.sprite(this.playerX, this.playerY, 'target')
    this.source.scale.setTo(2, 2)
    this.source.anchor.setTo(0.5, 0.5)
    this.source.animations.add('spiral', [7, 6, 5, 4, 3, 2, 1, 9])
    this.source.animations.play('spiral', 6, true)

    // add player:
    this.player = this.game.add.sprite(this.playerX, this.playerY, 'player')
    this.player.animations.add('idle', [0])
    this.player.animations.add('twist', [2])
    this.player.anchor.setTo(0.5, 0.5)
    this.player.scale.setTo(0, 0)

    // make camera follow player:
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN)

    // add shuttle:
    this.shuttle = this.game.add.sprite(this.playerX + 400, this.playerY + 20, 'shuttle')
    this.shuttle.angle = 30
    this.shuttle.anchor.setTo(0.5, 0.5)
    this.shuttle.animations.add('idle', [0])
    this.shuttle.animations.add('damaged', [1])
    this.shuttle.animations.play('idle', 1, false)
    this.shuttle.scale.setTo(2.0, 2.0)

    // add bubble and text:
    this.bubble = this.game.add.sprite(this.playerX, this.playerY - 80, 'speechBubble')
    this.bubble.visible = false
    this.bubbleText = this.game.add.bitmapText(this.player.x + 32, this.player.y - 68, 'font_black_12', '', 12)
    this.bubbleText.visible = false
    this.bubbleText.align = 'center'

    // overlay:
    this.overlay = this.game.add.graphics(0, 0)
    this.overlay.beginFill(0x000000, 1)
    this.overlay.drawRect(0, 0, this.game.world.width, this.game.world.height)
    this.overlay.alpha = 1
    this.overlay.endFill()

    // setup menu button:
    this.menuButton = this.game.add.button(this.game.width - 50, 10, 'menu_button', () => {
      this.game.state.start('Menu')
    })
    this.menuButton.fixedToCamera = true

    // start scenes:
    this.fadeIn()
  }

  fadeIn () {
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(this.overlay).to({alpha: 0}, 800, Phaser.Easing.Quadratic.Out).start()
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.scene0()
    })
  }

  scene0 () {
    // add animation to place player:
    this.player.animations.play('twist')
    this.game.add.tween(this.player).to({angle: 720}, 2000, Phaser.Easing.Quadratic.Out, true, 1500, 0, false)
    this.game.add.tween(this.player.scale).to({x: 1.0, y: 1.0}, 2000, Phaser.Easing.Quadratic.Out, true, 1500, 0, false).onComplete.add(() => {
      this.player.animations.play('idle')
      this.game.add.tween(this.source.scale).to({x: 0, y: 0}, 1000, Phaser.Easing.Quadratic.In, true).onComplete.add(() => {
        this.source.destroy()
        this.scene1()
      })
    })
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.appearanceSound.play()
    })
  }

  scene1 () {
    this.bubble.visible = true
    this.bubbleText.visible = true

    this.bubbleText.setText('Earth!\nI made it!')

    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
      this.scene2()
    })
  }

  scene2 () {
    this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
      this.bubble.visible = false
      this.bubbleText.visible = false
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.speechBubbleRadio = this.game.add.sprite(this.playerX + 20, this.playerY - 150, 'speechBubbleRadio')
      this.radioText = this.game.add.bitmapText(this.playerX + 50, this.playerY - 134, 'font_black_12', 'There is\nsomeone...', 12)
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 6, () => {
      this.radioText.x -= 12
      this.radioText.setText('Hold on! We\'ll\npick you up.')
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 9, () => {
      this.speechBubbleRadio.destroy()
      this.radioText.destroy()
    })

    this.game.time.events.add(Phaser.Timer.SECOND * 11, () => {
      this.scene3()
    })
  }

  scene3 () {
    this.game.add.tween(this.shuttle).to({x: this.player.x - 10}, 4000, Phaser.Easing.Cubic.Out, true).onComplete.add(() => {
      this.scene4()
    })
  }

  scene4 () {
    this.game.add.tween(this.player).to({y: this.player.y + 10}, 1000, Phaser.Easing.Cubic.Out, true).onComplete.add(() => {
      this.player.destroy()
      this.speechBubbleRadio = this.game.add.sprite(this.playerX, this.playerY - 50, 'speechBubbleRadio')
      this.radioText = this.game.add.bitmapText(this.playerX + 28, this.playerY - 32, 'font_black_12', 'Let\'s get\nyou home.', 12)
      this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
        this.speechBubbleRadio.destroy()
        this.radioText.destroy()
        this.scene5()
      })
    })
  }

  scene5 () {
    this.game.add.tween(this.shuttle).to({x: -100, y: this.shuttle.y - 50}, 4000, Phaser.Easing.Cubic.In, true).onComplete.add(() => {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        this.shuttle.scale.y *= -1
        this.scene6()
      })
    })
  }

  scene6 () {
    this.shuttle.angle = 180
    this.game.add.tween(this.shuttle.scale).to({x: 0, y: 0}, 5000, Phaser.Easing.Cubic.Out, true)
    this.game.add.tween(this.shuttle).to({x: this.earth.x, y: this.earth.y}, 5000, Phaser.Easing.Cubic.Out, true).onComplete.add(() => {
      this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
        this.fadeOut()
      })
    })
  }

  fadeOut () {
    this.game.time.events.add(Phaser.Timer.SECOND, () => {
      this.game.add.tween(this.overlay).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.credits1()
      })
    })
  }

  credits1 () {
    // setup credits text:
    this.credits = this.game.add.bitmapText(0, 0, 'font_white_16', this.creditsMeText, 16)
    this.credits.alpha = 0

    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 6, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
          this.credits.setText(this.creditsPeopleText)
          this.credits2()
        })
      })
    })
  }

  credits2 () {
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 8, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits.setText(this.creditsCodeText)
          this.credits3()
        })
      })
    })
  }

  credits3 () {
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits.setText(this.creditsArtworkText)
          this.credits4()
        })
      })
    })
  }

  credits4 () {
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits.setText(this.creditsTypoText)
          this.credits5()
        })
      })
    })
  }

  credits5 () {
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits.setText(this.creditsSoundText)
          this.credits6()
        })
      })
    })
  }

  credits6 () {
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits7()
        })
      })
    })
  }

  credits7 () {
    this.musicCredits = this.game.add.bitmapText(0, 0, 'font_white_12', this.creditsMusicText, 12)
    this.musicCredits.alpha = 0

    this.game.add.tween(this.musicCredits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 7.5, () => {
      this.game.add.tween(this.musicCredits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          this.credits.setText('Made with    in Berlin ')
          this.credits8()
        })
      })
    })
  }

  credits8 () {
    this.heart = this.game.add.sprite(0, 0, 'heart')
    this.heart.anchor.setTo(0.5, 0.5)
    this.heart.scale.setTo(2.0, 2.0)
    this.heart.x = this.game.width * 0.5
    this.heart.y = this.game.height * 0.5
    this.heart.alpha = 0
    this.game.add.tween(this.credits).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()
    this.game.add.tween(this.heart).to({alpha: 1}, 800, Phaser.Easing.Cubic.Out).start()

    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
      this.game.add.tween(this.credits).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start().onComplete.add(() => {
        this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
          // store that outro was viewed:
          Utils.storeLevelResult(26, 0)
          this.game.state.start('Menu')
        })
      })
      this.game.add.tween(this.heart).to({alpha: 0}, 800, Phaser.Easing.Cubic.Out).start()
    })
  }

  update () {
    if (typeof this.credits !== 'undefined') {
      this.credits.x = Math.floor(this.game.width * 0.5) - Math.floor(this.credits.textWidth * 0.5)
      this.credits.y = Math.floor(this.game.height * 0.5) - Math.floor(this.credits.textHeight * 0.5)
    }
    if (typeof this.musicCredits !== 'undefined') {
      this.musicCredits.x = Math.floor(this.game.width * 0.5) - Math.floor(this.musicCredits.textWidth * 0.5)
      this.musicCredits.y = Math.floor(this.game.height * 0.5) - Math.floor(this.musicCredits.textHeight * 0.5)
    }
  }
}
