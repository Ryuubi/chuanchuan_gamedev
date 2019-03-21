(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Spear.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0cacezscy9PtogWyRZgm0i7', 'Spear', __filename);
// scripts/Spear.js

"use strict";

var _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

window.Global = {
    count: 0,
    reset: 0,
    arrayfood: [],
    arrayNode: [],
    first: null,
    second: null,
    third: null,
    firstnode: null,
    secondnode: null,
    thirdnode: null,
    replacementcount: 0,
    gameover: 0,
    parentSpear: null,
    position: null,
    animation: 1,
    gameEnd: 0,
    stone: 0

};
var spear = cc.Class((_cc$Class = {
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        //Medium Jump
        MedjumpHeight: 200,
        //Max Jump
        MaxjumpHeight: 250,
        animationEffect: {
            default: null,
            type: cc.Prefab
        },
        explosionEffect: {
            default: null,
            type: cc.Prefab
        },
        restartBtn: {
            default: null,
            type: cc.Node
        },

        restartLabel: {
            default: null,
            type: cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    onLoad: function onLoad() {

        this.enabled = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;
        Global.parentSpear = this.node;

        //Collison
        cc.director.getCollisionManager().enabled = true;
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

    holdMoveAt: function holdMoveAt() {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.runAction(this.goUp());
    },

    stopMoveAt: function stopMoveAt() {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.stopAllActions();
    },

    goDownAt: function goDownAt() {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.runAction(this.goDown());
    },

    goUp: function goUp() {

        var jumpUp = cc.moveBy(0.5, cc.v2(0, this.MaxjumpHeight));
        return cc.repeat(jumpUp, 1);
        // return cc.repeatForever(jumpUp);
    },

    goDown: function goDown() {

        var jumpDown = cc.moveTo(0.1, cc.v2(21, -311));
        return cc.repeat(jumpDown, 1);
    },

    animation: function animation() {
        var anime = cc.instantiate(this.animationEffect);
        anime.setPosition(cc.v2(Global.position.x, Global.position.y));
        this.node.addChild(anime);
    },

    setJumpAction: function setJumpAction() {

        // 跳跃上升
        if (Global.count == 1 || Global.count == 0 || Global.count == null) {
            var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
            // 下落
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
            console.log("hello");
        } else if (Global.count == 2) {

            // 跳跃上升
            var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.MedjumpHeight)).easing(cc.easeCubicActionOut());
            // 下落
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.MedjumpHeight)).easing(cc.easeCubicActionIn());
            //Rotate
        } else if (Global.count == 3) {

            // 跳跃上升
            var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.MaxjumpHeight)).easing(cc.easeCubicActionOut());
            // 下落
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.MaxjumpHeight)).easing(cc.easeCubicActionIn());
        }

        return cc.repeat(cc.sequence(jumpUp, jumpDown), 1);
    },

    startMoveAt: function startMoveAt() {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.runAction(this.setJumpAction());
    }

}, _defineProperty(_cc$Class, "stopMoveAt", function stopMoveAt() {
    this.node.stopAllActions();
}), _defineProperty(_cc$Class, "spawnGameOver", function spawnGameOver() {
    // 使用给定的模板在场景中生成一个新节点
    var Gameover = cc.instantiate(this.restartBtn);
    this.node.addChild(Gameover);
    Gameover.setPosition(this.getGameOverPos());
    this.timer = 0;
}), _defineProperty(_cc$Class, "getGameOverPos", function getGameOverPos() {
    var randX = 0;
    // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    var randY = 348;
    // 返回星星坐标
    return cc.v2(randX, randY);
}), _defineProperty(_cc$Class, "update", function update(dt) {

    if (Global.gameEnd == 1) {
        this.stopMoveAt();
        this.restartBtn.active = true;
        this.restartLabel.active = true;
    }

    if (Global.stone == 1) {
        this.stopMoveAt();
        this.goDownAt();
        Global.stone = 0;
    }

    if (Global.animation == 2) {
        this.animation();
        Global.animation = 1;
    }
}), _cc$Class));

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
        //# sourceMappingURL=Spear.js.map
        