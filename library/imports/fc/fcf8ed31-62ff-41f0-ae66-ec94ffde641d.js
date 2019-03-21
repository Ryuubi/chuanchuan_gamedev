"use strict";
cc._RF.push(module, 'fcf8e0xYv9B8K5m7JT/3mQd', 'Camera');
// scripts/Camera.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var camera = cc.Class({
    extends: cc.Component,

    properties: {
        camera: {
            default: null,
            type: cc.Camera
        },
        shakeAnimation: {
            default: null,
            type: cc.Animation
        },
        canShake: false,
        shakeDuration: {
            default: 0,
            visible: function visible() {
                return this.canShake;
            }
        }
    },

    shakeCamera: function shakeCamera() {
        // if (!this.canShake) return;
        this.anim.play('shake');
        this.scheduleOnce(this.stopShake.bind(this), this.shakeDuration);
    },
    stopShake: function stopShake() {
        this.anim.stop();
        this.camera.node.position = cc.p(0, 0);
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},
    update: function update(dt) {
        if (Global.bombEnd == 1) {
            this.shakeCamera();
            this.stopShake();
        }
    }
});

cc._RF.pop();