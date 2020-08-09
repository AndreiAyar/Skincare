const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    name: String,
    type: String,
    title: String,
    description: String,
    src: String,
    refferal: String,
    date: { type: Date, default: Date.now },
});

var Product = mongoose.model('Product', ProductsSchema);

module.exports = Product

