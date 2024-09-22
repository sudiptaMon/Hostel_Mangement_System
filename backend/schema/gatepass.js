const client=require("mongoose");

const gatepassShema=new client.Schema({
    userid:{
        type:String
    },
    history:{
        type:Array
    },
    username:String,
    name:String,
})

const gatepass=client.model("gatepasses",gatepassShema);

module.exports=gatepass;