const Spear = require('Spear');

cc.Class({
    extends: cc.Component,
    
    properties: {
    },

    start: function () {
        this._timer = 0.0;
      },
    
      update: function (dt) {
        this._timer += dt;
        var pos = 0
        if ( this._timer >= 0.0 ) {
            pos = this.node.getPosition();
            // console.log(pos + " finding position")

            
            if(Global.gameEnd == 1){
                this.stopMoveAt();
            }

            else if( pos.x <= -875 && pos.y == 309){
                // this.node.setPosition(550,pos.y)
                this.node.destroy();

                
            }

            else if( pos.x <= -750 && pos.y == 105){
                // console.log(pos + "before reset position")
                this.node.setPosition(450,pos.y)
                // console.log(this.node.getPosition()+ "after reset position")

                
            }

        }



      },

    onLoad: function() {
       

        var moveleftway = this.moveFood();
        this.node.runAction(moveleftway);

    },

    moveFood: function(){

        var moveleft =  cc.moveBy(4, cc.v2(-800,0));
        return cc.repeatForever(moveleft);

    },

    onCollisionEnter: function (other, self) {
        console.log('hit');
        Global.stone = 1

        
    },

    stopMoveAt: function () {
        this.node.stopAllActions();
    },




});
