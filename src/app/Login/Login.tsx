import Link from "next/link";
import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import './Login.css'

function Login(){
    return(
        
        <div>
            <TopBar></TopBar>
            <div className="Layout">
            <SideBar></SideBar>
            <div className="LoginCard">
                <h2>Login</h2>
                <div className="LoginInput">
                    <span className="Icon">👤</span>
                    <input type="text" name="" id="" placeholder="Email or Phone"/>
                </div>
                    <div className="LoginInput">
                    <span className="Icon">🔒</span>
                    <input type="password" name="" id="" placeholder="Password"/>
                </div>
                <button className="LoginButton">Login</button>
                <Link href='' className="LoginSignUp">Not a member? Sign Up!</Link>
            </div>
            </div>
        </div>
    )
}

export default Login