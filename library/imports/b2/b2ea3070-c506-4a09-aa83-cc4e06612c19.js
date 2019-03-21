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