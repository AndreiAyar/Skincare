const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoutineDetailsSchema = new Schema({
    partOfDay:String,
    products: [{ _id:String }],
});
 

var RoutineDetails = mongoose.model('RoutineDetails', RoutineDetailsSchema);

module.exports = RoutineDetails


