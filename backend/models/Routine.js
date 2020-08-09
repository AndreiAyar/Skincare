const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var RoutinesSchema = new Schema({
    name:String,
    RoutineDetails:[{_id:String}],
    notification_hours:String,
    src:String
});

var Routine = mongoose.model('Routines', RoutinesSchema);

module.exports = Routine