var Products = require("../../models/products.model");
var User = require("../../models/user.model");
var ApplicationUsers = require("../../models/applicationusers.model");
var Books = require("../../models/Book.model");
var Payments = require("../../models/payments.model");


var ModelMapping = {
    Mapping:function(model){
        console.log(model.toLowerCase());
        switch(model.toLowerCase()){
            case 'products':return Products;
            case 'users': return User;
            case 'applicationusers':return ApplicationUsers;
            case 'books': return Books;
            case 'payments': return Payments;
            default: return null;
        }
    }
}
module.exports = ModelMapping;