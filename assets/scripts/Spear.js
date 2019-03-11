// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

window.Global={
    count: 0 ,
    reset: 0,
    arrayfood: []
}
var spear = cc.Class({
    extends: cc.Component,

    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        // 加速度
        accel: 0,
        //Medium Jump
        MedjumpHeight: 200,
        //Max Jump
        MaxjumpHeight: 250,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onLoad: function() {


        this.enabled=false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        //Collison
        cc.director.getCollisionManager().enabled = true;

        // this.node.on(cc.Node.EventType.TOUCH_START, () => { 
        //     console.log("TOUCH_START")
        //     Global.reset = 0;
    
        //         // this.schedule(function() {
        //         //     // Here `this` is referring to the component
        //         //     console.log(this.intervalSetting());
        //         // }, 1);

        //         this.callback = function () {
        //             if (Global.count === 3 || Global.reset == 1) {
        //                 // Cancel this timer at the sixth call-back
        //                 this.unschedule(this.callback);

        //             }
        //             else if(Global.count < 3 || Global.reset == 0){
        //                 this.intervalSetting();
        //                 console.log(Global.count);

        //             }


                    
                
        //         }
        //         this.schedule(this.callback, 1);
            


        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_MOVE, () => {
        //     console.log("TOUCH_MOVE");
            

        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     console.log("TOUCH_END");
        //     this.startMoveAt();
        //     this.resetCount();

        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
        //     console.log("TOUCH_CANCEL");
        //     this.resetCount();
        // }, this, true);

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

    setJumpAction: function () {


                    // 跳跃上升
        if(Global.count == 1 || Global.count == 0 || Global.count == null){
            var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
            // 下落
            var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        }
        //Rotate
        // var actionBy = cc.rotateBy(1,160);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音


        else if(Global.count == 2){

            // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, (this.MedjumpHeight))).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -(this.MedjumpHeight))).easing(cc.easeCubicActionIn());
        //Rotate

        }
        else if(Global.count == 3){

        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.MaxjumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.MaxjumpHeight)).easing(cc.easeCubicActionIn());


        }
    

        return cc.repeat(cc.sequence(jumpUp,jumpDown),1);
    },

    startMoveAt: function () {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.runAction(this.setJumpAction());
    },

    // update (dt) {},
});
