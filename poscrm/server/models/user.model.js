var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports=mongoose.model("users",new Schema({
    name:String,
    password:String,
    admin:Boolean, 
}));
