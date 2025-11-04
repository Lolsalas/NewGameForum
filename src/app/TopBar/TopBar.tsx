import React from "react";
import Image from "next/image";
import Link from "next/link";

function TopBar(){
    return(
        <div id='TopBar'>
            <Image width='200' height='200' src='/unnamed.png' alt="Logo"></Image>
            <button>Login</button>
            <Link href=''>Log In</Link>
        </div>
    )
}

export default TopBar