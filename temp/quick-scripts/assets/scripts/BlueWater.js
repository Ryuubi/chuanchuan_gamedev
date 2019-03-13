(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/BlueWater.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6b5b1xpiSdH74i4kOm6FZhH', 'BlueWater', __filename);
// scripts/BlueWater.js

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

    onDestroy: function onDestroy() {
        console.log("onDestroy");
        //    const labNode = cc.find("New Label", this.node);
        //    console.log(labNode);
        //    console.log("lab text", labNode.getComponent(cc.Label).string);
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
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
            if (Global.arrayfood.length == 7) {
                console.log("Game over");
                Global.arrayfood = [];
                cc.game.restart();
            }
        } else if (Global.arrayfood.length == 0 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -350);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 1 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -300);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 2 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -250);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 3 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -200);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 4 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -150);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 5 && this.node.y > 100) {
            Global.arrayfood.push("Blue");
            console.log(Global.arrayfood);
            this.realign();
            this.node.setPosition(19, -100);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        }
    },

    hasConsecutive: function hasConsecutive(arr, amount) {
        console.log("blue water hasConsecutive");
        var last = null;
        var currentNode = this.node;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != last) {
                last = arr[i];
                count = 0;

                console.log("Reset to 0 for bluewater");
            }

            console.log("Count Number before Add : " + count);

            count += 1;
            console.log("Count Number after Add : " + count);
            console.log("Global.replacementcount" + Global.replacementcount);

            if (arr[i] == last && count == 1 && Global.waterfirst == null) {

                Global.waterfirst = currentNode;
                console.log("Log replacement count" + Global.replacementcount);
                Global.replacementcount = 1;

                var labNode = cc.find("New Label", currentNode);
                console.log("lab text waterfirst normal", labNode.getComponent(cc.Label).string);
                console.log("Log first");
                console.log("Log replacement count" + Global.replacementcount);
                break;
            }

            if (arr[i] == last && count == 1 && Global.watersecond == null && Global.waterfirst != null) {

                Global.watersecond = currentNode;
                var _labNode = cc.find("New Label", currentNode);
                console.log("lab text watersecond normal", _labNode.getComponent(cc.Label).string);

                console.log("Log second");
                break;
            }

            if (arr[i] == last && count == 1 && Global.waterfirst != null && Global.replacementcount == 1 && Global.watersecond == null && Global.waterthird == null) {

                Global.waterfirst = currentNode;
                Global.replacementcount = 2;

                var _labNode2 = cc.find("New Label", currentNode);
                console.log("lab text waterfirst replacing first", _labNode2.getComponent(cc.Label).string);
                console.log(Global.waterfirst + "     checkwater1");
                console.log(Global.watersecond + "     checkwater2");
                console.log(Global.waterthird + "     checkwater3");
                console.log(Global.eggfirst + "        check egg1");
                console.log(Global.eggsecond + "        check egg2");
                console.log(Global.eggthird + "        check egg3");
                console.log("Log first");
                console.log("Global.replacementcount" + Global.replacementcount);
                break;
            }

            if (arr[i] == last && count == 3 && Global.waterthird == null) {
                Global.waterthird = currentNode;
                var _labNode3 = cc.find("New Label", currentNode);
                console.log("lab text waterthird normal", _labNode3.getComponent(cc.Label).string);

                console.log("Log third");
            }

            // if(arr[i]== last && count == 2 && Global.waterfirst != null && Global.replacementcount == 0 && Global.watersecond == null && Global.waterthird == null){

            //     Global.watersecond = currentNode;
            //     const labNode = cc.find("New Label", currentNode);
            //     console.log("lab text watersecond 3 straight", labNode.getComponent(cc.Label).string);
            //     console.log(Global.waterfirst+"     checkwater1");
            //     console.log(Global.watersecond+"     checkwater2");
            //     console.log(Global.waterthird+"     checkwater3");
            //     console.log(Global.eggfirst+"        check egg1")
            //     console.log(Global.eggsecond+"        check egg2")
            //     console.log(Global.eggthird+"        check egg3")
            //     console.log("Log first")
            //     console.log("Global.replacementcount"+ Global.replacementcount)
            //     break

            // }


            // if(arr[i]== last && count == 1 && Global.waterfirst != null && Global.replacementcount == 0 && Global.watersecond == null && Global.waterthird == null){

            //     Global.waterfirst = currentNode;
            //     Global.replacementcount = 1
            //     const labNode = cc.find("New Label", currentNode);
            //     console.log("lab text waterfirst replacing first", labNode.getComponent(cc.Label).string);
            //     console.log(Global.waterfirst+"     checkwater1");
            //     console.log(Global.watersecond+"     checkwater2");
            //     console.log(Global.waterthird+"     checkwater3");
            //     console.log(Global.eggfirst+"        check egg1")
            //     console.log(Global.eggsecond+"        check egg2")
            //     console.log(Global.eggthird+"        check egg3")
            //     console.log("Log first")
            //     console.log("Global.replacementcount"+ Global.replacementcount)
            //     break

            // }


            // if(arr[i]== last && count == 2 && Global.replacementcount == 1 && Global.watersecond == null ){

            //     Global.watersecond = currentNode;
            //     const labNode = cc.find("New Label", currentNode);
            //     console.log("lab text waterfirst", labNode.getComponent(cc.Label).string);
            //     console.log(Global.waterfirst+"     checkwater1");
            //     console.log(Global.watersecond+"     checkwater2");
            //     console.log(Global.waterthird+"     checkwater3");
            //     console.log(Global.eggfirst+"        check egg1")
            //     console.log(Global.eggsecond+"        check egg2")
            //     console.log(Global.eggthird+"        check egg3")
            //     console.log("Log second stuff")
            //     break

            // }


            console.log("hasConsecutive water", amount, count);
            if (amount <= count) {
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.waterfirst.destroy();
                console.log("Destroy waterfirst");
                Global.watersecond.destroy();
                console.log("Destroy watersecond");
                Global.waterthird.destroy();
                console.log("Destroy waterthird");

                Global.waterfirst = null;
                Global.watersecond = null;
                Global.waterthird = null;
                Global.replacementcount = 0;

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
        //# sourceMappingURL=BlueWater.js.map
        