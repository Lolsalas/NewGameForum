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

    const res=await fetch("http://localhost:8081/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({email,password})
    })
    const data=await res.json()
    if(res.ok){
      router.push("/")
    }
    else{
      console.error("Error login",data.error)
    }
  }

    return(
        
        <div>
            <TopBar></TopBar>
            <div className="Layout">
            <SideBar></SideBar>
            <div className="LoginCard">
              <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="LoginInput">
                    <label className="Icon" htmlFor="email">👤</label>
                    <input type="email" name="Email" id="email" placeholder="Email or Phone" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                    <div className="LoginInput">
                    <label className="Icon" htmlFor="pword">🔒</label>
                    <input type="password" name="Password" id="pword" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <button className="LoginButton" type="submit">Login</button>
                </form>
                <Link href='/CreateAccount' className="LoginSignUp">Not a member? Sign Up!</Link>
            </div>
            </div>
        </div>
    )
}

export default Login