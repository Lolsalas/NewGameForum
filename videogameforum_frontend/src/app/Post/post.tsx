'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import PostElement from "./PostElement";
import { PostElements } from "./PostElement";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";

interface Props{
    item:PostElements
}

interface User{
  Users_id:number;
  Username:string;
  ProfilePictureURL:string;
  Title:string
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




function Post()
{
    const {Forum_ID,Post_ID}=useParams<{Forum_ID:string,Post_ID:string}>()
    const [Post,setPost]=useState<Post|null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchPost = async () => {
      console.log("ID recibido desde la URL:", Post_ID); 
      if (!Post_ID) {
        console.error("No se recibió un ID válido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8081/forum/${Forum_ID}/${Post_ID}`);
        const data = await res.json();
        console.log("Respuesta del backend:", data); 

        if (res.ok) {
          if (data.post) {
            setPost(data.post);
          } else {
            console.error("El backend no devolvió 'post'");
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

    fetchPost();
  }, [Forum_ID]);



    return(
    <div>
        <div className='Post'>
            <div className="PostCard">
                <PostElement text={Post?.Post_Text ?? "Desconocido"} date={Post?.Post_Date ?? "Desconocido"} title={Post?.Post_Title ?? "Desconocido"} forum_id={Post?.Forum_ID ?? -1} author={Post?.User.Username??"Desconocido"} post_id={Post?.Post_ID?? -1} authorProfilePictureURL={Post?.User.ProfilePictureURL??"Desconocido"} authorTitle={Post?.User.Title??"Desconocido"}></PostElement>
            </div>
        </div>
    </div>
    )
}

export default Post