const mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var PostsSchema = new Schema({
    title:String,
    tags:[{name:String}],
    entire_post:String,
    src:String,
    inner_src:String,
    shortDesc:String
});

var Post = mongoose.model('Posts', PostsSchema);

module.exports = Post