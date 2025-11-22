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
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    
    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();

        const authToken=localStorage.getItem('authToken')

        if(!authToken)
        {
            console.error('Usuario no encontrado')
            setShowLoginPopup(true)
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

        const PopUp=({onClose}:{onClose: ()=>void})=>{
        return(
            <div className="PopUpCard">
                <div className="PopUpInfo">
                    <h2>ALTO!!!</h2>
                    <span>Necesitas iniciar sesion para tener acceso a esta funcion.</span>
                    <div className="PopUpLink">
                        <Link href="/Login">Pulsa aqui para ir a la pantalla de inicio de sesion.</Link>
                    </div>
                    <button>
                        <Link href='/'>
                            Pulsa aqui para volver al menu principal
                        </Link>
                    </button>
                </div>
            </div>
        )
    }


    return(
    <>
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
    {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
    </>
    )
}

export default CreateForum
    
