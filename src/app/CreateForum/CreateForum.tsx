'use client'

import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

function CreateForum()
{
    const [Forum_Name,setForumname]=useState("")
    const navigate=useNavigate()

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();
        const res = await fetch("http://localhost:8081/createforum", {
            method:"POST",
            body:JSON.stringify({Forum_Name}),
            headers:{"Content-Type":"application/json"}
        })

        const data=await res.json()
        if(res.ok){
            navigate(`/MainForum/${data.forum.Forum_ID}`)
        }
        else{
            console.log("Error: ",data.error)
        }
    }


    return(
    <div>
        <TopBar></TopBar>
        <div className="CreateForum">
            <SideBar></SideBar>
            <div className="CreateForumCard">
                <h2>Create a Forum</h2>
                <div className="CreateForumInput">
                    <form onSubmit={handleSubmit}>
                        <label>Write the name of the forum: </label>
                        <input type="text" placeholder="Write Here!" value={Forum_Name} onChange={(e)=>setForumname(e.target.value)}></input>
                        <button className="CreateForumButton" type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CreateForum
    
