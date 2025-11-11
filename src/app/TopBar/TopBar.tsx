'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import './TopBar.css'

function TopBar(){
    return(
        <div className='TopBar'>
            <div className="TopImage">
            <Image width='150' height='150' src='/unnamed.png' alt="Logo"></Image>
            </div>
            <div className="TopSearchBar">
                <form action="">
                    <input type="text"/>
                </form>
            </div>
            <div className="TopLink">
                <Link href='/CreatePost'>Log In</Link>
            </div>
        </div>
    )
}

export default TopBar