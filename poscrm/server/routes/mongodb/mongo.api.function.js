var ModelMapping = require("./model.mapping");
var appSettings = require("../../../appSettings.config");
var mongoose = require("mongoose");
if(appSettings.mongodb_user !=undefined){
    mongoose.connect(appSettings.mongodb,
        {
            auth:{
                user:appSettings.mongodb_user,
                password:appSettings.mongodb_password
            }
        })
        .then(()=>console.log("Connected to Mongo DB"))
        .catch((err)=>console.log("Connection Failure"+err));
}
else{
    mongoose.connect(appSettings.mongodb)
    .then(()=>console.log("Connected to Mongo DB"))
    .catch((err)=>console.log("Connection Failure"+err));
}

var ApiFunctions={
    GET_CALL:function(req,res,callback){
        var CollectionName= req.params.CollectionName;
        var Mapping = ModelMapping.Mapping(CollectionName);
        var query = Object.assign({},req.query);
        delete query.sortby;
        delete query.orderby;
        delete query.select;
        delete query.top;
        delete query.skip;

        var sortby={};
        var select = {};
        var top =0;
        var skip = 0;

        if(req.query.top !=undefined){
            try{ 
                top= parseInt(req.query.top);
            }
            catch(err){
                top=0;
            }
        }
        if(req.query.skip !=undefined){
            try{
                skip = parseInt(req.query.skip);
            }
            catch(err){
                skip = 0;
            }
        }
        if(req.query.select !=undefined){
            let columns = req.query.select.split(",");
            let select_string="{";
            columns.forEach(function(item){
                select_string += '"'+item+ '":1,';
            });
            if(select_string.length>1){
                select_string= select_string.slice(0,-1);
            }
            select_string +="}";
            select = JSON.parse(select_string.toString());
        }
        if(req.query.sortby !=undefined){
            sortby[req.query.sortby]= req.query.orderby && req.query.orderby.toLowerCase() !="desc"?1:-1;
        }
        if(Mapping !=null){
            Mapping.find(query,select).sort(sortby).skip(skip).limit(top)
            .exec(function(err,result){
                if(err){
                    callback({error:err});
                }
                else {
                    callback(result);
                }
            });
        }
        else{
            callback({error:"Mongo collection is not found / Not Mapped"});
        }

    },
    //Add new collection data to mongodb
    POST_CALL: function (req, res, callback) {
        var CollectionName= req.params.CollectionName;
        var Mapping = ModelMapping.Mapping(CollectionName);
        var MongoObj= req.body;
        var bulkinsert=false;
        if(Object.prototype.toString.call(MongoObj)=="[object Array]"){
            bulkinsert=true;
        }

        if(Mapping!=null){

            if(!bulkinsert){
                var newMongoDoc = new Mapping(MongoObj);
            
                newMongoDoc.save(function (err, result) {
                    if (err){
                        callback({error: err});
                    }
                    else{
                        callback(result);
                    }
                });
            }
            else{
                var total_rec= MongoObj.length;
                var processed_rec=0;
                var error_rec={ records:[], count:0};
                var success_rec={ records:[], count:0};

                MongoObj.forEach(function(record, index)
                {
                    var newMongoDoc = new Mapping(record);
            
                    newMongoDoc.save(function (err, result) {
                        if (err){
                            error_rec.count++;
                            error_rec.records.push(record);
                            processed_rec++;
                        }
                        else{
                            success_rec.count++;
                            success_rec.records.push(result);
                            processed_rec++;
                        }
                    });
                });

                var callbackChecking = setInterval(() => {
                    if(processed_rec==total_rec){
                        clearInterval(callbackChecking);
                        console.log("Processed Bulk Insert For "+CollectionName);
                        callback({Success: success_rec, Error: error_rec});
                    }
                    else{
                        console.log("Still Processing Insert For "+ CollectionName+"..");
                    }
                }, 1000);

            }
            
        }
        else{
            callback({error: 'Mongo Collection Not Found/Not Mapped'});
        }
    },

    //Updates collection data based on query to mongodb
    PUT_CALL: function (req, res, callback) {
        var CollectionName= req.params.CollectionName;
        var Mapping = ModelMapping.Mapping(CollectionName);
        var MongoObj= req.body;

        if(Mapping==null){
            callback({error: 'Mongo Collection Not Found/Not Mapped'});
        } 
        else if(Object.keys(req.query).length<1){
            callback({error: 'Expecting Some query Parameters'});
        }
        else{
            Mapping.findOneAndUpdate(req.query, MongoObj, { new: true }, function (err, result) {
                if (err){
                    callback({error: err});
                }
                else{
                    callback(result);
                }
            });
        }
    },
    //Delete collection data based on query from mongodb
    DELETE_CALL: function (req, res, callback) {
        var CollectionName= req.params.CollectionName;
        var Mapping = ModelMapping.Mapping(CollectionName);

        if(Mapping==null){
            callback({error: 'Mongo Collection Not Found/Not Mapped'});
        } 
        else if(Object.keys(req.query).length<1){
            callback({error: 'Expecting Some query Parameters'});
        }
        else{
            Mapping.remove(req.query, function (err, result) {
                if (err){
                    callback({error: err});
                }
                else{
                    callback(result);
                }
            });
        }
    }
    
}
module.exports = ApiFunctions;