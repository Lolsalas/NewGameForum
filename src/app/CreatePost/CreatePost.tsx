'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";


function CreatePost()
{
    const{Forum_ID}=useParams()
    const[Post_Title,setTitle]=useState("")
    const[Post_Text,setContent]=useState("")

    const router=useRouter()


    const handlePost=async(e:React.FormEvent)=>{
        e.preventDefault()

        const res=await fetch(`http://localhost:8081/forum/${Forum_ID}/createpost`,{
            method:"POST",
            credentials:'include',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Forum_ID:Forum_ID,
                Post_Title:Post_Title,
                Post_Text:Post_Text,
            })
        })
        const data=await res.json()
        if (res.ok){
            router.push(`/MainForum/${Forum_ID}`)
        }
    }


    return(
    <div>
        <TopBar></TopBar>
        <div className="CreatePost">
            <SideBar></SideBar>
            <div className="CreatePostCard">
                <div className="CreatePostTitle">
                    <h2>Create a Post</h2>
                </div>
            <div className="CreatePostTextBox">
                <form onSubmit={handlePost}>
                    <label>Title of your post: </label>
                    <input type="text" placeholder="Write the title!" value={Post_Title} onChange={(e)=>setTitle(e.target.value)}></input>
                    <textarea placeholder="Write your post here!" value={Post_Text} onChange={(e)=>setContent(e.target.value)}></textarea>
                    <button type="submit">Create Post</button>
                </form>
            </div>

            </div>
        </div>
    </div>
    )
}

export default CreatePost