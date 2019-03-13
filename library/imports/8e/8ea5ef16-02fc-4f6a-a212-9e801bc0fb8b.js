"use strict";
cc._RF.push(module, '8ea5e8WAvxPaqISnoAbwPuL', 'Orange2');
// scripts/Orange2.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {

        game: {
            default: null,
            type: game
        }

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function onLoad() {

        cc.director.getCollisionManager().enabled = true;
        var actionBy = this.rotateFood();
        this.node.runAction(actionBy);
    },

    rotateFood: function rotateFood() {
        var sactionBy = cc.rotateBy(1, 90);
        return cc.repeatForever(sactionBy);
    },

    realign: function realign() {
        this.node.anchorX = 0.5;
        this.node.anchorY = 0.5;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('hit');
        this.node.stopAllActions();

        if (Global.arrayfood.length == 6 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
            if (Global.arrayfood.length == 7) {
                console.log("Game over");
                Global.arrayfood = [];
                cc.game.restart();
            }
        } else if (Global.arrayfood.length == 0 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -350);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 1 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -300);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 2 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -250);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 3 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -200);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 4 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -150);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 5 && this.node.y > 100) {
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -100);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        }
    },

    hasConsecutive: function hasConsecutive(arr, amount) {
        var last = null;
        var currentNode = this.node;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != last) {
                last = arr[i];
                count = 0;

                console.log("Reset to 0 again");
            }

            console.log("Count Number before Add : " + count);

            count += 1;

            console.log("Count Number after Add : " + count);

            if (arr[i] == last && count == 1 && Global.orangefirst == null) {

                Global.orangefirst = currentNode;
                Global.replacementcount = 1;

                console.log("Log first");
                console.log("Log replacement count" + Global.replacementcount);
                break;
            }

            if (arr[i] == last && count == 1 && Global.orangesecond == null && Global.orangefirst != null) {

                Global.orangesecond = currentNode;

                console.log("Log second");
                break;
            }

            if (arr[i] == last && count == 1 && Global.orangefirst != null && Global.replacementcount == 1 && Global.orangesecond == null && Global.orangethird == null) {

                Global.orangefirst = currentNode;
                Global.replacementcount = 2;

                console.log("Log first");
                console.log("Global.replacementcount" + Global.replacementcount);
                break;
            }

            if (arr[i] == last && count == 3 && Global.orangethird == null) {
                Global.orangethird = currentNode;

                console.log("Log third");
            }

            console.log("hasConsecutive orange", amount, count);
            if (amount <= count) {
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.orangefirst.destroy();
                Global.orangesecond.destroy();
                Global.orangethird.destroy();

                Global.orangefirst = null;
                Global.orangesecond = null;
                Global.orangethird = null;

                console.log("hasConsecutive end orange", Global.arrayfood);
                return true;
            }
        }
        return false;
    }

    // update (dt) {},
});

cc._RF.pop();