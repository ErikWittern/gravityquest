'use strict'

module.exports = [
  // INTRO:
  {},
  // Level 1:
  {
    player: {
      x: 712,
      y: 600,
      key: 'player'
    },
    asteroids: [
      {
        x: 708,
        y: 680,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 708,
      y: 826,
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
    goodies: [
      {
        x: 715,
        y: 730
      },
      {
        x: 700,
        y: 780
      },
      {
        x: 712,
        y: 555
      }
    ]
  },
  // Level 2: "Simpler intro to gravity slingshots" by Philippe Suter
  {
    player: {
      x: 631,
      y: 907,
      key: 'player'
    },
    asteroids: [
      {
        x: 880,
        y: 710,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 665,
        y: 848,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 806,
      y: 607,
      key: 'target',
      radius: 18
    },
    goodies: [
      {
        x: 887,
        y: 814
      },
      {
        x: 976,
        y: 661
      },
      {
        x: 717,
        y: 760
      }
    ],
    maxDistance: 250
  },
  // Level 3:
  {
    player: {
      x: 545,
      y: 509,
      key: 'player'
    },
    asteroids: [
      {
        x: 714,
        y: 614,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 487,
      y: 371,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 517,
        y: 493
      },
      {
        x: 650,
        y: 571
      },
      {
        x: 900,
        y: 730
      }
    ]
  },
  // Level 4:
  {
    player: {
      x: 681,
      y: 580,
      key: 'player'
    },
    asteroids: [
      {
        x: 673,
        y: 681,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 736,
        y: 821,
        key: 'asteroid_32',
        radius: 16
      }
    ],
    target: {
      x: 574,
      y: 864,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 640,
        y: 620,
        key: 'nova_32',
        radius: '16'
      },
      {
        x: 738,
        y: 920,
        key: 'nova_32',
        radius: '16'
      }
    ],
    goodies: [
      {
        x: 778,
        y: 874
      },
      {
        x: 901,
        y: 774
      },
      {
        x: 728,
        y: 773
      }
    ],
    maxDistance: 250,
    intro: {
      numScenes: 5,
      playScene (game, x, y, scene) {
        if (scene === 1) {
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
        }
      }
    }
  },
  // Level 5:
  {
    player: {
      x: 800,
      y: 900,
      key: 'player'
    },
    target: {
      x: 800,
      y: 600,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 900,
        y: 800,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 880,
        y: 700,
        key: 'asteroid_64',
        radius: 32
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 770,
        y: 564
      },
      {
        x: 941,
        y: 751
      },
      {
        x: 911,
        y: 394
      }
    ]
  },
  // Level 6:
  {
    player: {
      x: 800,
      y: 900,
      key: 'player'
    },
    target: {
      x: 800,
      y: 970,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 600,
        y: 800,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 685,
        y: 700,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 830,
        y: 700,
        key: 'asteroid_64',
        radius: 32
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 923,
        y: 693
      },
      {
        x: 737,
        y: 574
      },
      {
        x: 844,
        y: 876
      }
    ],
    intro: {
      numScenes: 2,
      playScene (game, x, y, scene) {
        if (scene === 1) {
          this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
          this.text = game.add.bitmapText(x + 30, y - 68, 'font_black_12', 'So close...\nYet so far...', 12)
        } else if (scene === 2) {
          if (this.bubble) {
            this.bubble.destroy()
          }
          if (this.text) {
            this.text.destroy()
          }
        }
      }
    }
  },
  // Level 7:
  {
    player: {
      x: 617,
      y: 681,
      key: 'player'
    },
    asteroids: [
      {
        x: 674,
        y: 681,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 760,
        y: 633,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 473,
        y: 751,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 481,
        y: 577,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 319,
        y: 865,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 589,
        y: 542,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 932,
        y: 707,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 642,
        y: 817,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      }
    ],
    target: {
      x: 444,
      y: 941,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 640,
        y: 630,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 572,
        y: 627,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 470,
        y: 688,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 751,
        y: 543,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 480,
        y: 831,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 541,
        y: 816,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 402,
        y: 858,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 504,
        y: 458,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 691,
        y: 758,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 314,
        y: 954,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 262,
        y: 852
      },
      {
        x: 519,
        y: 662
      },
      {
        x: 758,
        y: 588
      }
    ],
    antiForceFields: []
  },
  // Level 8:
  {
    player: {
      x: 800,
      y: 930,
      key: 'player'
    },
    target: {
      x: 788,
      y: 636,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 796,
        y: 859,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 746,
        y: 799,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 789,
        y: 711,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 790,
        y: 672
      },
      {
        x: 828,
        y: 713
      },
      {
        x: 742,
        y: 699
      }
    ],
    intro: {
      numScenes: 2,
      playScene (game, x, y, scene) {
        if (scene === 1) {
          this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
          this.text = game.add.bitmapText(x + 20, y - 72, 'font_black_12', 'Thermo-active\nasteroids...\nYikes!', 12)
        } else if (scene === 2) {
          if (this.bubble) {
            this.bubble.destroy()
          }
          if (this.text) {
            this.text.destroy()
          }
        }
      }
    }
  },
  // Level 9:
  {
    player: {
      x: 802,
      y: 628,
      key: 'player'
    },
    target: {
      x: 727,
      y: 991,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 794,
        y: 681,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 693,
        y: 774,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 729,
        y: 921,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 732,
        y: 788,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 770,
        y: 846,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 651,
        y: 838,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 659,
        y: 915,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 597,
        y: 893
      },
      {
        x: 633,
        y: 768
      },
      {
        x: 694,
        y: 961
      }
    ]
  },
  // Level 10:
  {
    player: {
      x: 652,
      y: 928,
      key: 'player'
    },
    asteroids: [
      {
        x: 642,
        y: 864,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 546,
        y: 599,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 682,
        y: 772,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 885,
        y: 716,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 855,
        y: 584,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 737,
      y: 488,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 549,
        y: 517
      },
      {
        x: 828,
        y: 795
      },
      {
        x: 911,
        y: 542
      }
    ],
    antiForceFields: []
  },
  // Level 11:
  {
    player: {
      x: 804,
      y: 632,
      key: 'player'
    },
    target: {
      x: 819,
      y: 748,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 711,
        y: 633,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 626,
        y: 696,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 726,
        y: 747,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 575,
        y: 752,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 529,
        y: 670,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 754,
        y: 820,
        key: 'nova_32',
        radius: '16'
      },
      {
        x: 554,
        y: 804,
        key: 'nova_32',
        radius: '16'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 548,
        y: 688
      },
      {
        x: 546,
        y: 849
      },
      {
        x: 741,
        y: 783
      }
    ]
  },
  // Level 12:
  {
    player: {
      x: 712,
      y: 520,
      key: 'player'
    },
    target: {
      x: 690,
      y: 750,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 712,
        y: 570,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 680,
        y: 650,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    novae: [
      {
        x: 700,
        y: 740,
        key: 'nova_64',
        radius: 32
      }
    ],
    antiForceFields: [
      {
        x: 580,
        y: 750,
        radius: 48,
        key: 'antiForceField_96'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 705,
        y: 359
      },
      {
        x: 656,
        y: 702
      },
      {
        x: 649,
        y: 810
      }
    ],
    intro: {
      numScenes: 2,
      playScene (game, x, y, scene) {
        if (scene === 1) {
          this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
          this.text = game.add.bitmapText(x + 8, y - 72, 'font_black_12', 'Anti-gravi-\ntational force\nfields! Nifty!', 12)
        } else if (scene === 2) {
          if (this.bubble) {
            this.bubble.destroy()
          }
          if (this.text) {
            this.text.destroy()
          }
        }
      }
    }
  },
  // Level 13: "Hide & seek" by Malte Schiebelmann
  {
    player: {
      x: 728,
      y: 667,
      key: 'player'
    },
    target: {
      x: 727,
      y: 991,
      key: 'target',
      radius: 18
    },
    maxDistance: 250,
    antiForceFields: [],
    aliens: [],
    asteroids: [
      {
        x: 731,
        y: 734,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 880,
        y: 857,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    novae: [
      {
        x: 717,
        y: 927,
        key: 'nova_64',
        radius: 32
      }
    ],
    goodies: [
      {
        x: 987,
        y: 852
      },
      {
        x: 659,
        y: 836
      },
      {
        x: 866,
        y: 809
      }
    ]
  },
  // Level 14: by Philippe Suter:
  {
    player: {
      x: 590,
      y: 532,
      key: 'player'
    },
    target: {
      x: 675,
      y: 550,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 546,
        y: 697,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 708,
        y: 694,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 464,
        y: 535,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 868,
        y: 600,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    antiForceFields: [
      {
        x: 527,
        y: 508,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 488,
        y: 806,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 671,
        y: 851,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 972,
        y: 518,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    novae: [
      {
        x: 628,
        y: 536,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 643,
        y: 386,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 690,
        y: 595,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 706,
        y: 491,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 652,
        y: 487,
        key: 'nova_64',
        radius: 32
      }
    ],
    aliens: [],
    goodies: [
      {
        x: 539,
        y: 768
      },
      {
        x: 666,
        y: 794
      },
      {
        x: 953,
        y: 629
      }
    ],
    maxDistance: 250
  },
  // Level 15:
  {
    player: {
      x: 680,
      y: 370,
      key: 'player'
    },
    asteroids: [
      {
        x: 678,
        y: 521,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 758,
        y: 711,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 914,
        y: 763,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 942,
      y: 881,
      key: 'target',
      radius: 18
    },
    novae: [],
    aliens: [
      {
        x: 601,
        y: 529
      },
      {
        x: 757,
        y: 529
      },
      {
        x: 1139,
        y: 678,
        key: 'alien'
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 678,
        y: 588
      },
      {
        x: 752,
        y: 763
      },
      {
        x: 1016,
        y: 741
      }
    ],
    intro: {
      numScenes: 2,
      playScene (game, x, y, scene) {
        if (scene === 1) {
          this.bubble = game.add.sprite(x, y - 80, 'speechBubble')
          this.text = game.add.bitmapText(x + 10, y - 68, 'font_black_12', 'UFOs?! You\ngotta be kidding...', 12)
        } else if (scene === 2) {
          if (this.bubble) {
            this.bubble.destroy()
          }
          if (this.text) {
            this.text.destroy()
          }
        }
      }
    }
  },
  // Level 16: "Speed" by Beni Dietz
  {
    player: {
      x: 668,
      y: 349,
      key: 'player'
    },
    asteroids: [
      {
        x: 666,
        y: 402,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 637,
        y: 655,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 625,
        y: 745,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 638,
        y: 1052,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 647,
        y: 485,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 673,
      y: 1218,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 608,
        y: 1003
      },
      {
        x: 610,
        y: 615
      },
      {
        x: 662,
        y: 797
      }
    ],
    aliens: [
      {
        x: 690,
        y: 1132,
        key: 'alien'
      },
      {
        x: 575,
        y: 926,
        key: 'alien'
      },
      {
        x: 706,
        y: 748,
        key: 'alien'
      },
      {
        x: 577,
        y: 540,
        key: 'alien'
      }
    ]
  },
  // Level 17:
  {
    player: {
      x: 324,
      y: 735,
      key: 'player'
    },
    target: {
      x: 907,
      y: 544,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 405,
        y: 724,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 501,
        y: 792,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 651,
        y: 813,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 808,
        y: 802,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 647,
        y: 617,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 827,
        y: 799,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    antiForceFields: [
      {
        x: 963,
        y: 769,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 528,
        y: 905,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    novae: [
      {
        x: 586,
        y: 701,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 707,
        y: 753,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 789,
        y: 881,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 831,
        y: 851,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 853,
        y: 806,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 783,
        y: 668,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 874,
        y: 678,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 835,
        y: 614,
        key: 'nova_64',
        radius: 32
      }
    ],
    aliens: [],
    maxDistance: 250,
    goodies: [
      {
        x: 644,
        y: 725
      },
      {
        x: 621,
        y: 650
      },
      {
        x: 925,
        y: 630
      }
    ]
  },
  // Level 18: "Trust" by Beni Dietz
  {
    player: {
      x: 712,
      y: 600,
      key: 'player'
    },
    asteroids: [
      {
        x: 708,
        y: 680,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 607,
        y: 930,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 622,
      y: 1182,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 719,
        y: 877
      },
      {
        x: 518,
        y: 884
      },
      {
        x: 806,
        y: 696
      }
    ],
    antiForceFields: [
      {
        x: 747,
        y: 820,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 508,
        y: 1000,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 501,
        y: 1088,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 614,
        y: 1043,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 536,
        y: 1177,
        key: 'antiForceField_64',
        radius: 32
      }
    ]
  },
  // Level 19: "Alien chase" by Gregory Katsaros
  {
    player: {
      x: 792,
      y: 569,
      key: 'player'
    },
    forceFields: [
      {
        x: 708,
        y: 720,
        key: 'forceField_32',
        radius: 16
      },
      {
        x: 562,
        y: 850,
        key: 'forceField_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 708,
      y: 826,
      key: 'target',
      radius: 18
    },
    enemies: [],
    maxDistance: 250,
    antiForceFields: [
      {
        x: 583,
        y: 763,
        key: 'antiForceField_64',
        radius: 32
      }
    ],
    aliens: [
      {
        x: 797,
        y: 827,
        key: 'alien'
      },
      {
        x: 1028,
        y: 815,
        key: 'alien'
      },
      {
        x: 869,
        y: 1054,
        key: 'alien'
      }
    ],
    asteroids: [
      {
        x: 588,
        y: 938,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 853,
        y: 773,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 976,
        y: 947,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 753,
        y: 960,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      }
    ],
    novae: [
      {
        x: 974,
        y: 754,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 869,
        y: 935,
        key: 'nova_32',
        radius: 16
      }
    ],
    goodies: [
      {
        x: 647,
        y: 752
      },
      {
        x: 1167,
        y: 956
      },
      {
        x: 974,
        y: 988
      }
    ]
  },
  // Level 20: "An easy one" by Gregory Katsaros
  {
    player: {
      x: 344,
      y: 334,
      key: 'player'
    },
    forceFields: [
      {
        x: 708,
        y: 720,
        key: 'forceField_32',
        radius: 16
      },
      {
        x: 562,
        y: 850,
        key: 'forceField_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 981,
      y: 1158,
      key: 'target',
      radius: 18
    },
    enemies: [],
    maxDistance: 250,
    antiForceFields: [],
    aliens: [],
    asteroids: [
      {
        x: 436,
        y: 369,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 1044,
        y: 403,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 480,
        y: 503,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 633,
        y: 353,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 783,
        y: 702,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 804,
        y: 374,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 587,
        y: 472,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 366,
        y: 477,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 711,
        y: 466,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 781,
        y: 328,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 802,
        y: 590,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 1015,
        y: 516,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 885,
        y: 702,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 1125,
        y: 581,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 1187,
        y: 338,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 1122,
        y: 801,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 952,
        y: 812,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 931,
        y: 341,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 896,
        y: 1284,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 973,
        y: 945,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 1013,
        y: 1059,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 644,
        y: 616,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 770,
        y: 833,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 752,
        y: 1043,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 1057,
        y: 666,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      }
    ],
    novae: [
      {
        x: 201,
        y: 311,
        key: 'nova_64',
        radius: 32
      }
    ],
    goodies: [
      {
        x: 679,
        y: 390
      },
      {
        x: 986,
        y: 330
      },
      {
        x: 702,
        y: 818
      }
    ]
  },
  // Level 21:
  {
    player: {
      x: 417,
      y: 723,
      key: 'player'
    },
    asteroids: [
      {
        x: 516,
        y: 880,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 443,
        y: 798,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 755,
        y: 683,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 633,
        y: 508,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 513,
        y: 514,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 516,
        y: 555,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 417,
      y: 553,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 690,
        y: 818,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 714,
        y: 636,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 691,
        y: 498,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 547,
        y: 599,
        key: 'nova_64',
        radius: 32
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 705,
        y: 568
      },
      {
        x: 692,
        y: 739
      },
      {
        x: 598,
        y: 817
      }
    ],
    antiForceFields: [
      {
        x: 586,
        y: 731,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 841,
        y: 563,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 22: "The stupid snail (not very proud of it...)" by Gregory Katsaros
  {
    player: {
      x: 382,
      y: 526,
      key: 'player'
    },
    asteroids: [
      {
        x: 375,
        y: 424,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 534,
        y: 1196,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 791,
        y: 1227,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 1064,
        y: 927,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 988,
        y: 1135,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 274,
        y: 775,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 372,
        y: 1040,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 923,
        y: 769,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 715,
        y: 832,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 828,
      y: 978,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    antiForceFields: [
      {
        x: 346,
        y: 719,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 484,
        y: 1048,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 363,
        y: 814,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 395,
        y: 899,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 432,
        y: 978,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 903,
        y: 1110,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 972,
        y: 1048,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 813,
        y: 1138,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 724,
        y: 1144,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 328,
        y: 642,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 743,
        y: 886,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 782,
        y: 847,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 803,
        y: 899,
        key: 'antiForceField_64',
        radius: 32
      },
      {
        x: 546,
        y: 1107,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 632,
        y: 1139,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 970,
        y: 956,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 941,
        y: 876,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 857,
        y: 833,
        key: 'antiForceField_96',
        radius: 48
      }
    ],
    goodies: [
      {
        x: 454,
        y: 878
      },
      {
        x: 713,
        y: 1077
      },
      {
        x: 902,
        y: 944
      }
    ]
  },
  // Level 23:
  {
    player: {
      x: 702,
      y: 329,
      key: 'player'
    },
    asteroids: [
      {
        x: 700,
        y: 382,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 665,
        y: 433,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 727,
        y: 541,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 791,
        y: 738,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 784,
        y: 614,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 610,
        y: 595,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 546,
        y: 717,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 694,
      y: 847,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 640,
        y: 482,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 736,
        y: 486,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 710,
        y: 660,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 853,
        y: 692,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 652,
        y: 668,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 798,
        y: 549
      },
      {
        x: 823,
        y: 655
      },
      {
        x: 698,
        y: 761
      }
    ]
  },
  // Level 24:
  {
    player: {
      x: 1194,
      y: 733,
      key: 'player'
    },
    asteroids: [
      {
        x: 1129,
        y: 734,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 1003,
        y: 656,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 867,
        y: 658,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 765,
        y: 753,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 697,
        y: 657,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    target: {
      x: 757,
      y: 586,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 590,
        y: 713,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 753,
        y: 682,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 911,
        y: 722,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 764,
        y: 805,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 608,
        y: 774,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 912,
        y: 574,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 765,
        y: 841,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 680,
        y: 727
      },
      {
        x: 842,
        y: 761
      },
      {
        x: 1002,
        y: 727
      }
    ],
    antiForceFields: [
      {
        x: 763,
        y: 910,
        key: 'antiForceField_64',
        radius: 32
      }
    ]
  },
  // Level 25: "Decision Time" by Beni Dietz
  {
    player: {
      x: 707,
      y: 358,
      key: 'player'
    },
    target: {
      x: 713,
      y: 1050,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 647,
        y: 612,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 708,
        y: 554,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 779,
        y: 664,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 569,
        y: 893,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 489,
        y: 892,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 511,
        y: 894,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 332,
        y: 891,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 256,
        y: 887,
        key: 'thermoAsteroid_64',
        radius: 32,
        enemy: true
      },
      {
        x: 851,
        y: 861,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 803,
        y: 1009,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 899,
        y: 928,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 930,
        y: 1037,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    antiForceFields: [
      {
        x: 713,
        y: 724,
        key: 'antiForceField_64',
        radius: 32
      }
    ],
    novae: [
      {
        x: 736,
        y: 1011,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 754,
        y: 1042,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 746,
        y: 1077,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 713,
        y: 1089,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 701,
        y: 1006,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 676,
        y: 1090,
        key: 'nova_32',
        radius: 16
      }
    ],
    aliens: [],
    maxDistance: 250,
    goodies: [
      {
        x: 745,
        y: 381
      },
      {
        x: 670,
        y: 1007
      },
      {
        x: 706,
        y: 321
      }
    ]
  },
  // OUTRO:
  {},
  // BONUS:
  // Level 27: 'Sudden death' - by Martin Boeckle
  {
    player: {
      x: 406,
      y: 799,
      key: 'player'
    },
    asteroids: [
      {
        x: 537,
        y: 838,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 641,
        y: 795,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 584,
        y: 651,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 756,
        y: 711,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 699,
        y: 924,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      },
      {
        x: 828,
        y: 795,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 581,
        y: 980,
        key: 'asteroid_64',
        radius: 32,
        enemy: false
      }
    ],
    target: {
      x: 575,
      y: 909,
      key: 'target',
      radius: 18
    },
    novae: [
      {
        x: 828,
        y: 573,
        key: 'nova_64',
        radius: 32
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 441,
        y: 788
      },
      {
        x: 719,
        y: 644
      },
      {
        x: 738,
        y: 763
      }
    ],
    antiForceFields: [
      {
        x: 455,
        y: 907,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 28:
  {
    player: {
      x: 1068,
      y: 1161,
      key: 'player'
    },
    target: {
      x: 492,
      y: 850,
      key: 'target',
      radius: 18
    },
    asteroids: [
      {
        x: 864,
        y: 1144,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 1006,
        y: 1187,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 772,
        y: 929,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 635,
        y: 899,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      },
      {
        x: 542,
        y: 739,
        key: 'thermoAsteroid_32',
        radius: 16,
        enemy: true
      }
    ],
    novae: [
      {
        x: 875,
        y: 1092,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 790,
        y: 975,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 679,
        y: 867,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 546,
        y: 795,
        key: 'nova_64',
        radius: 32
      },
      {
        x: 826,
        y: 1098,
        key: 'nova_32',
        radius: 16
      },
      {
        x: 810,
        y: 929,
        key: 'nova_32',
        radius: 16
      }
    ],
    maxDistance: 250,
    goodies: [
      {
        x: 612,
        y: 815
      },
      {
        x: 716,
        y: 936
      },
      {
        x: 854,
        y: 1022
      }
    ],
    antiForceFields: [
      {
        x: 747,
        y: 1105,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 839,
        y: 857,
        key: 'antiForceField_96',
        radius: 48
      },
      {
        x: 570,
        y: 948,
        key: 'antiForceField_96',
        radius: 48
      }
    ]
  },
  // Level 29:
  {
    player: {
      x: 1078,
      y: 923,
      key: 'player'
    },
    asteroids: [
      {
        x: 830,
        y: 920,
        key: 'asteroid_32',
        radius: 16
      },
      {
        x: 700,
        y: 800,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      },
      {
        x: 975,
        y: 940,
        key: 'asteroid_32',
        radius: 16,
        enemy: false
      }
    ],
    target: {
      x: 700,
      y: 668,
      key: 'target',
      radius: 18
    },
    novae: [],
    maxDistance: 250,
    goodies: [
      {
        x: 740,
        y: 740
      },
      {
        x: 660,
        y: 740
      },
      {
        x: 680,
        y: 740
      },
      {
        x: 700,
        y: 740
      },
      {
        x: 720,
        y: 740
      },
      {
        x: 740,
        y: 760
      },
      {
        x: 660,
        y: 760
      },
      {
        x: 680,
        y: 760
      },
      {
        x: 700,
        y: 760
      },
      {
        x: 720,
        y: 760
      },
      {
        x: 740,
        y: 840
      },
      {
        x: 660,
        y: 840
      },
      {
        x: 680,
        y: 840
      },
      {
        x: 700,
        y: 840
      },
      {
        x: 720,
        y: 840
      },
      {
        x: 740,
        y: 860
      },
      {
        x: 660,
        y: 860
      },
      {
        x: 680,
        y: 860
      },
      {
        x: 700,
        y: 860
      },
      {
        x: 720,
        y: 860
      },
      {
        x: 740,
        y: 820
      },
      {
        x: 740,
        y: 800
      },
      {
        x: 740,
        y: 780
      },
      {
        x: 660,
        y: 820
      },
      {
        x: 660,
        y: 800
      },
      {
        x: 660,
        y: 780
      },
      {
        x: 640,
        y: 740
      },
      {
        x: 640,
        y: 760
      },
      {
        x: 640,
        y: 780
      },
      {
        x: 640,
        y: 800
      },
      {
        x: 640,
        y: 820
      },
      {
        x: 640,
        y: 840
      },
      {
        x: 640,
        y: 860
      },
      {
        x: 760,
        y: 740
      },
      {
        x: 760,
        y: 760
      },
      {
        x: 760,
        y: 780
      },
      {
        x: 760,
        y: 800
      },
      {
        x: 760,
        y: 820
      },
      {
        x: 760,
        y: 840
      },
      {
        x: 760,
        y: 860
      }
    ]
  }
]
