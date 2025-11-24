'use client'

import SideBar from "../SideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { useRouter } from "next/navigation";
import Link from "next/link";

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

        const res = await fetch(`http://localhost:8081/createforum`, {
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
    <>
<div className="post-page-wrapper"> 
            <TopBar></TopBar>
            
            <div className="CreateForum Layout"> 
                <SideBar></SideBar>
                
                <div className="CreateForumCard content-card"> 
                    
                    <h2 className="section-title">Crear un Nuevo Foro</h2>
                    
                    <div className="CreateForumFormArea">
                        <form onSubmit={handleSubmit} className="forum-create-form">
                            
                            <label className="form-label" htmlFor="forum-name">Escribe el nombre del foro:</label>
                            
                            <input 
                                type="text" 
                                id="forum-name"
                                placeholder="Nombre del Foro (Ej: Discusión General)" 
                                className="forum-name-input post-input"
                                value={Forum_Name} 
                                onChange={(e)=>setForumname(e.target.value)}
                                required
                            />
                            
                            <button className="CreateForumButton post-submit-button" type="submit">
                                Crear Foro
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CreateForum
    
