const mongoose=require('mongoose')
const productSchema = mongoose.Schema({
    email: String,
    name: String,
    password: String
  }, {
    collection: 'login' // Specify the actual collection name
  });
  
  module.exports = mongoose.model('login', productSchema);