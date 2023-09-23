const mongoose=require('mongoose')
const productsSchema = mongoose.Schema({
    title: String,
    description: String,
    brand: String,
    category:String,
    price:Number
  }, {
    collection: 'products' // Specify the actual collection name
  });
  
  module.exports = mongoose.model('products', productsSchema);
  
