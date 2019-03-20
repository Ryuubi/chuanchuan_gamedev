(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Bomb.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b2ea3BwxQZKCaqDzE4GYSwZ', 'Bomb', __filename);
// scripts/Bomb.js

'use strict';

var Spear = require('Spear');

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('hit');
        cc.game.restart();
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
        //# sourceMappingURL=Bomb.js.map
        