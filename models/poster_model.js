var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PosterSchema = new Schema({
    "id" : {type: String, maxlength: 32}
    , "subject" : {type: String, minlength: 6, maxlength: 30}
    , "body" : {type: String, minlength: 10, maxlength: 300} 
    , "tip" : {
        "method" : {type: String, enum: "现金红包".split(','), default: "现金红包"}, /*default 不起作用*/
        "tip_amount" : Number, /*有精度问题*/
        "pay_id" : {type: [{type: String, maxlength: 32}], default: []},
        "tip_method" : [
            {
              "userid": {type: String, maxlength: 32}
            , "tip_amount": Number
            , "pay_id":{type: [{type: String, maxlength: 32}], default: []}
            }
        ]
    }
    , "create_userid" : {type: String, maxlength: 32}
    , "create_timestamp" : {type: Date, default: Date.now}
    , "close_status" : {type: String, enum: "是,否".split(','), default: "否"}
    , "close_timestamp" : {type: Date, default: null}
    , "update_timestamp" : {type: Date, default: Date.now }
}, { _id: true });
mongoose.model('Poster', PosterSchema);