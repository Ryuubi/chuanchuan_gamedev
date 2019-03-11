// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function() {
       
        cc.director.getCollisionManager().enabled = true;

    },


    onCollisionEnter:function(other,self){
        console.log('hit');
        
        if(Global.arrayfood.length == 6){
            Global.arrayfood.slice(0,5)
            console.log(Global.arrayfood);
            console.log(this.hasConsecutive(Global.arrayfood,3));

            
        }
        else if(Global.arrayfood.length == 0 && this.node.y > 100){
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.node.setPosition(339,-100)
            console.log(this.hasConsecutive(Global.arrayfood,3));
        }
        else if(Global.arrayfood.length == 1 && this.node.y > 100){
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.node.setPosition(339,-50)
            console.log(this.hasConsecutive(Global.arrayfood,3));
        }
        else if(Global.arrayfood.length == 2 && this.node.y > 100){
            Global.arrayfood.push("Orange");
            console.log(Global.arrayfood);
            this.node.setPosition(339,0)
            console.log(this.hasConsecutive(Global.arrayfood,3));
        }


        

    },

     hasConsecutive:function(arr, amount) {
        var last = null;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != last) {
                last = arr[i];
                count = 0;
            }
            count += 1;
            console.log("hasConsecutive orange", amount, count);
            if (amount <= count) {
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                Global.arrayfood.pop();
                console.log("hasConsecutive end orange", Global.arrayfood);
                return true;
                
            }
        }
        return false;
    },

 



    // update (dt) {},
});
