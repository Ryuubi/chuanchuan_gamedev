(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Egg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '42d53Uc+WJJMaa6K5L0qv2f', 'Egg', __filename);
// scripts/Egg.js

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

cc.Class({
    extends: cc.Component,

    properties: {},

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

        if (Global.arrayfood.length == 6) {
            Global.arrayfood.slice(0, 5);
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 0 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -350);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 1 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -300);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 2 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -250);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 3 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -200);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 4 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -150);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 5 && this.node.y > 100) {
            Global.arrayfood.push("Egg");
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

            if (arr[i] == last && count == 1 && Global.eggfirst == null) {

                Global.eggfirst = currentNode;
            }

            if (arr[i] == last && count == 2 && Global.eggsecond == null) {

                Global.eggsecond = currentNode;
            }
            if (arr[i] == last && count == 3 && Global.eggthird == null) {
                Global.eggthird = currentNode;
            }

            console.log("hasConsecutive orange", amount, count);
            if (amount <= count) {
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.eggfirst.destroy();
                Global.eggsecond.destroy();
                Global.eggthird.destroy();

                Global.eggfirst = null;
                Global.eggsecond = null;
                Global.eggthird = null;

                console.log("hasConsecutive end orange", Global.arrayfood);
                return true;
            }
        }
        return false;
    }

    // update (dt) {},
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
        //# sourceMappingURL=Egg.js.map
        