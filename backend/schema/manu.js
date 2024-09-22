const mongoose=require("mongoose");

let manuSchema=new mongoose.Schema({
    day:String,
    breakfase:Array,
    lunch:Array,
    tiffin:Array,
    dinner:Array
})

let manu=mongoose.model("manu",manuSchema);

module.exports=manu;