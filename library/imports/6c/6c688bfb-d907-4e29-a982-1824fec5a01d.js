"use strict";
cc._RF.push(module, '6c688v72QdOKamCGCT+xaAd', 'Player');
// scripts/Player.js

'use strict';

cc.Class({
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
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {

        this.enabled = false;
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();

        // this.node.on(console.log('testingtouch'), this.testingtouch ,this);
        // this.node.on(cc.Node.EventType.TOUCH_START, () => { 
        //     console.log("TOUCH_START");
        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_MOVE, () => {
        //     console.log("TOUCH_MOVE");
        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     console.log("TOUCH_END");
        // }, this, true);

        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
        //     console.log("TOUCH_CANCEL");
        // }, this, true);


        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //Touch

        var touchReceiver = cc.Canvas.instance.node;

        touchReceiver.on('touchStart', this.onTouchStart, this);
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('hit');

        if (Global.arrayfood.length == 6) {
            Global.arrayfood.slice(0, 5);
            console.log(Global.arrayfood);

            console.log(this.hasConsecutive(Global.arrayfood, 3));
        } else {
            Global.arrayfood.push("Apple");
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood, 3));
        }
    },

    hasConsecutive: function hasConsecutive(arr, amount) {
        var last = null;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != last) {
                last = arr[i];
                count = 0;
            }
            count += 1;
            if (amount <= count) {
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                console.log("hasConsecutive end player", Global.arrayfood);
                return true;
            }
        }
        return false;
    },

    clearArray: function clearArray() {
        Global.arrayfood = [];
    },

    onDestroy: function onDestroy() {

        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        //Touch

        var touchReceiver = cc.Canvas.instance.node;

        touchReceiver.off('touchStart', this.onTouchStart, this);
    },


    onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.director.getPhysicsManager().enabled = true;
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    // onCollisionEnter: function (other, self) {
    //     this.label.string = 'Collision on tag : ' + self.tag;
    // },


    onKeyDown: function onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;

        }
    },


    stopMove: function stopMove(event) {
        this.node.stopAllActions();
    },

    setJumpAction: function setJumpAction() {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this);
        //Rotate
        // var actionBy = cc.rotateBy(1,160);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },

    startMoveAt: function startMoveAt(pos) {
        this.enabled = true;
        this.xSpeed = 0;
        this.node.setPosition(pos);
        this.node.runAction(this.setJumpAction());
    },

    getCenterPos: function getCenterPos() {
        var centerPos = cc.v2(this.node.x, this.node.y + this.node.height / 2);
        return centerPos;
    },

    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },

    update: function update(dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;

        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            this.xSpeed = 0;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.xSpeed = 0;
        }
    }
});

cc._RF.pop();