var mongoose = require('mongoose'),
    //tree = require('mongoose-tree'),
    materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;

var ActionSchema = new Schema({
    "userid" : {type: String, maxlength: 32}, 
    "posterid" : {type: String, maxlength: 32},
    "action" : [{
        "actiontype":{type:String, enum:"visit,comment,propose,commit".split(",")},
        "actionContent":{type:String, maxlength:300},
        "update_timestamp":{type:Date, default:Date.now}
    } ]
}, { _id: true });

//ActionSchema.plugin(tree);
ActionSchema.plugin(materializedPlugin);
mongoose.model('Action', ActionSchema);