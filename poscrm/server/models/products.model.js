var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Products = new Schema({
    "ProductId":{type:Number,required:true,unique:true,min:1},
    "ProductName":{type:String,required:true},
    "Price":{type:Number,required:true,min:1}
});

module.exports = mongoose.model("Products",Products,"Products");