const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors package

app.use(express.json());
app.use(cors());
const sign=require('./SignIn')
const products=require('./product')
const JWT=require('jsonwebtoken')
const jwtkey='e-comm'
require('./config')
app.get('',async (req,res)=>{
let data=await SignIn.find({})
res.send(data)
   console.log(data)
})
app.post('/signup',async (req,res)=>{
  let data = new sign(req.body); // Corrected model name
  let result=await data.save();
  result=result.toObject();
  delete result.password
  res.send(result)

})
app.post('/login',async (req,res)=>{
  let data = await sign.findOne(req.body).select('-password');
  if (req.body.password && req.body.email) {
    if (data) {
     
      res.send(data);

    } else {
      res.json({ message: "No Users" })  
    }
  }
  else{
    res.send('Please give email and password')
  }
 
})
app.post('/addproduct',async(req,res)=>{
  let data=await new products(req.body)
  let result=await data.save();
  result=result.toObject();
  res.send(result)

})


app.get('/lists',async (req,res)=>{

  let data=await products.find()
  console.log(data)

  res.send(data)
})
app.delete('/delete/:id',async (req,res)=>{
  let data=await products.deleteOne({_id:req.params.id})
  res.send(data)
})

app.get('/update/:id',async (req,res)=>{
  let data=await products.findOne({_id:req.params.id})
  if (data) {
    res.send(data)
  }else{
    res.send('No Data')
  }
})
app.put('/update/:id',async (req,res)=>{
  let data=await products.updateOne(
    {_id:req.params.id},
    {
      $set:req.body
    }
  )
  res.send(data)
  console.log(data)
  
})
app.get('/serach/:key',async (req,res)=>{
  let data=await products.find({
    "$or":[
      {title:{$regex:req.params.key}},
      {brand:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
      // {price:{$regex:req.params.key}}
    // ]
    ]
  })
  res.send(data)
})
app.listen(1000)