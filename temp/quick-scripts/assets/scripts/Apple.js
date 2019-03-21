(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Apple.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '87891SnCzND2IGBVf9x9lUW', 'Apple', __filename);
// scripts/Apple.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        successAudio: {
            default: null,
            type: cc.AudioClip
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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
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
        console.log(pos2);

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

            if (Global.gameEnd == 1) {
                this.stopMoveAt();
            } else if (pos.x > 600 && pos.y == 209) {
                // console.log(pos + "before reset position")
                this.node.setPosition(-400, pos.y);
                // console.log(this.node.getPosition()+ "after reset position")

            } else if (pos.x <= -600 && pos.y == 105) {
                // console.log(pos + "before reset position")
                this.node.setPosition(300, pos.y);
                // console.log(this.node.getPosition()+ "after reset position")

            } else if (pos.x <= -600 && pos.y == 309) {
                // console.log(pos + "before reset position")
                this.node.setPosition(300, pos.y);
                // console.log(this.node.getPosition()+ "after reset position")

            }
        }
    },

    // rotateFood:function(){
    //     var sactionBy = cc.rotateBy(1,90);
    //     return cc.repeatForever(sactionBy);

    // },

    realign: function realign() {
        this.node.anchorX = 0.5;
        this.node.anchorY = 0.5;
    },
    stopMoveAt: function stopMoveAt() {
        this.node.stopAllActions();
    },

    goDownPos1: function goDownPos1() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, -150));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },
    goDownPos2: function goDownPos2() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, -100));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },
    goDownPos3: function goDownPos3() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, -50));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },
    goDownPos4: function goDownPos4() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, 0));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },
    goDownPos5: function goDownPos5() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, 50));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },
    goDownPos6: function goDownPos6() {
        this.node.setPosition(cc.v2(0, 200));
        var jumpDown = cc.moveTo(0.1, cc.v2(0, 100));
        this.node.parent = Global.parentSpear;
        console.log("Does it go down together");
        return cc.repeat(jumpDown, 1);
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('hit');
        this.node.stopAllActions();

        if (Global.arrayfood.length == 6 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
            if (Global.arrayfood.length == 7) {
                console.log("Game over");
                Global.arrayfood = [];
                cc.game.restart();
            }
        } else if (Global.arrayfood.length == 0 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos1());
            // this.node.setPosition(19,-350)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 1 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos2());
            // this.node.setPosition(19,-300)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 2 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos3());
            // this.node.setPosition(19,-250)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 3 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos4());
            // this.node.setPosition(19,-200)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 4 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos5());
            // this.node.setPosition(19,-150)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else if (Global.arrayfood.length == 5 && this.node.y > 100) {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            this.node.runAction(this.goDownPos6());
            // this.node.setPosition(19,-100)
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        }
    },

    hasConsecutive: function hasConsecutive(arr, amount) {
        var currentNode = this.node;
        var i = Global.arrayfood.length;
        var o = Global.arrayNode.length;
        var u = 0;
        console.log("hasConsecutive arregg", Global.arrayfood);
        while (u == 0) {

            if (Global.firstnode != null && Global.secondnode == null && Global.last == "Apple") {
                cc.audioEngine.playEffect(this.scoreAudio, false);
                Global.secondnode = currentNode;
                Global.arrayNode.push(currentNode);
                Global.last = "Apple";
                console.log("second node: " + Global.secondnode);
                console.log("last: " + Global.last);
                console.log("If secondnode empty put Apple here ver 2");
                break;
            } else if (Global.arrayfood.length == 1 && Global.firstnode == null) {
                cc.audioEngine.playEffect(this.scoreAudio, false);
                Global.firstnode = currentNode;
                Global.arrayNode.push(currentNode);
                console.log("When empty array put here");
                Global.last = "Apple";

                break;
            } else if (i != null && Global.arrayfood[i - 1] != Global.last && Global.firstnode != null) {
                cc.audioEngine.playEffect(this.scoreAudio, false);
                Global.firstnode = currentNode;
                Global.arrayNode.push(currentNode);
                Global.secondnode = null;
                Global.thirdnode = null;

                Global.last = "Apple";
                console.log("Replacing first node to Apple if different");
                break;
            } else if (Global.last == "Apple") {
                // if (Global.firstnode != null && Global.secondnode == null) {
                //     Global.secondnode = currentNode;
                //     Global.arrayNode.push(currentNode);
                //     console.log("second node: " + Global.secondnode);
                //     console.log("last: " + Global.last)
                //     console.log("If secondnode empty put Apple here")
                //     cc.audioEngine.playEffect(this.scoreAudio, false);
                //     break
                // } 
                if (Global.firstnode != null && Global.secondnode != null) {
                    if (Global.last == "Apple") {
                        cc.audioEngine.playEffect(this.successAudio, false);
                        Global.thirdnode = currentNode;
                        Global.arrayNode.push(currentNode);
                        console.log("If first and second filled put third Apple here");
                        console.log("third node: " + Global.thirdnode);
                        console.log("last: " + Global.last);
                        Global.position = Global.thirdnode.getPosition();

                        Global.arrayNode.pop();
                        Global.arrayNode.pop();
                        Global.arrayNode.pop();

                        Global.arrayfood.pop();
                        Global.arrayfood.pop();
                        Global.arrayfood.pop();

                        console.log(Global.arrayNode.length + "What is array node length");
                        console.log(Global.arrayfood.length + "What is array food length");
                        Global.firstnode.destroy();
                        console.log("Destroy waterfirst");
                        // const labNode1 = cc.find("New Label",  Global.waterfirst);
                        // console.log("lab text", labNode1.getComponent(cc.Label).string);

                        Global.secondnode.destroy();
                        console.log("Destroy watersecond");
                        // const labNode2 = cc.find("New Label",  Global.watersecond);
                        // console.log("lab text", labNode2.getComponent(cc.Label).string);

                        Global.thirdnode.destroy();
                        console.log("Destroy waterthird");
                        // const labNode3 = cc.find("New Label",  Global.waterthird);
                        // console.log("lab text", labNode3.getComponent(cc.Label).string);
                        //search array here to check if empty
                        // results: ["green","green","blue","blue"]

                        console.log("Arraynode size" + Global.arrayNode);

                        if (Global.arrayfood.length == 0) {

                            Global.firstnode = null;
                            Global.secondnode = null;
                            Global.thirdnode = null;
                            console.log("Null everything");
                            Global.animation = 2;
                            break;
                        } else if (Global.arrayfood.length == 1) {
                            Global.firstnode = Global.arrayNode[0];
                            Global.secondnode = null;
                            Global.thirdnode = null;
                            Global.last = Global.arrayfood[0];
                            console.log("first node is assigned to top of the array over after 3 in a row ");
                            console.log("arrayNode: " + Global.arrayNode[0]);
                            console.log("array: " + Global.arrayfood);
                            console.log("last: " + Global.last);
                            console.log("firstnode" + Global.firstnode);
                            console.log("secondnode" + Global.secondnode);
                            console.log("thirdnode" + Global.thirdnode);
                            Global.animation = 2;
                            break;
                        } else if (Global.arrayfood.length >= 2 && Global.arrayfood[Global.arrayfood.length - 1] == Global.arrayfood[Global.arrayfood.length - 2]) {
                            var length = Global.arrayNode.length - 1;
                            var length2 = Global.arrayNode.length - 2;
                            var arrayfoodlast = Global.arrayfood.length - 1;
                            console.log(length + " What is length");
                            Global.firstnode = Global.arrayNode[length];

                            Global.secondnode = Global.arrayNode[length2];

                            Global.thirdnode = null;
                            Global.last = Global.arrayfood[arrayfoodlast];
                            console.log("array: " + Global.arrayfood);
                            console.log("last: " + Global.last);
                            console.log("last: " + Global.arrayfood.length);
                            console.log("Replace node 1 and 2 ");
                            Global.animation = 2;
                            break;
                        } else if (Global.arrayfood.length >= 2 && Global.arrayfood[Global.arrayfood.length - 1] != Global.arrayfood[Global.arrayfood.length - 2]) {
                            var length = Global.arrayNode.length - 1;
                            var arrayfoodlast = Global.arrayfood.length - 1;
                            Global.firstnode = Global.arrayNode[length];
                            Global.secondnode = null;
                            Global.thirdnode = null;
                            Global.last = Global.arrayfood[arrayfoodlast];
                            console.log("Replace node 1 and null 2 3 ");
                            Global.animation = 2;
                            break;
                        }

                        break;
                    } else {
                        Global.firstnode = currentNode;
                        Global.secondnode = null;
                        Global.thirdnode = null;

                        break;
                    }
                }
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
        //# sourceMappingURL=Apple.js.map
        