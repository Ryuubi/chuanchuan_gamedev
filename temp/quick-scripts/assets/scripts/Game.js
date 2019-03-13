(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game', __filename);
// scripts/Game.js

'use strict';

var Player = require('Player');
var Star = require('Star');
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
        }

    },

    onLoad: function onLoad() {
        var _this = this;

        Global.gameover = 0;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            console.log("TOUCH_START");
            Global.reset = 0;

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
        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            console.log("TOUCH_CANCEL");
            _this.spear.resetCount();
        }, this, true);

        this.enabled = false;
        // 初始化计分
        this.score = 0;
        this.spear.enabled = true;

        // initialize star and score pool
        this.starPool = new cc.NodePool('Star');
        this.ApplePool = new cc.NodePool('Apple');
        this.OrangePool = new cc.NodePool('Orange');
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
        