
const Player = require('Player');
const Water = require('BlueWater');
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

        bgm: {
            default: null,
            type: cc.AudioClip
        },
        restartBtn:{
            default:null,
            type: cc.Node
        },


        waterPrefab: cc.Prefab,
        greenPrefab: cc.Prefab,
        eggPrefab: cc.Prefab,
        applePrefab: cc.Prefab,
        applePrefab2: cc.Prefab,
        orangePrefab: cc.Prefab,
        bombPrefab: cc.Prefab,


    },

    onLoad: function () {

        Global.gameEnd = 0
        this.restartBtn.active = false;
        

        this.node.on(cc.Node.EventType.TOUCH_START, () => { 
            console.log("TOUCH_START")
            Global.reset = 0;
            cc.director.getCollisionManager().enabled = true;
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
            cc.director.getCollisionManager().enabled = false;

        }, this, true);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            console.log("TOUCH_CANCEL");
            this.spear.resetCount();
        }, this, true);

        this.enabled=false;
        this.spear.enabled = true;

        //Node pools for different food object
        this.waterPool = new cc.NodePool('Water');
        this.waterPool2 = new cc.NodePool('Water2');

        this.greenPool = new cc.NodePool('Green');

        this.eggPool = new cc.NodePool('Egg');
        this.eggPool2 = new cc.NodePool('Egg');

        this.applePool = new cc.NodePool('Apple');
        this.applePool2 = new cc.NodePool('Apple2');

        this.orangePool = new cc.NodePool('Orange');
        this.orangePool2 = new cc.NodePool('Orange2');

        this.bombPool = new cc.NodePool('Bomb');
        this.bombPool2 = new cc.NodePool('Bomb2');

        // spawning Bomb dynamically row 3
        let initCountBomb = 1;
        for (let i = 0; i < initCountBomb; ++i) {
            let bomb = cc.instantiate(this.bombPrefab); // create node instance
            this.bombPool.put(bomb); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewBomb();
        }, interval, this.bombPool.size(), 0);

        // spawning Bomb dynamically row 3
        let initCountBomb2 = 0;
        for (let i = 0; i < initCountBomb2; ++i) {
            let bomb2 = cc.instantiate(this.bombPrefab); // create node instance
            this.bombPool2.put(bomb2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewBomb();
        }, interval, this.bombPool2.size(), 4.5);


        

        // //Play music
        //  // Time interval in units of seconds
        // var interval = 1;
        // // Time of repetition
        // var repeat = 0;
        // // Start delay
        // var delay = 0;
        // this.schedule(function() {
        //     // Here `this` is referring to the component
        //     this.playMusic();
        //     console.log("test music")
        // }, interval, repeat, delay);

        // spawning water dynamically row 2
        let initCount = 1;
        for (let i = 0; i < initCount; ++i) {
            let water = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool.put(water); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function() {
            // Here `this` is referring to the component
            this.spawnNewWater();
        }, interval, this.waterPool.size(), 2.25);


        // spawning water dynamically row 3
        let initCount2 = 0;
        for (let i = 0; i < initCount2; ++i) {
            let water2 = cc.instantiate(this.waterPrefab); // create node instance
            this.waterPool2.put(water2); // populate your pool with put method
        }
        // Time interval in units of seconds
        var interval = 1.5;
        // Start delay
        this.schedule(function() {
            // Here `this` is referring to the component
            this.spawnNewWater2();
        }, interval, this.waterPool2.size(), 2.25);


        
        // // spawning green dynamically
        // let initCountGreen = 2;
        // for (let i = 0; i < initCountGreen; ++i) {
        //     let green = cc.instantiate(this.greenPrefab); // create node instance
        //     this.greenPool.put(green); // populate your pool with put method
        // }
        // // Time interval in units of seconds
        // var interval = 1.5;
        // // Start delay

        // this.schedule(function() {
        //     // Here `this` is referring to the component
        //     this.spawnNewGreen();
        // }, interval, this.greenPool.size(), 1.75);


        // spawning Egg dynamically row 3
        // let initCountEgg = 1;
        // for (let i = 0; i < initCountEgg; ++i) {
        //     let egg = cc.instantiate(this.eggPrefab); // create node instance
        //     this.eggPool.put(egg); // populate your pool with put method
        // }
        // var interval = 1.5;

        // this.schedule(function() {
        //     this.spawnNewEgg();
        // }, interval, this.eggPool.size(), 0);

        // // spawning Egg dynamically row 3
        // let initCountEgg2 = 0;
        // for (let i = 0; i < initCountEgg2; ++i) {
        //     let egg2 = cc.instantiate(this.eggPrefab); // create node instance
        //     this.eggPool2.put(egg2); // populate your pool with put method
        // }
        // var interval = 1.5;

        // this.schedule(function() {
        //     this.spawnNewEgg();
        // }, interval, this.eggPool2.size(), 4.5);
        

                






        // spawning Apple2 dynamically row 1
        let initCountApple2 = 0;
        for (let i = 0; i < initCountApple2; ++i) {
            let apple2 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewApple2();
        }, interval, this.applePool2.size(), 3.35);

        // spawning Apple dynamically row 2
        let initCountApple = 1;
        for (let i = 0; i < initCountApple; ++i) {
            let apple = cc.instantiate(this.applePrefab); // create node instance
            this.applePool.put(apple); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewApple();
        }, interval, this.applePool.size(), 0);

        // spawning Apple2 dynamically row 2
        let initCountApple3 = 0;
        for (let i = 0; i < initCountApple3; ++i) {
            let apple2 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewApple3();
        }, interval, this.applePool2.size(), 5.25);


        // spawning Apple2 dynamically row 3
        let initCountApple4 = 1;
        for (let i = 0; i < initCountApple4; ++i) {
            let apple4 = cc.instantiate(this.applePrefab); // create node instance
            this.applePool2.put(apple4); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewApple4();
        }, interval, this.applePool2.size(), 3.75);







        // spawning Orange2 dynamically row 1
        let initCountOrange2 = 0;
        for (let i = 0; i < initCountOrange2; ++i) {
            let orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewOrange2();
        }, interval, this.orangePool2.size(), 1.75);

        // spawning Orange3 dynamically row 1
        let initCountOrange3 = 0;
        for (let i = 0; i < initCountOrange3; ++i) {
            let orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewOrange2();
        }, interval, this.orangePool2.size(), 4.75);

        // spawning Orange3 dynamically row 2
        let initCountOrange4 = 0;
        for (let i = 0; i < initCountOrange4; ++i) {
            let orange2 = cc.instantiate(this.orangePrefab); // create node instance
            this.orangePool2.put(orange2); // populate your pool with put method
        }
        var interval = 1.5;

        this.schedule(function() {
            this.spawnNewOrange3();
        }, interval, this.orangePool2.size(), 4.5);




    },


    playMusic:function(){
        cc.audioEngine.playMusic(this.bgm, true);
    },


    spawnNewWater: function() {
        // generate a new node in the scene with a preset template
        var newWater = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.waterPool.size() > 0) {
                console.log(this.waterPool.size()+" What is the pool size")
                newWater = this.waterPool.get(); // this will be passed to Star's reuse method

        } else {
            newWater = cc.instantiate(this.waterPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newWater);
        // set up a random position for the star
        newWater.setPosition(this.getNewWaterPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewWaterPosition: function () {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewWater2: function() {
        // generate a new node in the scene with a preset template
        var newWater2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.waterPool2.size() > 0) {
                console.log(this.waterPool2.size()+" What is the pool size")
                newWater2 = this.waterPool2.get(); // this will be passed to Star's reuse method

        } else {
            newWater2 = cc.instantiate(this.waterPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newWater2);
        // set up a random position for the star
        newWater2.setPosition(this.getNewWaterPosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewWaterPosition2: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewGreen: function() {
        // generate a new node in the scene with a preset template
        var newGreen = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.greenPool.size() > 0) {
                console.log(this.greenPool.size()+" What is the pool size")
                newGreen = this.greenPool.get(); // this will be passed to Star's reuse method

        } else {
            newGreen = cc.instantiate(this.greenPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newGreen);
        // set up a random position for the star
        newGreen.setPosition(this.getNewGreenPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewGreenPosition: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewBomb: function() {
        // generate a new node in the scene with a preset template
        var newBomb = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.bombPool.size() > 0) {
                console.log(this.bombPool.size()+" What is the pool size")
                newBomb = this.bombPool.get(); // this will be passed to Star's reuse method

        } else {
            newBomb = cc.instantiate(this.bombPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newBomb);
        // set up a random position for the star
        newBomb.setPosition(this.getNewBombPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewBombPosition: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewEgg: function() {
        // generate a new node in the scene with a preset template
        var newEgg = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.eggPool.size() > 0) {
                console.log(this.eggPool.size()+" What is the pool size")
                newEgg = this.eggPool.get(); // this will be passed to Star's reuse method

        } else {
            newEgg = cc.instantiate(this.eggPrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newEgg);
        // set up a random position for the star
        newEgg.setPosition(this.getNewEggPosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewEggPosition: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple: function() {
        // generate a new node in the scene with a preset template
        var newApple = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool.size() > 0) {
                console.log(this.applePool.size()+" What is the pool size")
                newApple = this.applePool.get(); // this will be passed to Star's reuse method

        } else {
            newApple = cc.instantiate(this.applePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newApple);
        // set up a random position for the star
        newApple.setPosition(this.getNewApplePosition());
        console.log("New position")
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewApplePosition: function () {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple2: function() {
        // generate a new node in the scene with a preset template
        var newApple2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
                console.log(this.applePool2.size()+" What is the pool size")
                newApple2 = this.applePool2.get(); // this will be passed to Star's reuse method

        } else {
            newApple2 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple2);
        newApple2.setPosition(this.getNewApplePosition2());
        console.log(newApple2.getPosition())

    },

    getNewApplePosition2: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple3: function() {
        // generate a new node in the scene with a preset template
        var newApple2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
                console.log(this.applePool2.size()+" What is the pool size")
                newApple2 = this.applePool2.get(); // this will be passed to Star's reuse method

        } else {
            newApple2 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple2);
        newApple2.setPosition(this.getNewApplePosition3());
        console.log(newApple2.getPosition())

    },

    getNewApplePosition3: function () {
        var randX = -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewApple4: function() {
        // generate a new node in the scene with a preset template
        var newApple4 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.applePool2.size() > 0) {
                console.log(this.applePool.size()+" What is the pool size")
                newApple4 = this.applePool.get(); // this will be passed to Star's reuse method

        } else {
            newApple4 = cc.instantiate(this.applePrefab);
        }
        this.node.addChild(newApple4);
        newApple4.setPosition(this.getNewApplePosition4());

    },

    getNewApplePosition4: function () {
        var randX = 300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 309
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },


    spawnNewOrange: function() {
        // generate a new node in the scene with a preset template
        var newOrange = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool.size() > 0) {
                console.log(this.orangePool.size()+" What is the pool size")
                newOrange = this.orangePool.get(); // this will be passed to Star's reuse method

        } else {
            newOrange = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange);
        // set up a random position for the star
        newOrange.setPosition(this.getNewOrangePosition());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition: function () {
        var randX =  284;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 305
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange2: function() {
        // generate a new node in the scene with a preset template
        var newOrange2 = null;
        // 使用给定的模板在场景中生成一个新节点
        if (this.orangePool2.size() > 0) {
                console.log(this.orangePool2.size()+" What is the pool size")
                newOrange2 = this.orangePool2.get(); // this will be passed to Star's reuse method

        } else {
            newOrange2 = cc.instantiate(this.orangePrefab);
        }
        // put the newly added node under the Canvas node
        this.node.addChild(newOrange2);
        // set up a random position for the star
        newOrange2.setPosition(this.getNewOrangePosition2());
        // pass Game instance to star
        // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition2: function () {
        var randX =  300;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 105
        // return to the anchor point of the star
        return cc.v2(randX, randY);
    },

    spawnNewOrange3: function() {
    // generate a new node in the scene with a preset template
    var newOrange3 = null;
    // 使用给定的模板在场景中生成一个新节点
    if (this.orangePool2.size() > 0) {
            console.log(this.orangePool2.size()+" What is the pool size")
            newOrange3 = this.orangePool2.get(); // this will be passed to Star's reuse method

    } else {
        newOrange3 = cc.instantiate(this.orangePrefab);
    }
    // put the newly added node under the Canvas node
    this.node.addChild(newOrange3);
    // set up a random position for the star
    newOrange3.setPosition(this.getNewOrangePosition3());
    // pass Game instance to star
    // newWater.getComponent('Star').init(this);
    },

    getNewOrangePosition3: function () {
        var randX =  -320;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the star on the y axis
        var randY = 209
        // return to the anchor point of the star
        return cc.v2(randX, randY);
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