var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName: String,
    lsatName: String,
    username: { type: String, require: true, index: { unique: true } },
    password: String,
    email: { type: String, require: true, index: { unique: true } },
    created: { type: Date, default: Date.now }
});
var Users = mongoose.model("Users", userSchema);
module.exports = Users;
