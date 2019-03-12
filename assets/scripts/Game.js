
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
        // 获取地平面的 y 轴坐标
        // this.groundY = this.ground.y + this.ground.height/2;
        // 初始化计时器
    

        this.node.on(cc.Node.EventType.TOUCH_START, () => { 
            console.log("TOUCH_START")
            Global.reset = 0;
    
                // this.schedule(function() {
                //     // Here `this` is referring to the component
                //     console.log(this.intervalSetting());
                // }, 1);

                this.callback = function () {
                    if (Global.count === 3 || Global.reset == 1) {
                        // Cancel this timer at the sixth call-back
                        this.unschedule(this.callback);

                    }
                    else if(Global.count < 3 || Global.reset == 0){
                        this.spear.intervalSetting();
                        console.log(Global.count);

                    }


                    
                
                }
                this.schedule(this.callback, 0.5);
            


        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, () => {
            console.log("TOUCH_MOVE");
            

        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            console.log("TOUCH_END");
            this.spear.startMoveAt();
            this.spear.resetCount();

        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            console.log("TOUCH_CANCEL");
            this.spear.resetCount();
        }, this, true);


        this.enabled=false;
        // 初始化计分
        this.score = 0;

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
    



    update: function (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
            return;
        }
        this.timer += dt;
    },

});