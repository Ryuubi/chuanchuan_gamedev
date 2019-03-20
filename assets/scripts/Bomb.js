const Spear = require('Spear');

cc.Class({
    extends: cc.Component,
    
    properties: {
    },

    onLoad: function () {

    },


    onCollisionEnter: function (other, self) {
        console.log('hit');
        cc.game.restart();
        
    }



});
