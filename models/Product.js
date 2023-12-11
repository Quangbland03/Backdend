var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
var ProductSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'  
     }
});
ProductSchema.plugin(mongoosePaginate);
var ProductModel = mongoose.model('products', ProductSchema);
module.exports =  ProductModel;