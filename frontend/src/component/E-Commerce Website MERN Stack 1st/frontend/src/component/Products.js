import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom';

export default function Products() {
    const navigate = useNavigate(); 
    const [title,settitle]=useState('')
    const [brand,setbrand]=useState('')
    const [category,setcateg]=useState('')
    const [price,setprice]=useState('')
    const [error,seterror]=useState(false)


    const collectdata=async()=>{
     
    


      if (!title  || !brand || !category || !price) {
        alert('complete the form')
        seterror(true)
        return false;
        
      }
      
  if (isNaN(price)) {
    alert('Price must be a valid number');
    return;
  }else{
    
        let result =await fetch('http://localhost:1000/addproduct',{
            method:'post',
            body:JSON.stringify({ title, brand, category, price }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        
       
        if (result) {
            setbrand('')
            setcateg('')
            // setdesc('')
            setprice('')
            settitle('')
            navigate('/add')
        }
    }
  }
  return (
    <div>
      <h1>We are in product form</h1>

      
      <label>Your Title Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={title} onChange={(e)=>{settitle(e.target.value)}}></input><br></br><br></br>
     {error && !title &&<span>Hello this is titel       </span>}
           <label>Your Brand Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={brand} onChange={(e)=>{setbrand(e.target.value)}}></input><br></br><br></br>
     <label>Your category Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={category} onChange={(e)=>{setcateg(e.target.value)}}></input><br></br><br></br>
      <label>Your price Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={price} onChange={(e)=>{setprice(e.target.value)}}></input><br></br><br></br>
      <button type='submit' onClick={collectdata}>submit</button>
    </div>
  )
}
