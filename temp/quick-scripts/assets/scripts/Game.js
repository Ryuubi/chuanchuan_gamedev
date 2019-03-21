(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game', __filename);
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
        bombPrefab: cc.Prefab

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

        this.greenPool = new cc.NodePool('Green');

        this.eggPool = new cc.NodePool('Egg');
        this.eggPool2 = new cc.NodePool('Egg');

        this.applePool = new cc.NodePool('Apple');
        this.applePool2 = new cc.NodePool('Apple2');

        this.orangePool = new cc.NodePool('Orange');
        this.orangePool2 = new cc.NodePool('Orange2');

        this.bombPool = new cc.NodePool('Bomb');
        this.bombPool2 = new cc.NodePool('Bomb2');

        // spawning Bomb dynamically row 3
        var initCountBomb = 1;
        for (var i = 0; i < initCountBomb; ++i) {
            var bomb = cc.instantiate(this.bombPrefab); // create node instance
            this.bombPool.put(bomb); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewBomb();
        }, interval, this.bombPool.size(), 0);

        // spawning Bomb dynamically row 3
        var initCountBomb2 = 0;
        for (var _i = 0; _i < initCountBomb2; ++_i) {
            var bomb2 = cc.instantiate(this.bombPrefab); // create node instance
            this.bombPool2.put(bomb2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewBomb();
        }, interval, this.bombPool2.size(), 4.5);

        // //Play music
        //  // Time interval in units of seconds
        // var interval = 1;
        // // Time of repetition
        // var repeat = 0;
        // // Start delay
        // var delay = 0;
        // this.schedule(function() {
        //     // Here `this` is referring to the component
        //     this.playMusic();
        //     console.log("test music")
        // }, interval, repeat, delay);

        // spawning water dynamically row 2
        var initCount = 1;
        for (var _i2 = 0; _i2 < initCount; ++_i2) {
            var water = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool.put(water); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater();
        }, interval, this.waterPool.size(), 2.25);

        // spawning water dynamically row 3
        var initCount2 = 0;
        for (var _i3 = 0; _i3 < initCount2; ++_i3) {
            var water2 = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool2.put(water2); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function () {
            // Here `this` is referring to the component
            this.spawnNewWater2();
        }, interval, this.waterPool2.size(), 2.25);

        // // spawning green dynamically
        // let initCountGreen = 2;
        // for (let i = 0; i < initCountGreen; ++i) {
        //     let green = cc.instantiate(this.greenPrefab); // create node instance
        //     this.greenPool.put(green); // populate your pool with put method
        // }
        // // Time interval in units of seconds
        // var interval = 1.5;
        // // Start delay

        // this.schedule(function() {
        //     // Here `this` is referring to the component
        //     this.spawnNewGreen();
        // }, interval, this.greenPool.size(), 1.75);


        // spawning Egg dynamically row 3
        // let initCountEgg = 1;
        // for (let i = 0; i < initCountEgg; ++i) {
        //     let egg = cc.instantiate(this.eggPrefab); // create node instance
        //     this.eggPool.put(egg); // populate your pool with put method
        // }
        // var interval = 1.5;

        // this.schedule(function() {
        //     this.spawnNewEgg();
        // }, interval, this.eggPool.size(), 0);

        // // spawning Egg dynamically row 3
        // let initCountEgg2 = 0;
        // for (let i = 0; i < initCountEgg2; ++i) {
        //     let egg2 = cc.instantiate(this.eggPrefab); // create node instance
        //     this.eggPool2.put(egg2); // populate your pool with put method
        // }
        // var interval = 1.5;

        // this.schedule(function() {
        //     this.spawnNewEgg();
        // }, interval, this.eggPool2.size(), 4.5)

        // spawning Apple2 dynamically row 1
        var initCountApple2 = 0;
        for (var _i4 = 0; _i4 < initCountApple2; ++_i4) {
            var apple2 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple2();
        }, interval, this.applePool2.size(), 3.35);

        // spawning Apple dynamically row 2
        var initCountApple = 1;
        for (var _i5 = 0; _i5 < initCountApple; ++_i5) {
            var apple = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(apple); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple();
        }, interval, this.applePool.size(), 0);

        // spawning Apple2 dynamically row 2
        var initCountApple3 = 0;
        for (var _i6 = 0; _i6 < initCountApple3; ++_i6) {
            var _apple = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(_apple); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple3();
        }, interval, this.applePool2.size(), 5.25);

        // spawning Apple2 dynamically row 3
        var initCountApple4 = 1;
        for (var _i7 = 0; _i7 < initCountApple4; ++_i7) {
            var apple4 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple4); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewApple4();
        }, interval, this.applePool2.size(), 3.75);

        // spawning Orange2 dynamically row 1
        var initCountOrange2 = 0;
        for (var _i8 = 0; _i8 < initCountOrange2; ++_i8) {
            var orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange2();
        }, interval, this.orangePool2.size(), 1.75);

        // spawning Orange3 dynamically row 1
        var initCountOrange3 = 0;
        for (var _i9 = 0; _i9 < initCountOrange3; ++_i9) {
            var _orange = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(_orange); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange2();
        }, interval, this.orangePool2.size(), 4.75);

        // spawning Orange3 dynamically row 2
        var initCountOrange4 = 0;
        for (var _i10 = 0; _i10 < initCountOrange4; ++_i10) {
            var _orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(_orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function () {
            this.spawnNewOrange3();
        }, interval, this.orangePool2.size(), 4.5);
    },

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

    spawnNewEgg: function spawnNewEgg() {
        // generate a new node in the scene with a preset template
        var newEgg = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.eggPool.size() > 0) {
            console.log(this.eggPool.size() + " What is the pool size");
            newEgg = this.eggPool.get(); // this will be passed to Star's reuse method
        } else {
            newEgg = cc.instantiate(this.eggPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newEgg);
        // set up a random position for the star
        newEgg.setPosition(this.getNewEggPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewEggPosition: function getNewEggPosition() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

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
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple2: function spawnNewApple2() {
        // generate a new node in the scene with a preset template
        var newApple2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
            console.log(this.applePool2.size() + " What is the pool size");
            newApple2 = this.applePool2.get(); // this will be passed to Star's reuse method
        } else {
            newApple2 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple2);
        newApple2.setPosition(this.getNewApplePosition2());
        console.log(newApple2.getPosition());
    },

    getNewApplePosition2: function getNewApplePosition2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple3: function spawnNewApple3() {
        // generate a new node in the scene with a preset template
        var newApple2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
            console.log(this.applePool2.size() + " What is the pool size");
            newApple2 = this.applePool2.get(); // this will be passed to Star's reuse method
        } else {
            newApple2 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple2);
        newApple2.setPosition(this.getNewApplePosition3());
        console.log(newApple2.getPosition());
    },

    getNewApplePosition3: function getNewApplePosition3() {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple4: function spawnNewApple4() {
        // generate a new node in the scene with a preset template
        var newApple4 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
            console.log(this.applePool.size() + " What is the pool size");
            newApple4 = this.applePool.get(); // this will be passed to Star's reuse method
        } else {
            newApple4 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple4);
        newApple4.setPosition(this.getNewApplePosition4());
    },

    getNewApplePosition4: function getNewApplePosition4() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309;
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
        var randX = 284;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 305;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange2: function spawnNewOrange2() {
        // generate a new node in the scene with a preset template
        var newOrange2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool2.size() > 0) {
            console.log(this.orangePool2.size() + " What is the pool size");
            newOrange2 = this.orangePool2.get(); // this will be passed to Star's reuse method
        } else {
            newOrange2 = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange2);
        // set up a random position for the star
        newOrange2.setPosition(this.getNewOrangePosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition2: function getNewOrangePosition2() {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105;
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange3: function spawnNewOrange3() {
        // generate a new node in the scene with a preset template
        var newOrange3 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool2.size() > 0) {
            console.log(this.orangePool2.size() + " What is the pool size");
            newOrange3 = this.orangePool2.get(); // this will be passed to Star's reuse method
        } else {
            newOrange3 = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange3);
        // set up a random position for the star
        newOrange3.setPosition(this.getNewOrangePosition3());
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        