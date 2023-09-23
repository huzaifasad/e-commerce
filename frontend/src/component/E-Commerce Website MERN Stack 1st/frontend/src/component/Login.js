import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



export default function Login() {
    const navigate = useNavigate(); 
    const [email,setemail]=useState('')
    const [password,setpass]=useState('')
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if (auth) {
          navigate('/')
        }
      })
    const collectdata=async()=>{
        console.log(`\nEmail:${email} \nPassword:${password}`)
        let result=await fetch('http://localhost:1000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await result.json()
        if (result.name) {
            localStorage.setItem('user',JSON.stringify(result))
            navigate('/')
        }else{
            alert('Incorect user name and password')
        }
        
        
    }
  return (
    
    <div>
      <h1>Login Form</h1>
      <label>Your Name Here</label><br></br><br></br>
      <input type='text' placeholder='Your Name Here' required value={email} onChange={(e)=>{setemail(e.target.value)}}></input><br></br><br></br>
      <label>Your Password Here</label><br></br><br></br>
      <input type='password' placeholder='Your Password Here' required value={password} onChange={(e)=>{setpass(e.target.value)}}></input><br></br><br></br>
      <button type='submit' onClick={collectdata}>submit</button>
     <Link to='/sign'>Create Account</Link>
    </div>
  )
}
