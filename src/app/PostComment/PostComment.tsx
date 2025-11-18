'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { ReactFormState } from "react-dom/client";

function PostComments()
{

    const [comment,setComments]=useState("")
    const{Post_ID,Forum_ID}=useParams<{Post_ID:string,Forum_ID:string}>();

    const handlePost=async(e:React.FormEvent)=>{
        e.preventDefault()
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            return
        }
        const res=await fetch(`http://localhost:8081/forum/${Forum_ID}/${Post_ID}/postcomment`,{
                        method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':`Bearer ${authToken}`
            },
            body:JSON.stringify({
                Forum_ID:Number(Forum_ID),
                Post_ID:Number(Post_ID),
                Comment_Text:comment,
                Comment_Date: '2025-11-17T00:00:00Z',
            })
        })
    }

    return(
        <div>
            <TopBar></TopBar>
            <div className="PostComment">
                <SideBar></SideBar>
                <div className="PostCommentCard">
                    <div className="PostCommentTitle">
                    <h2>Create a Comment</h2>
                    </div>
                    <div className="PostCommentTextBox">
                    <form onSubmit={handlePost}>
                        <textarea placeholder="Write your post here!" value={comment} onChange={(e)=>setComments(e.target.value)}></textarea>
                        <button type="submit">Create Comment</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComments