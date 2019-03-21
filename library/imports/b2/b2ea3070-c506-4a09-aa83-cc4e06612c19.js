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
        },

        restartBtn: {
            default: null,
            type: cc.Prefab
        },

        restartLabel: {
            default: null,
            type: cc.Prefab
        },
        failAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.node.destroy();
        Global.gameEnd = 1;
        cc.audioEngine.playEffect(this.failAudio, false);
        Global.firstnode = null;
        Global.secondnode = null;
        Global.thirdnode = null;
        Global.arrayFood = [];
    },

    onLoad: function onLoad() {},

    moveFood: function moveFood() {

        var moveleft = cc.moveBy(4, cc.v2(800, 0));
        return cc.repeatForever(moveleft);
    },

    moveFoodMed: function moveFoodMed() {

        var moveleft = cc.moveBy(3.5, cc.v2(800, 0));
        return cc.repeatForever(moveleft);
    },

    moveFoodOpp: function moveFoodOpp() {

        var moveleft = cc.moveBy(4, cc.v2(-800, 0));
        return cc.repeatForever(moveleft);
    },

    start: function start() {
        this._timer = 0.0;

        var pos2 = 0;
        pos2 = this.node.getPosition();

        if (pos2.y == 105) {
            var moveleftway = this.moveFoodOpp();
            this.node.runAction(moveleftway);
        } else if (pos2.y == 309) {
            var moveleftway = this.moveFoodOpp();
            this.node.runAction(moveleftway);
        } else {
            var moverighttway = this.moveFoodMed();
            this.node.runAction(moverighttway);
        }
    },

    update: function update(dt) {
        this._timer += dt;
        var pos = 0;
        if (this._timer >= 0.0) {
            pos = this.node.getPosition();
            // console.log(pos + " finding position")
            if (Global.gameEnd == 1) {
                this.stopMoveAt();
            } else if (pos.x > 2850 && pos.y == 209) {
                // console.log(pos + "before reset position")
                this.node.destroy();
                // console.log(this.node.getPosition()+ "after reset position")

            } else if (pos.x <= -875 && pos.y == 309) {
                // this.node.setPosition(600,pos.y)
                this.node.destroy();
            }
        }
    },

    stopMoveAt: function stopMoveAt() {
        this.node.stopAllActions();
    }

});

cc._RF.pop();