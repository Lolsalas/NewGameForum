'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import './TopBar.css'

function TopBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("authToken"); 
        
        setIsLoggedIn(!!token); 

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        
        setIsLoggedIn(false); 
        
        router.push('/');
        router.refresh(); 
    };

    const AuthLink = isLoggedIn ? (
        <button 
            onClick={handleLogout} 
            className="TopLinkButton" 
        >
            Cerrar Sesión
        </button>
    ) : (
        <Link href='/Login'>Log In</Link>
    );
    return(
        <div className='TopBar'>
            <div className="TopImage">
            <Image width='150' height='150' src='/unnamed.png' alt="Logo"></Image>
            </div>
            <div className="TopLink">
                {AuthLink}
            </div>
        </div>
    )
}

export default TopBar