"use strict";
cc._RF.push(module, 'b2ea3BwxQZKCaqDzE4GYSwZ', 'Bomb');
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