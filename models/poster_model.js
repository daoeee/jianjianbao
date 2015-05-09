var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PosterSchema = new Schema({
    "海报id" : {type: String, maxlength: 32}
    , "标题" : {type: String, minlength: 6, maxlength: 30}
    , "正文" : {type: String, minlength: 10, maxlength: 300} 
    , "酬谢" : {
        "方式" : {type: String, enum: "现金红包".split(','), default: "现金红包"}, /*default 不起作用*/
        "红包金额" : Number, /*有精度问题*/
        "保证帐户收款流水号" : {type: [{type: String, maxlength: 32}], default: []},
        "红包分配方案" : [
            {
              "用户代码": {type: String, maxlength: 32}
            , "分配金额": Number
            , "支付流水号":{type: [{type: String, maxlength: 32}], default: []}
            }
        ]
    }
    , "提交用户代码" : {type: String, maxlength: 32}
    , "提交时间戳" : {type: Date, default: Date.now}
    , "关闭状态" : {type: String, enum: "是,否".split(','), default: "否"}
    , "关闭时间戳" : {type: Date, default: null}
    , "最后更新时间戳" : {type: Date, default: Date.now }
}, { _id: true });
mongoose.model('Poster', PosterSchema);