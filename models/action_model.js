var mongoose = require('mongoose'),
    materializedPlugin = require('mongoose-materialized'),
    Schema = mongoose.Schema;

var ActionSchema = new Schema({
    "userid" : {type: String, maxlength: 32}, 
    "posterid" : {type: String, maxlength: 32},
    "action" : [{
        "actiontype":{type:String, enum:"visit,forward,comment,propose,commit".split(",")},
        "actionContent":{type:String, maxlength:300},
        "update_timestamp":{type:Date, default:Date.now}
    } ]
}, { _id: true });

ActionSchema.plugin(materializedPlugin);
mongoose.model('Action', ActionSchema);