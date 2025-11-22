'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useState } from "react";


function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    try {
      const res = await fetch("http://localhost:8081/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Username: username, Password: password }),
      });

      if (res.ok) {
        router.push("/"); // redirige al root
      } else {
        console.error("Error creando cuenta");
      }
    } catch (err) {
      console.error(err);
    }
  };

    return(
        <div>
            <TopBar></TopBar>
            <div className="CreateAccount">
                <SideBar></SideBar>
                <div className="CreateAccountCard">
                    <form onSubmit={handleSubmit}>
                    <h2>Create your account</h2>
                    <label htmlFor="email">Email</label>
                    <div className="CreateAccountInput">
                        <input type="email" name="Email" id="email" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <label htmlFor="uname">Username</label>
                    <input type="text" name="Username" id="uname" onChange={e=>setUsername(e.target.value)}/>
                    <label htmlFor="pword">Password</label>
                    <input type="password" name="Password" id="pword" onChange={e=>setPassword(e.target.value)}></input>
                    {/* <label htmlFor="">Confirm Password</label>
                    <input type='password'></input> */}
                    <button className="CreateAccountButton">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount