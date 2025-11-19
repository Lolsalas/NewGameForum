'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import CreateCommentElements from "./CreateCommentElements";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Test {
	Comment_Date : string
	Comment_Text : string
	Forum_ID     :number 
	Post_ID      :number 
	Users_ID     :number 
	Comment_ID   :number
}

function CreateComment(){

        const {Forum_ID,Post_ID}=useParams<{Forum_ID:string,Post_ID:string}>()
        const [comments,setComments]=useState<Test[]>([])
        const [loading, setLoading] = useState(true);
        const [showLoginPopup, setShowLoginPopup] = useState(false);
    
        useEffect(() => {
        const fetchPost = async () => {
          console.log("ID recibido desde la URL:", Post_ID); // Depuración
    
          if (!Post_ID) {
            console.error("No se recibió un ID válido");
            setLoading(false);
            return;
          }
    
          try {
            const res = await fetch(`http://localhost:8081/forum/${Forum_ID}/${Post_ID}/comments`);
            const data:Test[]=await res.json();
            console.log("Respuesta del backend:", data); // Depuración
    
            if (res.ok) {
                setComments(data)
            } else {
              console.error("Error del backend:", data);
            }
          } catch (err) {
            console.error("Fetch falló:", err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPost();
      },[Forum_ID, Post_ID]);

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
        <div className="CreateComment">
            <div className="CreateCommentCard">
                {comments.map((post,index)=>(
                    <CreateCommentElements
                    key={index}
                    User={post.Users_ID}
                    Comment_Date={post.Comment_Date}
                    Comment_Text={post.Comment_Text}></CreateCommentElements>
                ))}
            </div>
        </div>
    </div>
      {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
    </>
    )
}

export default CreateComment

