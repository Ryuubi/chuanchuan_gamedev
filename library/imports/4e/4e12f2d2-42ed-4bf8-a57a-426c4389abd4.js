"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

'use strict';

var Player = require('Player');
var Water = require('BlueWater');
var Spear = require('Spear');
var Game = cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: Player
        },
        spear: {
            default: null,
            type: Spear
        },
        SpearNode: {
            default: null,
            type: cc.Node
        },

        bgm: {
            default: null,
            type: cc.AudioClip
        },
        restartBtn: {
            default: null,
            type: cc.Node
        },

        restartLabel: {
            default: null,
            type: cc.Node
        },

        waterPrefab: cc.Prefab,
        greenPrefab: cc.Prefab,
        eggPrefab: cc.Prefab,
        applePrefab: cc.Prefab,
        applePrefab2: cc.Prefab,
        orangePrefab: cc.Prefab,
        bombPrefab: cc.Prefab,
        stonePrefab: cc.Prefab

    },

    onLoad: function onLoad() {
        var _this = this;

        Global.gameEnd = 0;
        this.restartBtn.active = false;
        this.restartLabel.active = false;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            console.log("TOUCH_START");
            Global.reset = 0;
            cc.director.getCollisionManager().enabled = true;
            _this.spear.holdMoveAt();
        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function () {
            console.log("TOUCH_MOVE");
        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            console.log("TOUCH_END");
            _this.spear.startMoveAt();
            _this.spear.resetCount();
            _this.spear.stopMoveAt();
            _this.spear.goDownAt();
            cc.director.getCollisionManager().enabled = false;
        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            console.log("TOUCH_CANCEL");
            _this.spear.resetCount();
        }, this, true);

        this.enabled = false;
        this.spear.enabled = true;

        //Node pools for different food object
        this.waterPool = new cc.NodePool('Water');
        this.waterPool2 = new cc.NodePool('Water2');
        this.waterPool3 = new cc.NodePool('Water3');

        this.greenPool = new cc.NodePool('Green');

        this.eggPool = new cc.NodePool('Egg');
        this.eggPool2 = new cc.NodePool('Egg');

        this.applePool = new cc.NodePool('Apple');
        this.applePool2 = new cc.NodePool('Apple2');
        this.applePool3 = new cc.NodePool('Apple3');

        this.orangePool = new cc.NodePool('Orange');
        this.orangePool2 = new cc.NodePool('Orange2');

        this.bombPool = new cc.NodePool('Bomb');
        this.bombPool2 = new cc.NodePool('Bomb2');

        this.stonePool = new cc.NodePool('Stone');
        this.stonePool2 = new cc.NodePool('Stone2');

        // spawning Bomb dynamically row 3
        var initCountBomb = 0;
        for (var i = 0; i < initCountBomb; ++i) {
            var bomb = cc.instantiate(this.bombPrefab); // create node instance
            this.bombPool.put(bomb); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewBomb();
        }, interval, this.bombPool.size(), 3);

        // spawning Bomb dynamically row 3
        var initCountStone = 0;
        for (var _i = 0; _i < initCountStone; ++_i) {
            var stone = cc.instantiate(this.stonePrefab); // create node instance
            this.stonePool.put(stone); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewStone();
        }, interval, this.stonePool.size(), 6.75);

        // //Play music
        //  // Time interval in units of seconds
        var interval = 1;
        // // Time of repetition
        var repeat = 0;
        // // Start delay
        var delay = 0;
        this.schedule(function () {
            // Here `this` is referring to the component
            this.playMusic();
            console.log("test music");
        }, interval, repeat, delay);

        //infinite row 3

        // Time interval in units of seconds
        var infiniteinterval = 6.75;
        // Time of repetition
        var infiniterepeat = 100;
        // Start delay
        var infinitedelay = 6.75;
        this.schedule(function () {

            // ORANGE

            var initCountOrangeRow3 = 0;
            for (var _i2 = 0; _i2 < initCountOrangeRow3; ++_i2) {
                var orange2 = cc.instantiate(this.orangePrefab); // create node instance
                this.orangePool.put(orange2); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewOrange2();
            }, interval, this.orangePool.size(), 6);

            // WATER
            var initCount = 0;
            for (var _i3 = 0; _i3 < initCount; ++_i3) {
                var water2 = cc.instantiate(this.waterPrefab); // create node instance
                this.waterPool2.put(water2); // populate your pool with put method
            }
            // Time interval in units of seconds
            var interval = 1.5;
            // Start delay
            this.schedule(function () {
                // Here `this` is referring to the component
                this.spawnNewWater2();
            }, interval, this.waterPool2.size(), 0);

            var initCount2 = 0;
            for (var _i4 = 0; _i4 < initCount2; ++_i4) {
                var _water = cc.instantiate(this.waterPrefab); // create node instance
                this.waterPool2.put(_water); // populate your pool with put method
            }
            var interval = 1.5;
            this.schedule(function () {
                this.spawnNewWater2();
            }, interval, this.waterPool2.size(), 3.75);

            var initCount3 = 0;
            for (var _i5 = 0; _i5 < initCount3; ++_i5) {
                var _water2 = cc.instantiate(this.waterPrefab); // create node instance
                this.waterPool2.put(_water2); // populate your pool with put method
            }
            var interval = 1.5;
            this.schedule(function () {
                this.spawnNewWater2();
            }, interval, this.waterPool2.size(), 7.5);

            //APPLE

            var initCountAppleRow32 = 0;
            for (var _i6 = 0; _i6 < initCountAppleRow32; ++_i6) {
                var apple = cc.instantiate(this.applePrefab); // create node instance
                this.applePool.put(apple); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewApple2();
            }, interval, this.applePool.size(), 2.25);

            var initCountAppleRow3 = 0;
            for (var _i7 = 0; _i7 < initCountAppleRow3; ++_i7) {
                var _apple = cc.instantiate(this.applePrefab); // create node instance
                this.applePool2.put(_apple); // populate your pool with put method
            }
            var interval = 2.25;

            this.schedule(function () {
                this.spawnNewApple2();
            }, interval, this.applePool2.size(), 2.25);

            var initCountAppleRow31 = 0;
            for (var _i8 = 0; _i8 < initCountAppleRow31; ++_i8) {
                var _apple2 = cc.instantiate(this.applePrefab); // create node instance
                this.applePool.put(_apple2); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewApple2();
            }, interval, this.applePool.size(), 5.25);

            // BOMB

            var initCountBomb = 0;
            for (var _i9 = 0; _i9 < initCountBomb; ++_i9) {
                var _bomb = cc.instantiate(this.bombPrefab); // create node instance
                this.bombPool.put(_bomb); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewBomb();
            }, interval, this.bombPool.size(), 3);

            //STONE

            var initCountStone = 0;
            for (var _i10 = 0; _i10 < initCountStone; ++_i10) {
                var _stone = cc.instantiate(this.stonePrefab); // create node instance
                this.stonePool.put(_stone); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewStone();
            }, interval, this.stonePool.size(), 6.75);
        }, infiniteinterval, infiniterepeat, infinitedelay);

        // Time interval in units of seconds
        var infiniterow2interval = 14.5;
        // Time of repetition
        var infiniterow2repeat = 100;
        // Start delay
        var infiniterow2delay = 14.5;
        this.schedule(function () {

            // spawning yellow row 2

            var initCountAppleRow2 = 1;
            for (var _i11 = 0; _i11 < initCountAppleRow2; ++_i11) {
                var apple3 = cc.instantiate(this.applePrefab); // create node instance
                this.applePool3.put(apple3); // populate your pool with put method
            }
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewApple3();
            }, interval, 1, 0);

            var initCountAppleRow21 = 0;
            for (var _i12 = 0; _i12 < initCountAppleRow21; ++_i12) {}
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewApple3();
            }, interval, 0, 5.25);

            var initCountAppleRow22 = 0;
            for (var _i13 = 0; _i13 < initCountAppleRow22; ++_i13) {}
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewApple3();
            }, interval, 0, 7.5);

            var initCountAppleRow23 = 0;
            for (var _i14 = 0; _i14 < initCountAppleRow23; ++_i14) {}
            var interval = 0.75;

            this.schedule(function () {
                this.spawnNewApple3();
            }, interval, 1, 10.5);

            var initCountAppleRow24 = 0;
            for (var _i15 = 0; _i15 < initCountAppleRow24; ++_i15) {}
            var interval = 0.75;

            this.schedule(function () {
                this.spawnNewApple3();
            }, interval, 0, 13.5);

            // spawning water row 2

            var initCountWaterRow2 = 1;
            for (var _i16 = 0; _i16 < initCountWaterRow2; ++_i16) {}
            // Time interval in units of seconds
            var interval = 1.5;
            // Start delay
            this.schedule(function () {
                // Here `this` is referring to the component
                this.spawnNewWater3();
            }, interval, 1, 2.25);

            for (var _i17 = 0; _i17 < initCountWaterRow2; ++_i17) {}
            // Time interval in units of seconds
            var interval = 1.5;
            // Start delay
            this.schedule(function () {
                // Here `this` is referring to the component
                this.spawnNewWater3();
            }, interval, 1, 6.75);

            for (var _i18 = 0; _i18 < initCountWaterRow2; ++_i18) {}
            // Time interval in units of seconds
            var interval = 1.5;
            // Start delay
            this.schedule(function () {
                // Here `this` is referring to the component
                this.spawnNewWater3();
            }, interval, 0, 12);

            // spawning orange row 2

            var initCountOrangeRow21 = 0;
            for (var _i19 = 0; _i19 < initCountOrangeRow21; ++_i19) {}
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewOrange3();
            }, interval, 0, 4.5);

            var initCountOrangeRow22 = 0;
            for (var _i20 = 0; _i20 < initCountOrangeRow22; ++_i20) {}
            var interval = 0.75;

            this.schedule(function () {
                this.spawnNewOrange3();
            }, interval, 1, 9);

            var initCountOrangeRow23 = 0;
            for (var _i21 = 0; _i21 < initCountOrangeRow23; ++_i21) {}
            var interval = 0.75;

            this.schedule(function () {
                this.spawnNewOrange3();
            }, interval, 0, 15);

            // Spawning bomb row 2

            var initCountBomb2 = 0;
            for (var _i22 = 0; _i22 < initCountBomb2; ++_i22) {}
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewBomb2();
            }, interval, 0, 6);

            var initCountBomb3 = 0;
            for (var _i23 = 0; _i23 < initCountBomb3; ++_i23) {}
            var interval = 1.5;

            this.schedule(function () {
                this.spawnNewBomb2();
            }, interval, 1, 12.75);
        }, infiniterow2interval, infiniterow2repeat, infiniterow2delay);

        // spawning yellow row 2

        var initCountAppleRow2 = 1;
        for (var _i24 = 0; _i24 < initCountAppleRow2; ++_i24) {
            var apple3 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool3.put(apple3); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, 1, 0);

        var initCountAppleRow21 = 0;
        for (var _i25 = 0; _i25 < initCountAppleRow21; ++_i25) {}
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, 0, 5.25);

        var initCountAppleRow22 = 0;
        for (var _i26 = 0; _i26 < initCountAppleRow22; ++_i26) {}
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, 0, 7.5);

        var initCountAppleRow23 = 0;
        for (var _i27 = 0; _i27 < initCountAppleRow23; ++_i27) {}
        var interval = 0.75;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, 1, 10.5);

        var initCountAppleRow24 = 0;
        for (var _i28 = 0; _i28 < initCountAppleRow24; ++_i28) {}
        var interval = 0.75;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, 0, 13.5);

        // spawning water row 2

        var initCountWaterRow2 = 1;
        for (var _i29 = 0; _i29 < initCountWaterRow2; ++_i29) {}
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater3();
        }, interval, 1, 2.25);

        for (var _i30 = 0; _i30 < initCountWaterRow2; ++_i30) {}
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater3();
        }, interval, 1, 6.75);

        for (var _i31 = 0; _i31 < initCountWaterRow2; ++_i31) {}
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater3();
        }, interval, 0, 12);

        // spawning orange row 2

        var initCountOrangeRow21 = 0;
        for (var _i32 = 0; _i32 < initCountOrangeRow21; ++_i32) {}
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange3();
        }, interval, this.orangePool.size(), 4.5);

        var initCountOrangeRow22 = 0;
        for (var _i33 = 0; _i33 < initCountOrangeRow22; ++_i33) {}
        var interval = 0.75;

        this.schedule(function () {
            this.spawnNewOrange3();
        }, interval, 1, 9);

        var initCountOrangeRow23 = 0;
        for (var _i34 = 0; _i34 < initCountOrangeRow23; ++_i34) {}
        var interval = 0.75;

        this.schedule(function () {
            this.spawnNewOrange3();
        }, interval, 0, 15);

        // Spawning bomb row 2

        var initCountBomb2 = 0;
        for (var _i35 = 0; _i35 < initCountBomb2; ++_i35) {}
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewBomb2();
        }, interval, 0, 6);

        var initCountBomb3 = 0;
        for (var _i36 = 0; _i36 < initCountBomb3; ++_i36) {}
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewBomb2();
        }, interval, 1, 12.75);

        // spawning water dynamically row 3
        var initCount = 0;
        for (var _i37 = 0; _i37 < initCount; ++_i37) {
            var water2 = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool2.put(water2); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater2();
        }, interval, this.waterPool2.size(), 0);

        var initCount2 = 0;
        for (var _i38 = 0; _i38 < initCount2; ++_i38) {
            var _water3 = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool2.put(_water3); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater2();
        }, interval, this.waterPool2.size(), 3.75);

        var initCount3 = 0;
        for (var _i39 = 0; _i39 < initCount3; ++_i39) {
            var _water4 = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool2.put(_water4); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater2();
        }, interval, this.waterPool2.size(), 7.5);

        // //////////////////////////////////////////////////////////////////////////


        // spawning Apple2 dynamically row 1
        var initCountApple1 = 0;
        for (var _i40 = 0; _i40 < initCountApple1; ++_i40) {
            var apple2 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(apple2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple();
        }, interval, this.applePool.size(), 0);

        var initCountApple2 = 0;
        for (var _i41 = 0; _i41 < initCountApple2; ++_i41) {
            var _apple3 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(_apple3); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple();
        }, interval, this.applePool.size(), 3.75);

        var initCountApple3 = 0;
        for (var _i42 = 0; _i42 < initCountApple3; ++_i42) {
            var _apple4 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(_apple4); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple();
        }, interval, this.applePool.size(), 5.25);

        // ////////////////////////////////////////////////////////////////////////////////////////

        // spawning Apple2 dynamically row 3
        var initCountAppleRow3 = 1;
        for (var _i43 = 0; _i43 < initCountAppleRow3; ++_i43) {
            var apple = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple); // populate your pool with put method
        }
        var interval = 2.25;

        this.schedule(function () {
            this.spawnNewApple2();
        }, interval, this.applePool2.size(), 2.25);

        var initCountAppleRow31 = 0;
        for (var _i44 = 0; _i44 < initCountAppleRow31; ++_i44) {
            var _apple5 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(_apple5); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple2();
        }, interval, this.applePool.size(), 5.25);

        // //////////////////////////////////////////////////////////////////////////////////


        // spawning Orange2 dynamically row 1
        var initCountOrange = 0;
        for (var _i45 = 0; _i45 < initCountOrange; ++_i45) {
            var orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool.put(orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange();
        }, interval, this.orangePool.size(), 2.25);

        // spawning Orange2 dynamically row 1
        var initCountOrange2 = 0;
        for (var _i46 = 0; _i46 < initCountOrange2; ++_i46) {
            var _orange = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool.put(_orange); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange();
        }, interval, this.orangePool.size(), 4.5);

        // spawning Orange2 dynamically row 1
        var initCountOrange3 = 0;
        for (var _i47 = 0; _i47 < initCountOrange3; ++_i47) {
            var _orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool.put(_orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange();
        }, interval, this.orangePool.size(), 6.75);

        // //////////////////////////////////////////////////////////////////////////////////
        // spawning Orange2 dynamically row 3
        var initCountOrangeRow3 = 0;
        for (var _i48 = 0; _i48 < initCountOrangeRow3; ++_i48) {
            var _orange3 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool.put(_orange3); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange2();
        }, interval, this.orangePool.size(), 6);

        ////////////////////////////////////////////////////////////////////////////////////////

        var initCountStone2 = 0;
        for (var _i49 = 0; _i49 < initCountStone2; ++_i49) {
            var _stone2 = cc.instantiate(this.stonePrefab); // create node instance
            this.stonePool2.put(_stone2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewStone2();
        }, interval, this.stonePool2.size(), 3);

        var initCountStone3 = 0;
        for (var _i50 = 0; _i50 < initCountStone3; ++_i50) {
            var _stone3 = cc.instantiate(this.stonePrefab); // create node instance
            this.stonePool2.put(_stone3); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewStone2();
        }, interval, 0, 6);
    },

    start: function start() {},

    restartGame: function restartGame() {
        cc.game.restart();
    },

    playMusic: function playMusic() {
        cc.audioEngine.playMusic(this.bgm, true);
    },

    spawnNewWater: function spawnNewWater() {
        // generate a new node in the scene with a preset template
        var newWater = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.waterPool.size() > 0) {
            console.log(this.waterPool.size() + " What is the pool size");
            newWater = this.waterPool.get(); // this will be passed to Star's reuse method
        } else {
            newWater = cc.instantiate(this.waterPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newWater);
        // set up a random position for the star
        newWater.setPosition(this.getNewWaterPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewWaterPosition: function getNewWaterPosition() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewWater2: function spawnNewWater2() {
        // generate a new node in the scene with a preset template
        var newWater2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.waterPool2.size() > 0) {
            console.log(this.waterPool2.size() + " What is the pool size");
            newWater2 = this.waterPool2.get(); // this will be passed to Star's reuse method
        } else {
            newWater2 = cc.instantiate(this.waterPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newWater2);
        // set up a random position for the star
        newWater2.setPosition(this.getNewWaterPosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewWaterPosition2: function getNewWaterPosition2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewWater3: function spawnNewWater3() {
        // generate a new node in the scene with a preset template
        var newWater2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.waterPool2.size() > 0) {
            console.log(this.waterPool2.size() + " What is the pool size");
            newWater2 = this.waterPool2.get(); // this will be passed to Star's reuse method
        } else {
            newWater2 = cc.instantiate(this.waterPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newWater2);
        // set up a random position for the star
        newWater2.setPosition(this.getNewWaterPosition3());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewWaterPosition3: function getNewWaterPosition3() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewGreen: function spawnNewGreen() {
        // generate a new node in the scene with a preset template
        var newGreen = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.greenPool.size() > 0) {
            console.log(this.greenPool.size() + " What is the pool size");
            newGreen = this.greenPool.get(); // this will be passed to Star's reuse method
        } else {
            newGreen = cc.instantiate(this.greenPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newGreen);
        // set up a random position for the star
        newGreen.setPosition(this.getNewGreenPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewGreenPosition: function getNewGreenPosition() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewBomb: function spawnNewBomb() {
        // generate a new node in the scene with a preset template
        var newBomb = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.bombPool.size() > 0) {
            console.log(this.bombPool.size() + " What is the pool size");
            newBomb = this.bombPool.get(); // this will be passed to Star's reuse method
        } else {
            newBomb = cc.instantiate(this.bombPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newBomb);
        // set up a random position for the star
        newBomb.setPosition(this.getNewBombPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewBombPosition: function getNewBombPosition() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewBomb2: function spawnNewBomb2() {
        // generate a new node in the scene with a preset template
        var newBomb = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.bombPool.size() > 0) {
            console.log(this.bombPool.size() + " What is the pool size");
            newBomb = this.bombPool.get(); // this will be passed to Star's reuse method
        } else {
            newBomb = cc.instantiate(this.bombPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newBomb);
        // set up a random position for the star
        newBomb.setPosition(this.getNewBombPosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewBombPosition2: function getNewBombPosition2() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    // spawnNewEgg: function() {
    //     // generate a new node in the scene with a preset template
    //     var newEgg = null;
    //     // 使用给定的模板在场景中生成一个新节点
    //     if (this.eggPool.size() > 0) {
    //             console.log(this.eggPool.size()+" What is the pool size")
    //             newEgg = this.eggPool.get(); // this will be passed to Star's reuse method

    //     } else {
    //         newEgg = cc.instantiate(this.eggPrefab);
    //     }
    //     // put the newly added node under the Canvas node
    //     this.node.addChild(newEgg);
    //     // set up a random position for the star
    //     newEgg.setPosition(this.getNewEggPosition());
    //     // pass Game instance to star
    //     // newWater.getComponent('Star').init(this);
    // },

    // getNewEggPosition: function () {
    //     var randX = 300;
    //     // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
    //     var randY = 309
    //     // return to the anchor point of the star
    //     return cc.v2(randX, randY);
    // },

    spawnNewApple: function spawnNewApple() {
        // generate a new node in the scene with a preset template
        var newApple = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool.size() > 0) {
            console.log(this.applePool.size() + " What is the pool size");
            newApple = this.applePool.get(); // this will be passed to Star's reuse method
        } else {
            newApple = cc.instantiate(this.applePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newApple);
        // set up a random position for the star
        newApple.setPosition(this.getNewApplePosition());
        console.log("New position");
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewApplePosition: function getNewApplePosition() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple2: function spawnNewApple2() {
        // generate a new node in the scene with a preset template
        var newApple2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool.size() > 0) {
            console.log(this.applePool.size() + " What is the pool size");
            newApple = this.applePool.get(); // this will be passed to Star's reuse method
        } else {
            newApple2 = cc.instantiate(this.applePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newApple2);
        // set up a random position for the star
        newApple2.setPosition(this.getNewApplePosition2());
        console.log("New position");
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewApplePosition2: function getNewApplePosition2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple3: function spawnNewApple3() {
        // generate a new node in the scene with a preset template
        var newApple3 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool.size() > 0) {
            console.log(this.applePool.size() + " What is the pool size");
            newApple3 = this.applePool.get(); // this will be passed to Star's reuse method
        } else {
            newApple3 = cc.instantiate(this.applePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newApple3);
        // set up a random position for the star
        newApple3.setPosition(this.getNewApplePosition3());
        console.log("New position");
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewApplePosition3: function getNewApplePosition3() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange: function spawnNewOrange() {
        // generate a new node in the scene with a preset template
        var newOrange = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool.size() > 0) {
            console.log(this.orangePool.size() + " What is the pool size");
            newOrange = this.orangePool.get(); // this will be passed to Star's reuse method
        } else {
            newOrange = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange);
        // set up a random position for the star
        newOrange.setPosition(this.getNewOrangePosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition: function getNewOrangePosition() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange2: function spawnNewOrange2() {
        // generate a new node in the scene with a preset template
        var newOrange = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool.size() > 0) {
            console.log(this.orangePool.size() + " What is the pool size");
            newOrange = this.orangePool.get(); // this will be passed to Star's reuse method
        } else {
            newOrange = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange);
        // set up a random position for the star
        newOrange.setPosition(this.getNewOrangePosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition2: function getNewOrangePosition2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange3: function spawnNewOrange3() {
        // generate a new node in the scene with a preset template
        var newOrange = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool.size() > 0) {
            console.log(this.orangePool.size() + " What is the pool size");
            newOrange = this.orangePool.get(); // this will be passed to Star's reuse method
        } else {
            newOrange = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange);
        // set up a random position for the star
        newOrange.setPosition(this.getNewOrangePosition3());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition3: function getNewOrangePosition3() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewStone: function spawnNewStone() {
        // generate a new node in the scene with a preset template
        var newStone = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.stonePool.size() > 0) {
            console.log(this.stonePool.size() + " What is the pool size");
            newStone = this.stonePool.get(); // this will be passed to Star's reuse method
        } else {
            newStone = cc.instantiate(this.stonePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newStone);
        // set up a random position for the star
        newStone.setPosition(this.getNewStone());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewStone: function getNewStone() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewStone2: function spawnNewStone2() {
        // generate a new node in the scene with a preset template
        var newStone = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.stonePool2.size() > 0) {
            console.log(this.stonePool2.size() + " What is the pool size");
            newStone = this.stonePool2.get(); // this will be passed to Star's reuse method
        } else {
            newStone = cc.instantiate(this.stonePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newStone);
        // set up a random position for the star
        newStone.setPosition(this.getNewStone2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewStone2: function getNewStone2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    intervalSetting: function intervalSetting() {

        Global.count += 1;
        Global.reset = 0;
        return Global.count;
    },

    resetCount: function resetCount() {
        Global.count = 0;
        Global.reset = 1;

        return Global.reset;
    },

    onStartGame: function onStartGame() {

        this.enabled = true;
        this.btnNode.x = 3000;
        this.GameOver.active = false;
    },

    update: function update(dt) {
        this._timer += dt;
        if (this._timer >= 0.0) {
            console.log("Test test");
            if (Global.gameEnd == 1) {
                this.restartBtn.active = true;
                this.restartLabel.active = true;
            }
        }
    }

});

cc._RF.pop();