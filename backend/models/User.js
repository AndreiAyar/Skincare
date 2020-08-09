const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: String,
    email: String,
    password: String,
    skintype: String,
    success: Boolean,
    notifications:[ {
        routine_id: String,
        morning_notification: String,
        night_notification: String,
        custom_notification: String

    }],
    date: { type: Date, default: Date.now },
});

var User = mongoose.model('Users', UsersSchema);

module.exports = User