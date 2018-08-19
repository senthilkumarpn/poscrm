var mongoose = require('mongoose');
var paymentSchema = new mongoose.Schema({
    name: String,
    PaidTo:String,
    existingAmount:Number,
    NewAmount:Number,
    SubTotal:Number,
    area: String,
    address: String,
    primaryMobile: String,
    secondaryMobile: String,
    description: String,
    createdBy:String,
    createdOn:{ type: Date, default: Date.now },
    updatedBy: String,
    updatedOn: { type: Date, default: Date.now },
    status:Boolean,
  });

  module.exports = mongoose.model('payments', paymentSchema);