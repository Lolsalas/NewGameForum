import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import MainForumElements from "./MainForumElements";
import { Threads } from "./MainForumElements";
import './MainForum.css'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

import '../PopUp/PopUp.css'

interface User{
  Users_id:number;
  Username:string;
}

interface Post {
	Post_Text : string;
	Post_Date : string;
	Post_ID   : number;
	Users_ID  : number; 
	Post_Title : string;
	Forum_ID   : number; 
  User: User;
}

interface ForumType {
	Forum_Name :string;
	Forum_ID    :number;    
	Forum_Posts :Post[]; 

}

function MainForum()
{

const [showLoginPopup, setShowLoginPopup] = useState(false);
const { Forum_ID } = useParams<{ Forum_ID: string }>();
const [Forum, setForum] = useState<ForumType | null>(null);
const [loading, setLoading] = useState(true);
const createPostLink = `/MainForum/${Forum_ID}/CreatePost`;


  useEffect(() => {
    const fetchForum = async () => {
      console.log("ID recibido desde la URL:", Forum_ID);

      if (!Forum_ID) {
        console.error("No se recibió un ID válido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8081/forum/${Forum_ID}`);
        const data = await res.json();
        console.log("Respuesta del backend:", data)

        if (res.ok) {
          if (data.forum) {
            setForum(data.forum);
          } else {
            console.error("El backend no devolvió 'forum'");
          }
        } else {
          console.error("Error del backend:", data.error);
        }
      } catch (err) {
        console.error("Fetch falló:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForum();
  }, [Forum_ID]);
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

    const handlePinForum= async()=>{

        const numericForumID = parseInt(Forum_ID, 10);
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
            return
        } 

        try{
            const response = await fetch(`http://localhost:8081/forum/${Forum_ID}/pincomment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${authToken}`,
                },
                    body: JSON.stringify({
                    userid:"",
                    forumid:numericForumID})
            })
            if(response.ok){
                alert(`Foro pinneado.`)
            }
           else{
                const errorData = await response.json();
                console.error('Error al pinnear:', errorData);
                if (response.status === 409) {
                    alert(`Este foro ya está pinneado.`);
        } 
            else {
                alert(`Error al pinnear el foro: ${errorData.error || response.statusText}`);
            }
    }
        }
        catch (err) {
        console.error("Fetch falló:", err);
      } finally {
        setLoading(false);
      [loading]}

    }

    return(
      <>
        <div>
            <TopBar></TopBar>
            <div className="MainForum">
                <SideBar></SideBar>
                <div className="MainForumCard">
                  <div className="main-actions">
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        href={createPostLink}
                        className="create-post-button"
                    >
                        Create Post
                    </Button>
                     <div className="main-actions">
                    <button 
                        className="PinThreadButton" 
                        onClick={handlePinForum}
                    >
                        📌 Pin
                    </button>
                </div>  
                </div>
                   {Forum?.Forum_Posts && Forum.Forum_Posts.length>0 ? (

                        Forum.Forum_Posts.map((post,index)=>(

                            <MainForumElements

                            key={index}

                            id={post.Forum_ID}

                            author={post.User?.Username?? "Unknown"}

                            date="dasdsa"

                            replies="sdads"

                            title={post.Post_Title}

                            postid={post.Post_ID}>

                            </MainForumElements>

                        ))

                    ):(

                        <p>No posts yet</p>

                    )
                  }
                </div>
            </div>
        </div>
        </>
    )
}

export default MainForum