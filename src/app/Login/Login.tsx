'use client'

import Link from "next/link";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import './Login.css'

import  { useEffect, useState } from "react";



function Login(){
    const fetchUsers = async () => {
  const res = await fetch("http://localhost:8081/getusers", {
    method: "GET",
  });

  const data = await res.json();
  console.log("Usuarios recibidos:", data);

};

  useEffect(() => {
    fetchUsers();
  }, []);

    return(
        
        <div>
            <TopBar></TopBar>
            <div className="Layout">
            <SideBar></SideBar>
            <div className="LoginCard">
              <form action="http://localhost:8081/login" method="POST">
                <h2>Login</h2>
                <div className="LoginInput">
                    <label className="Icon" htmlFor="email">👤</label>
                    <input type="email" name="Email" id="email" placeholder="Email or Phone"/>
                </div>
                    <div className="LoginInput">
                    <label className="Icon" htmlFor="pword">🔒</label>
                    <input type="password" name="Password" id="pword" placeholder="Password"/>
                </div>
                <button className="LoginButton">Login</button>
                </form>
                <Link href='/CreateAccount' className="LoginSignUp">Not a member? Sign Up!</Link>
            </div>
            </div>
        </div>
    )
}

export default Login