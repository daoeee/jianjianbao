var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    email: String,
    wxid: String,
    phone: String,
    hashed_password: String
});
mongoose.model('User', UserSchema);