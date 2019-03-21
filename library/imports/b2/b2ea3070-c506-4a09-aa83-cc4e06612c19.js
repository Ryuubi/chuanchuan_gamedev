"use strict";
cc._RF.push(module, 'b2ea3BwxQZKCaqDzE4GYSwZ', 'Bomb');
// scripts/Bomb.js

'use strict';

var Orange = require('Orange2');

cc.Class({
    extends: cc.Component,

    properties: {

        orange: {
            default: null,
            type: Orange
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        Global.explosionAnimation = 2;
        this.node.destroy();
        Global.gameEnd = 1;
    },

    onLoad: function onLoad() {

        // cc.director.getCollisionManager().enabled = true;
        // var actionBy = this.rotateFood();
        // this.node.runAction(actionBy);


        var moveleftway = this.moveFood();
        this.node.runAction(moveleftway);
    },

    moveFood: function moveFood() {

        var moveleft = cc.moveBy(4, cc.v2(-800, 0));
        return cc.repeatForever(moveleft);
    },

    spawnGameOver: function spawnGameOver() {
        // 使用给定的模板在场景中生成一个新节点
        var Gameover = cc.instantiate(this.starPrefab);
        this.node.addChild(Gameover);
        Gameover.setPosition(this.getGameOverPos());
        this.timer = 0;
    },

    getGameOverPos: function getGameOverPos() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = 348;
        // 返回星星坐标
        return cc.v2(randX, randY);
    },

    start: function start() {
        this._timer = 0.0;
    },

    update: function update(dt) {
        this._timer += dt;
        var pos = 0;
        if (this._timer >= 0.0) {
            pos = this.node.getPosition();
            // console.log(pos + " finding position")
            if (Global.gameEnd == 1) {
                this.stopMoveAt();
                this.spawnGameOver;
            } else if (pos.x <= -600) {
                // console.log(pos + "before reset position")
                this.node.setPosition(300, pos.y);
                // console.log(this.node.getPosition()+ "after reset position")

            }
        }
    },

    stopMoveAt: function stopMoveAt() {
        this.node.stopAllActions();
    }

});

cc._RF.pop();