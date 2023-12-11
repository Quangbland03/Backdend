var mongoose = require('mongoose');
var CategorySchema = mongoose.Schema({
    name:String
});
var CategoryModel = mongoose.model('categories', CategorySchema);
module.exports =  CategoryModel;