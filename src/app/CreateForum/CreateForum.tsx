'use client'

import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useRouter } from "next/navigation";

function CreateForum()
{
    const [Forum_Name,setForumname]=useState("")
    const router=useRouter()

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();

        const authToken=localStorage.getItem('authToken')

        if(!authToken)
        {
            console.error('Usuario no encontrado')
            return
        }

        const res = await fetch(`/api/createforum`, {
            method:"POST",
            body:JSON.stringify({Forum_Name}),
            headers:{"Content-Type":"application/json",
                'Authorization':`Bearer ${authToken}`
            },
        })

        const data=await res.json()
        if(res.ok){
            router.push(`/MainForum/${data.forum.Forum_ID}/CreatePost`)
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
    
