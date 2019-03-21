(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Stone.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'Stone', __filename);
// scripts/Stone.js

'use strict';

var Spear = require('Spear');

cc.Class({
    extends: cc.Component,

    properties: {},

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
            } else if (pos.x <= -875 && pos.y == 309) {
                // this.node.setPosition(550,pos.y)
                this.node.destroy();
            } else if (pos.x <= -750 && pos.y == 105) {
                // console.log(pos + "before reset position")
                this.node.setPosition(450, pos.y);
                // console.log(this.node.getPosition()+ "after reset position")

            }
        }
    },

    onLoad: function onLoad() {

        var moveleftway = this.moveFood();
        this.node.runAction(moveleftway);
    },

    moveFood: function moveFood() {

        var moveleft = cc.moveBy(4, cc.v2(-800, 0));
        return cc.repeatForever(moveleft);
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('hit');
        Global.stone = 1;
    },

    stopMoveAt: function stopMoveAt() {
        this.node.stopAllActions();
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
        //# sourceMappingURL=Stone.js.map
        