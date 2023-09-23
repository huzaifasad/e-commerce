import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function SignUp() {
  const navigate = useNavigate(); // Initialize the useNavigate hook
    const [email,setemail]=useState('')
    const [name,setname]=useState('')
    const [password,setpass]=useState('')
    useEffect(()=>{
      const auth=localStorage.getItem('user')
      if (auth) {
        navigate('/')
      }
    })
    const collectdata=async ()=>{
      let result=await fetch('http://localhost:1000/signup',{
        method:'post',
        body:JSON.stringify({email,name,password}),
        headers:{
          'Content-Type':'application/json'
                }

      })
      result=await result.json()
      localStorage.setItem('user',JSON.stringify(result))
      navigate('/')
      
       
    
    }

  return (
    <div>
      <h1>This is Sign Up</h1>
      <label>Your Email Here</label><br></br><br></br>
      <input type='text' placeholder='Your Email Here' required value={email} onChange={(e)=>{setemail(e.target.value)}}></input><br></br><br></br>
      <label>Your Name Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={name} onChange={(e)=>{setname(e.target.value)}}></input><br></br><br></br>
      <label>Your Password Here</label><br></br><br></br>
      <input type='password' placeholder='Your Password Here' required value={password} onChange={(e)=>{setpass(e.target.value)}}></input><br></br><br></br>
      
      <button type='submit' onClick={collectdata}>submit</button>
      <Link to='/login'>Login </Link>
    </div>
  )
}
