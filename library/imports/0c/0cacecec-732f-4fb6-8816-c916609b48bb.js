"use strict";
cc._RF.push(module, '0cacezscy9PtogWyRZgm0i7', 'Spear');
// scripts/Spear.js

"use strict";

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
    explosionAnimation: 1,
    gameEnd: 0

};
var spear = cc.Class({
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

    explosionAnimation: function explosionAnimation() {
        var explosion = cc.instantiate(this.explosionEffect);
        this.node.addChild(explosion);
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
    },

    update: function update(dt) {
        if (Global.animation == 2) {
            this.animation();
            Global.animation = 1;
        }
        if (Global.explosionAnimation == 2) {
            this.explosionAnimation();
            Global.explosionAnimation = 1;
        }
    }
});

cc._RF.pop();