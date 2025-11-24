'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import { ReactFormState } from "react-dom/client";
import Link from "next/link";
import { useRouter } from "next/navigation";




function PostComments()
{

    const [comment,setComments]=useState("")
    const{Post_ID,Forum_ID}=useParams<{Post_ID:string,Forum_ID:string}>();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const router =useRouter()
 

    const handlePost=async(e:React.FormEvent)=>{
        e.preventDefault()
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
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
        const data=await res.json()
        if (res.ok){
            router.push(`/MainForum/${Forum_ID}/${Post_ID}`)
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
       <div className="post-page-wrapper">
            <TopBar></TopBar>
            
            <div className="PostComment Layout"> 
                <SideBar></SideBar>
                
                <div className="PostCommentCard content-card"> 
                    
                    <div className="PostCommentTitle">
                        <h2 className="section-title">Escribe un Comentario</h2>
                    </div>
                    
                    <div className="PostCommentTextBox form-area">
                        <form onSubmit={handlePost} className="comment-form">
                            
                            <textarea 
                                placeholder="Únete a la discusión..." 
                                className="comment-textarea post-textarea"
                                value={comment} 
                                onChange={(e)=>setComments(e.target.value)}
                                required
                            ></textarea>
                            
                            <button type="submit" className="comment-submit-button post-submit-button">
                                Publicar Comentario
                            </button>
                            
                        </form>
                    </div>

                </div>
            </div>
        </div>
        {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
        </>
    )
}

export default PostComments