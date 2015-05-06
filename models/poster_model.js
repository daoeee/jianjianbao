var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PosterSchema = new Schema({
    //"海报id" : String
    //, "标题" : String  
  
  
  
  username: {type: String, unique: false},
  //username: String, 
  subject: String,
  "red envelope amount": String,
  "红包金额": String,
  timestamp: { type: Date, default: Date.now },
  body: String,
}, { _id: true });
mongoose.model('Poster', PosterSchema);