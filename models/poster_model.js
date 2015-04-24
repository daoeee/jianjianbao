var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PosterSchema = new Schema({
  username: {type: String, unique: true},
  subject: String,
  timestamp: { type: Date, default: Date.now },
  body: String,
}, { _id: true });
mongoose.model('Poster', PosterSchema);