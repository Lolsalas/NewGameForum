'use client'

import Link from "next/link";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import './Login.css'

import  { useEffect, useState } from "react";
import { useRouter } from "next/navigation";



function Login(){

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const router=useRouter()

  const handleLogin=async(e:React.FormEvent)=>{
    e.preventDefault()

    const res=await fetch(`http://localhost:8081/login`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    })
    const data=await res.json()
    console.log("Token recibido:", data.token);

    if(res.ok){
      if(data.token){
      localStorage.setItem('authToken',data.token)
      router.push("/ ")
    }
    else{
      console.error('No se devolvio el token')
    }
    }
    else{
      console.error("Error login",data.error)
    }
  }

    return(
        
       <div className="login-page-wrapper"> 
        <TopBar></TopBar>
        
 
        <div className="LoginCard">
          <SideBar></SideBar>
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="login-title">Login</h2> 
                
                <div className="LoginInput form-group">
                    <label className="Icon" htmlFor="email">👤</label>
                    <input type="email" name="Email" id="email" placeholder="Email or Phone" required onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                
                <div className="LoginInput form-group">
                    <label className="Icon" htmlFor="pword">🔒</label>
                    <input type="password" name="Password" id="pword" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                
                <button className="LoginButton" type="submit">Login</button>
            </form>
            <Link href='/CreateAccount' className="LoginSignUp register-link">Not a member? Sign Up!</Link>
        </div>
    </div>
    )
}

export default Login