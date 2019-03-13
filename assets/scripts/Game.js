
const Player = require('Player');
const Star = require('Star');
const Spear = require('Spear');
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
        },


    },

    onLoad: function () {

        Global.gameover = 0;

    

        this.node.on(cc.Node.EventType.TOUCH_START, () => { 
            console.log("TOUCH_START")
            Global.reset = 0;

            this.spear.holdMoveAt();
            

            


        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, () => {
            console.log("TOUCH_MOVE");
            

        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("TOUCH_END");
            this.spear.startMoveAt();
            this.spear.resetCount();
            this.spear.stopMoveAt();
            this.spear.goDownAt();

        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            console.log("TOUCH_CANCEL");
            this.spear.resetCount();
        }, this, true);


        this.enabled=false;
        // 初始化计分
        this.score = 0;
        this.spear.enabled = true;

        // initialize star and score pool
        this.starPool = new cc.NodePool('Star');
        this.ApplePool = new cc.NodePool('Apple');
        this.OrangePool = new cc.NodePool('Orange');
    },

    intervalSetting: function() {
  
      
        Global.count += 1;
        Global.reset = 0;
        return Global.count;
    
},

    resetCount: function(){
        Global.count = 0;
        Global.reset = 1;

        return Global.reset; 


    },


    onStartGame: function(){

        this.enabled=true

        this.btnNode.x = 3000;
        this.GameOver.active = false;


        
    },

  


    



});