'use strict'

module.exports = [
  // INTRO:
  {},
  // Level 1:
  {
    camera: {
      y: 800
    },
    player: {
      x: 512,
      y: 300,
      key: 'player'
    },
    asteroids: [
      {
        x: 508,
        y: 380,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 508,
      y: 526,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    intro: {
      numScenes: 5,
      playScene (game, x, y, scene) {
        if (scene === 1) {
          this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
          this.text = game.add.bitmapText(x + 30, y - 80 + 6 + 12, 'font_black_12', 'Where am I?', 12)
        } else if (scene === 2) {
          this.text.setText('Another\nblack hole...')
          this.text.x = x + 18
          this.text.y = y - 80 + 6 + 6
        } else if (scene === 3) {
          this.text.setText('Well, let\'s collect\nall minerals and\ntry to reach it.')
          this.text.x = x + 6
          this.text.y = y - 80 + 6
        } else if (scene === 4) {
          this.bubble.destroy()
          this.text.destroy()
        // overlay:
          this.overlay = game.add.graphics(0, 0)
          this.overlay.beginFill(0x000000, 1)
          this.overlay.drawRect(0, 0, game.world.width, game.world.height)
          this.overlay.alpha = 0.7
          this.overlay.endFill()
        // instructions:
          this.instructions = game.add.sprite(Math.floor(game.width / 2), Math.floor(game.height / 2), 'instructions')
          this.instructions.anchor.setTo(0.5, 0.5)
          this.instructions.scale.setTo(2, 2)
          this.instructions.fixedToCamera = true
        // title
          this.title = game.add.bitmapText(0, Math.floor(game.height / 2) - 120, 'font_white_16', 'Tap anywhere on the\nscreen to use\nthe gravitygun...\n \n \n \n \n \n \n \n \n \n \n...and the player will\naccelerate to the\nnearest asteroid.', 16)
          this.title.x = Math.floor(game.width / 2) - this.title.textWidth / 2
          this.title.fixedToCamera = true
        } else if (scene === 5) {
          this.instructions.destroy()
          this.title.destroy()
          this.overlay.destroy()
        }
      }
    },
    numIntroScenes: 5,
    goodies: [
      {
        x: 515,
        y: 430
      },
      {
        x: 500,
        y: 480
      },
      {
        x: 512,
        y: 255
      }
    ]
  },
  // Level 2: "Simpler intro to gravity slingshots" by Philippe Suter
  {
    player: {
      x: 431,
      y: 607,
      key: 'player'
    },
    asteroids: [
      {
        x: 680,
        y: 410,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 465,
        y: 548,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 606,
      y: 307,
      key: 'target',
      radius: 18
    },
    goodies: [
      {
        x: 687,
        y: 514
      },
      {
        x: 776,
        y: 361
      },
      {
        x: 517,
        y: 460
      }
    ],
    maxDistance: 250
  },
  // Level 3:
  {
    player: {
      x: 345,
      y: 209,
      key: 'player'
    },
    asteroids: [
      {
        x: 514,
        y: 314,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 287,
      y: 171,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 317,
        y: 193
      },
      {
        x: 450,
        y: 271
      },
      {
        x: 700,
        y: 430
      }
    ]
  },
  // Level 4:
  {
    player: {
      x: 481,
      y: 280,
      key: 'player'
    },
    asteroids: [
      {
        x: 473,
        y: 381,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 536,
        y: 521,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 374,
      y: 564,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 440,
        y: 320,
        key: 'nova_32',
        radius: '16'
      },
      {
        x: 538,
        y: 620,
        key: 'nova_32',
        radius: '16'
      }
    ],
    goodies: [
      {
        x: 578,
        y: 574
      },
      {
        x: 701,
        y: 474
      },
      {
        x: 528,
        y: 473
      }
    ],
    maxDistance: 250,
    intro: function (game, x, y, scene) {
      if (scene === 1) {
        game.playerControls = false
        this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
        this.text = game.add.bitmapText(x + 8, y - 74, 'font_black_12', '\n   Dwarf novae!', 12)
      } else if (scene === 2) {
        this.text.setText('Pure, burning\nhydrogen. Better\nkeep my distance...')
      } else if (scene === 3) {
        if (this.bubble) {
          this.bubble.destroy()
        }
        if (this.text) {
          this.text.destroy()
        }
        game.playerControls = true
      }
    }
  },
  // Level 5:
  {
    player: {
      x: 600,
      y: 600,
      key: 'player'
    },
    target: {
      x: 600,
      y: 300,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 700,
        y: 500,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 680,
        y: 400,
        key: 'asteroid_64',
        radius: 32
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 570,
        y: 264
      },
      {
        x: 741,
        y: 451
      },
      {
        x: 711,
        y: 294
      }
    ]
  },
  // Level 6:
  {
    player: {
      x: 600,
      y: 600,
      key: 'player'
    },
    target: {
      x: 600,
      y: 670,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 500,
        y: 500,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 485,
        y: 400,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 630,
        y: 400,
        key: 'asteroid_64',
        radius: 32
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 723,
        y: 393
      },
      {
        x: 537,
        y: 274
      },
      {
        x: 644,
        y: 576
      }
    ],
    intro: function (game, x, y, scene) {
      if (scene == 1) {
        game.playerControls = false
        this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
        this.text = game.add.bitmapText(x + 30, y - 68, 'font_black_12', 'So close...\nYet so far...', 12)
      } else if (scene == 2) {
        if (this.bubble) {
          this.bubble.destroy()
        }
        if (this.text) {
          this.text.destroy()
        }
        game.playerControls = true
      }
    }
  },
  // Level 7:
  {
    player: {
      x: 417,
      y: 381,
      key: 'player'
    },
    asteroids: [
      {
        x: 474,
        y: 381,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 560,
        y: 333,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 273,
        y: 451,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 281,
        y: 277,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 119,
        y: 565,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 389,
        y: 242,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 732,
        y: 407,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 442,
        y: 517,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      }
    ],
    target: {
      x: 244,
      y: 641,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 440,
        y: 330,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 372,
        y: 327,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 270,
        y: 388,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 551,
        y: 243,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 280,
        y: 531,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 341,
        y: 516,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 202,
        y: 558,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 304,
        y: 158,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 491,
        y: 458,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 114,
        y: 654,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 62,
        y: 552
      },
      {
        x: 319,
        y: 362
      },
      {
        x: 558,
        y: 288
      }
    ],
    antiForceFields: []
  },
  // Level 8:
  {
    player: {
      x: 600,
      y: 630,
      key: 'player'
    },
    target: {
      x: 588,
      y: 336,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 596,
        y: 559,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 546,
        y: 499,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 589,
        y: 411,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 590,
        y: 372
      },
      {
        x: 628,
        y: 413
      },
      {
        x: 542,
        y: 399
      }
    ],
    intro: function (game, x, y, scene) {
      if (scene == 1) {
        game.playerControls = false
        this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
        this.text = game.add.bitmapText(x + 20, y - 72, 'font_black_12', 'Thermo-active\nasteroids...\nYikes!', 12)
      } else if (scene == 2) {
        if (this.bubble) {
          this.bubble.destroy()
        }
        if (this.text) {
          this.text.destroy()
        }
        game.playerControls = true
      }
    }
  },
  // Level 9:
  {
    camera: {
      x: 0,
      y: 800
    },
    player: {
      x: 602,
      y: 328,
      key: 'player'
    },
    target: {
      x: 527,
      y: 691,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 594,
        y: 381,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 493,
        y: 474,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 529,
        y: 621,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 532,
        y: 488,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 570,
        y: 546,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 451,
        y: 538,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 459,
        y: 615,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 397,
        y: 593
      },
      {
        x: 433,
        y: 468
      },
      {
        x: 494,
        y: 661
      }
    ]
  },
  // Level 10:
  {
    player: {
      x: 452,
      y: 628,
      key: 'player'
    },
    asteroids: [
      {
        x: 442,
        y: 564,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 346,
        y: 299,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 482,
        y: 472,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 685,
        y: 416,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 655,
        y: 284,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 537,
      y: 188,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 349,
        y: 217
      },
      {
        x: 628,
        y: 495
      },
      {
        x: 711,
        y: 242
      }
    ],
    antiForceFields: []
  },
  // Level 11:
  {
    camera: {
      x: 0
    },
    player: {
      x: 604,
      y: 332,
      key: 'player'
    },
    target: {
      x: 619,
      y: 448,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 511,
        y: 333,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 426,
        y: 396,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 526,
        y: 447,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 375,
        y: 452,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 329,
        y: 370,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 554,
        y: 520,
        key: 'nova_32',
        radius: '16'
      },
      {
        x: 354,
        y: 504,
        key: 'nova_32',
        radius: '16'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 348,
        y: 388
      },
      {
        x: 346,
        y: 549
      },
      {
        x: 541,
        y: 483
      }
    ]
  },
  // Level 12:
  {
    camera: {
      x: 0,
      y: 1000
    },
    player: {
      x: 512,
      y: 220,
      key: 'player'
    },
    target: {
      x: 490,
      y: 550,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 512,
        y: 270,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 480,
        y: 350,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    novae: [
      {
        x: 500,
        y: 440,
        key: 'nova_64',
        radius: 32
      }
    ],
    antiForceFields: [
      {
        x: 380,
        y: 450,
        radius: 48,
        key: 'antiForceField_96'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 505,
        y: 59
      },
      {
        x: 456,
        y: 402
      },
      {
        x: 449,
        y: 510
      }
    ],
    intro: function (game, x, y, scene) {
      if (scene == 1) {
        game.playerControls = false
        this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
        this.text = game.add.bitmapText(x + 8, y - 72, 'font_black_12', 'Anti-gravi-\ntational force\nfields! Nifty!', 12)
      } else if (scene == 2) {
        if (this.bubble) {
          this.bubble.destroy()
        }
        if (this.text) {
          this.text.destroy()
        }
        game.playerControls = true
      }
    }
  },
  // Level 13: "Hide & seek" by Malte Schiebelmann
  {
    camera: {
      x: 0,
      y: 800
    },
    player: {
      x: 528,
      y: 367,
      key: 'player'
    },
    target: {
      x: 527,
      y: 691,
      key: 'target',
      radius: 18
    },
    maxDistance: 250,
    antiForceFields: [],
    aliens: [],
    asteroids: [
      {
        x: 531,
        y: 434,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 680,
        y: 557,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    novae: [
      {
        x: 517,
        y: 627,
        key: 'nova_64',
        radius: 32
      }
    ],
    goodies: [
      {
        x: 787,
        y: 552
      },
      {
        x: 459,
        y: 536
      },
      {
        x: 666,
        y: 509
      }
    ]
  },
  // Level 14: by Philippe Suter:
  {
    player: {
      x: 390,
      y: 232,
      key: 'player'
    },
    target: {
      x: 475,
      y: 250,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 346,
        y: 397,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 508,
        y: 394,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 264,
        y: 235,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 668,
        y: 300,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    antiForceFields: [
      {
        x: 327,
        y: 208,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 288,
        y: 506,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 471,
        y: 551,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 772,
        y: 218,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    novae: [
      {
        x: 428,
        y: 236,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 443,
        y: 286,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 490,
        y: 295,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 506,
        y: 191,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 452,
        y: 187,
        key: 'nova_64',
        radius: 32
      }
    ],
    aliens: [],
    goodies: [
      {
        x: 339,
        y: 468
      },
      {
        x: 466,
        y: 494
      },
      {
        x: 753,
        y: 329
      }
    ],
    maxDistance: 250
  },
  // Level 15:
  {
    player: {
      x: 480,
      y: 70,
      key: 'player'
    },
    asteroids: [
      {
        x: 478,
        y: 221,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 558,
        y: 411,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 714,
        y: 463,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 742,
      y: 581,
      key: 'target',
      radius: 18
    },
    novae: [],
    aliens: [
      {
        x: 401,
        y: 229
      },
      {
        x: 557,
        y: 229
      },
      {
        x: 939,
        y: 378,
        key: 'alien'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 478,
        y: 288
      },
      {
        x: 552,
        y: 463
      },
      {
        x: 816,
        y: 441
      }
    ],
    intro: function (game, x, y, scene) {
      if (scene == 1) {
        game.playerControls = false
        this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
        this.text = game.add.bitmapText(x + 10, y - 68, 'font_black_12', 'UFOs?! You\ngotta be kidding...', 12)
      } else if (scene == 2) {
        if (this.bubble) {
          this.bubble.destroy()
        }
        if (this.text) {
          this.text.destroy()
        }
        game.playerControls = true
      }
    }
  },
  // Level 16: "Speed" by Beni Dietz
  {
    player: {
      x: 468,
      y: 49,
      key: 'player'
    },
    asteroids: [
      {
        x: 466,
        y: 102,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 437,
        y: 355,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 425,
        y: 545,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 438,
        y: 752,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 447,
        y: 185,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 473,
      y: 918,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 408,
        y: 703
      },
      {
        x: 410,
        y: 315
      },
      {
        x: 462,
        y: 497
      }
    ],
    aliens: [
      {
        x: 490,
        y: 832,
        key: 'alien'
      },
      {
        x: 375,
        y: 626,
        key: 'alien'
      },
      {
        x: 506,
        y: 448,
        key: 'alien'
      },
      {
        x: 377,
        y: 240,
        key: 'alien'
      }
    ]
  },
  // Level 17:
  {
    player: {
      x: 124,
      y: 435,
      key: 'player'
    },
    target: {
      x: 707,
      y: 244,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 205,
        y: 424,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 301,
        y: 492,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 451,
        y: 513,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 608,
        y: 502,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 447,
        y: 317,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 627,
        y: 399,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    antiForceFields: [
      {
        x: 763,
        y: 469,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 328,
        y: 605,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    novae: [
      {
        x: 386,
        y: 401,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 507,
        y: 453,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 589,
        y: 581,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 631,
        y: 551,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 653,
        y: 506,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 583,
        y: 368,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 674,
        y: 378,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 635,
        y: 314,
        key: 'nova_64',
        radius: 32
      }
    ],
    aliens: [],
    maxDistance: 250,
    goodies: [
      {
        x: 444,
        y: 425
      },
      {
        x: 421,
        y: 350
      },
      {
        x: 725,
        y: 330
      }
    ]
  },
  // Level 18: "Trust" by Beni Dietz
  {
    player: {
      x: 512,
      y: 300,
      key: 'player'
    },
    asteroids: [
      {
        x: 508,
        y: 380,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 407,
        y: 630,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 422,
      y: 882,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 519,
        y: 577
      },
      {
        x: 318,
        y: 584
      },
      {
        x: 606,
        y: 396
      }
    ],
    antiForceFields: [
      {
        x: 547,
        y: 520,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 308,
        y: 700,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 301,
        y: 788,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 414,
        y: 743,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 336,
        y: 877,
        key: 'antiForceField_64',
        radius: 32
      }
    ]
  },
  // Level 19: "Alien chase" by Gregory Katsaros
  {
    camera: {
      y: 800
    },
    player: {
      x: 592,
      y: 269,
      key: 'player'
    },
    forceFields: [
      {
        x: 508,
        y: 420,
        key: 'forceField_32',
        radius: 16
      },
      {
        x: 362,
        y: 550,
        key: 'forceField_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 508,
      y: 526,
      key: 'target',
      radius: 18
    },
    enemies: [],
    maxDistance: 250,
    antiForceFields: [
      {
        x: 383,
        y: 463,
        key: 'antiForceField_64',
        radius: 32
      }
    ],
    aliens: [
      {
        x: 597,
        y: 527,
        key: 'alien'
      },
      {
        x: 828,
        y: 515,
        key: 'alien'
      },
      {
        x: 669,
        y: 754,
        key: 'alien'
      }
    ],
    asteroids: [
      {
        x: 388,
        y: 638,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 653,
        y: 473,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 776,
        y: 647,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 553,
        y: 660,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      }
    ],
    novae: [
      {
        x: 774,
        y: 454,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 669,
        y: 635,
        key: 'nova_32',
        radius: 16
      }
    ],
    goodies: [
      {
        x: 447,
        y: 452
      },
      {
        x: 967,
        y: 656
      },
      {
        x: 774,
        y: 688
      }
    ]
  },
  // Level 20: "An easy one" by Gregory Katsaros
  {
    camera: {
      y: 800
    },
    player: {
      x: 144,
      y: 34,
      key: 'player'
    },
    forceFields: [
      {
        x: 508,
        y: 420,
        key: 'forceField_32',
        radius: 16
      },
      {
        x: 362,
        y: 550,
        key: 'forceField_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 781,
      y: 858,
      key: 'target',
      radius: 18
    },
    enemies: [],
    maxDistance: 250,
    antiForceFields: [],
    aliens: [],
    asteroids: [
      {
        x: 236,
        y: 69,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 844,
        y: 103,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 280,
        y: 203,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 433,
        y: 53,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 583,
        y: 402,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 604,
        y: 74,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 387,
        y: 172,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 166,
        y: 177,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 511,
        y: 166,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 581,
        y: 28,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 602,
        y: 290,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 815,
        y: 216,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 685,
        y: 402,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 925,
        y: 281,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 987,
        y: 38,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 922,
        y: 501,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 752,
        y: 512,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 731,
        y: 41,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 696,
        y: 984,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 773,
        y: 645,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 813,
        y: 759,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 444,
        y: 316,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 570,
        y: 533,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 552,
        y: 743,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 857,
        y: 366,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      }
    ],
    novae: [
      {
        x: 1,
        y: 11,
        key: 'nova_64',
        radius: 32
      }
    ],
    goodies: [
      {
        x: 479,
        y: 90
      },
      {
        x: 786,
        y: 30
      },
      {
        x: 502,
        y: 518
      }
    ]
  },
  // Level 21:
  {
    player: {
      x: 217,
      y: 423,
      key: 'player'
    },
    asteroids: [
      {
        x: 316,
        y: 580,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 243,
        y: 498,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 555,
        y: 383,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 433,
        y: 208,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 313,
        y: 214,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 316,
        y: 255,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 217,
      y: 253,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 490,
        y: 518,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 514,
        y: 336,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 491,
        y: 198,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 347,
        y: 299,
        key: 'nova_64',
        radius: 32
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 505,
        y: 268
      },
      {
        x: 492,
        y: 439
      },
      {
        x: 398,
        y: 517
      }
    ],
    antiForceFields: [
      {
        x: 386,
        y: 431,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 641,
        y: 263,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 22: "The stupid snail (not very proud of it...)" by Gregory Katsaros
  {
    player: {
      x: 182,
      y: 226,
      key: 'player'
    },
    asteroids: [
      {
        x: 175,
        y: 124,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 334,
        y: 896,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 591,
        y: 927,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 864,
        y: 627,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 788,
        y: 835,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 74,
        y: 475,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 172,
        y: 740,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 723,
        y: 469,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 515,
        y: 532,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 628,
      y: 678,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    antiForceFields: [
      {
        x: 146,
        y: 419,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 284,
        y: 748,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 163,
        y: 514,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 195,
        y: 599,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 232,
        y: 678,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 703,
        y: 810,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 772,
        y: 748,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 613,
        y: 838,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 524,
        y: 844,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 128,
        y: 342,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 543,
        y: 586,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 582,
        y: 547,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 603,
        y: 599,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 346,
        y: 807,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 432,
        y: 839,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 770,
        y: 656,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 741,
        y: 576,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 657,
        y: 533,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    goodies: [
      {
        x: 254,
        y: 578
      },
      {
        x: 513,
        y: 777
      },
      {
        x: 702,
        y: 644
      }
    ]
  },
  // Level 23:
  {
    camera: {
      y: 800
    },
    player: {
      x: 502,
      y: 29,
      key: 'player'
    },
    asteroids: [
      {
        x: 500,
        y: 82,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 465,
        y: 133,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 527,
        y: 241,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 591,
        y: 438,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 584,
        y: 314,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 410,
        y: 295,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 346,
        y: 417,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 494,
      y: 547,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 440,
        y: 182,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 536,
        y: 186,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 510,
        y: 360,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 653,
        y: 392,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 452,
        y: 368,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 598,
        y: 249
      },
      {
        x: 623,
        y: 355
      },
      {
        x: 498,
        y: 461
      }
    ]
  },
  // Level 24:
  {
    player: {
      x: 994,
      y: 433,
      key: 'player'
    },
    asteroids: [
      {
        x: 929,
        y: 434,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 803,
        y: 356,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 667,
        y: 358,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 565,
        y: 453,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 497,
        y: 357,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 557,
      y: 286,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 390,
        y: 413,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 553,
        y: 382,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 711,
        y: 422,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 564,
        y: 505,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 408,
        y: 474,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 712,
        y: 274,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 565,
        y: 541,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 480,
        y: 427
      },
      {
        x: 642,
        y: 461
      },
      {
        x: 802,
        y: 427
      }
    ],
    antiForceFields: [
      {
        x: 563,
        y: 610,
        key: 'antiForceField_64',
        radius: 32
      }
    ]
  },
  // Level 25: "Decision Time" by Beni Dietz
  {
    player: {
      x: 507,
      y: 58,
      key: 'player'
    },
    target: {
      x: 513,
      y: 750,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 447,
        y: 312,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 508,
        y: 254,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 579,
        y: 364,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 369,
        y: 593,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 289,
        y: 592,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 211,
        y: 594,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 132,
        y: 591,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 56,
        y: 587,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 651,
        y: 561,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 603,
        y: 709,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 699,
        y: 628,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 730,
        y: 737,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    antiForceFields: [
      {
        x: 513,
        y: 424,
        key: 'antiForceField_64',
        radius: 32
      }
    ],
    novae: [
      {
        x: 536,
        y: 711,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 554,
        y: 742,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 546,
        y: 777,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 513,
        y: 789,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 501,
        y: 706,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 476,
        y: 790,
        key: 'nova_32',
        radius: 16
      }
    ],
    aliens: [],
    maxDistance: 250,
    goodies: [
      {
        x: 545,
        y: 81
      },
      {
        x: 470,
        y: 707
      },
      {
        x: 506,
        y: 21
      }
    ]
  },
  // OUTRO:
  {},
  // BONUS:
  // Level 27: 'Sudden death' - by Martin Boeckle
  {
    camera: {
      y: 800
    },
    player: {
      x: 236,
      y: 399,
      key: 'player'
    },
    asteroids: [
      {
        x: 337,
        y: 538,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 441,
        y: 495,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 384,
        y: 351,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 556,
        y: 411,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 499,
        y: 624,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 628,
        y: 495,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 381,
        y: 680,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 375,
      y: 609,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 628,
        y: 373,
        key: 'nova_64',
        radius: 32
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 241,
        y: 488
      },
      {
        x: 519,
        y: 344
      },
      {
        x: 538,
        y: 463
      }
    ],
    antiForceFields: [
      {
        x: 255,
        y: 607,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 28:
  {
    player: {
      x: 868,
      y: 861,
      key: 'player'
    },
    target: {
      x: 292,
      y: 550,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 664,
        y: 844,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 806,
        y: 887,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 572,
        y: 629,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 435,
        y: 599,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 342,
        y: 439,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 675,
        y: 792,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 590,
        y: 675,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 479,
        y: 567,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 346,
        y: 495,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 626,
        y: 798,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 610,
        y: 629,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 412,
        y: 515
      },
      {
        x: 516,
        y: 636
      },
      {
        x: 654,
        y: 722
      }
    ],
    antiForceFields: [
      {
        x: 547,
        y: 805,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 639,
        y: 557,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 370,
        y: 648,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 29:
  {
    player: {
      x: 878,
      y: 623,
      key: 'player'
    },
    asteroids: [
      {
        x: 630,
        y: 620,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 500,
        y: 500,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 775,
        y: 640,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 500,
      y: 368,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 540,
        y: 440
      },
      {
        x: 460,
        y: 440
      },
      {
        x: 480,
        y: 440
      },
      {
        x: 500,
        y: 440
      },
      {
        x: 520,
        y: 440
      },
      {
        x: 540,
        y: 460
      },
      {
        x: 460,
        y: 460
      },
      {
        x: 480,
        y: 460
      },
      {
        x: 500,
        y: 460
      },
      {
        x: 520,
        y: 460
      },
      {
        x: 540,
        y: 540
      },
      {
        x: 460,
        y: 540
      },
      {
        x: 480,
        y: 540
      },
      {
        x: 500,
        y: 540
      },
      {
        x: 520,
        y: 540
      },
      {
        x: 540,
        y: 560
      },
      {
        x: 460,
        y: 560
      },
      {
        x: 480,
        y: 560
      },
      {
        x: 500,
        y: 560
      },
      {
        x: 520,
        y: 560
      },
      {
        x: 540,
        y: 520
      },
      {
        x: 540,
        y: 500
      },
      {
        x: 540,
        y: 480
      },
      {
        x: 460,
        y: 520
      },
      {
        x: 460,
        y: 500
      },
      {
        x: 460,
        y: 480
      },
      {
        x: 440,
        y: 440
      },
      {
        x: 440,
        y: 460
      },
      {
        x: 440,
        y: 480
      },
      {
        x: 440,
        y: 500
      },
      {
        x: 440,
        y: 520
      },
      {
        x: 440,
        y: 540
      },
      {
        x: 440,
        y: 560
      },
      {
        x: 560,
        y: 440
      },
      {
        x: 560,
        y: 460
      },
      {
        x: 560,
        y: 480
      },
      {
        x: 560,
        y: 500
      },
      {
        x: 560,
        y: 520
      },
      {
        x: 560,
        y: 540
      },
      {
        x: 560,
        y: 560
      }
    ]
  }
]
