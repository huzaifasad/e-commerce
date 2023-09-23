// const mongoose=require('mongoose')
// const productsSchema = mongoose.Schema({
//     title: String,
//     description: String,
//     brand: String,
//     category:String,
//     price:Number
//   }, {
//     collection: 'products' // Specify the actual collection name
//   });
  
//   module.exports = mongoose.model('products', productsSchema);
  
const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  // Add a reference to the user who added the product
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'signup', // Reference the "signup" collection
  },
}, {
  collection: 'products',
});

module.exports = mongoose.model('products', productsSchema);
