
const Player = require('Player');
const Star = require('Star');
const Spear = require('Spear');
var Game = cc.Class({
    extends: cc.Component,

    properties: {
        // 这个属性引用了星星预制资源
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: Player
        },
        spear: {
            default: null,
            type: Spear
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 得分音效资源
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        btnNode: {
            default: null,
            type: cc.Node
        },
        SpearNode: {
            default: null,
            type: cc.Node
        },
        GameOver: {
            default: null,
            type: cc.Node
        },

        collider: {
            default: null,
            type: cc.BoxCollider
        },
        colliderPlayer: {
            default: null,
            type: cc.BoxCollider
        },
    },

    onLoad: function () {
        // 获取地平面的 y 轴坐标
        this.groundY = this.ground.y + this.ground.height/2;
        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        // Current Star
        this.currentStar = null;
        this.currentStarX = 0;

        //Collision manager


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
                this.schedule(this.callback, 1);
            


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

        this.resetScore();

        this.enabled=true

        this.btnNode.x = 3000;
        this.GameOver.active = false;

        this.player.startMoveAt(cc.v2(0, this.groundY));

        


        // 生成一个新的星星
        this.spawnNewStar();
    },
    


    spawnNewStar: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = null;

        if (this.starPool.size()>0){
            newStar = this.starPool.get(This);
        }
        else{
            var newStar = cc.instantiate(this.starPrefab);
        }
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星组件上暂存 Game 对象的引用
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
        this.currentStar = newStar;
    },

    despawnStar: function(star){
        this.starPool.put(star);
        this.spawnNewStar();

    },



    

    getNewStarPosition: function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        // 返回星星坐标
        return cc.v2(randX, randY);
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

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    resetScore: function(){
        // Resetting the score
        this.score = 0;
        // Display the reset score
        this.scoreDisplay.string = 'Score: ' + this.score;
    },


    gameOver: function () {
        this.GameOver.active = true;
        this.player.enabled = false;
        this.player.stopMove();
        this.currentStar.destroy();
        this.btnNode.x = 0;

    }
});