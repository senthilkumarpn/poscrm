var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports=mongoose.model("Applicationusers",new Schema({
    name:{type:String,required:true,},
    password:{type:String,required:true},
    status:{type:String,required:true}, 
}));