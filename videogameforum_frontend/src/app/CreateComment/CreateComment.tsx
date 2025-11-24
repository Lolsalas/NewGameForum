'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import CreateCommentElements from "./CreateCommentElements";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface User{
  Users_id:number;
  Username:string;
  ProfilePictureURL:string;
}

interface Test {
	Comment_Date : string
	Comment_Text : string
	Forum_ID     :number 
	Post_ID      :number 
	Users_ID     :string 
	Comment_ID   :number
  Username:string
  User: User;
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



    return(
    <>
    <div>
        <div className="CreateComment">
            <div className="CreateCommentCard">
                {comments.map((post,index)=>(
                    <CreateCommentElements
                    key={index}
                    User={post.Username}
                    Comment_Date={post.Comment_Date}
                    Comment_Text={post.Comment_Text}
                    UserProfilePictureURL={post.User.ProfilePictureURL}></CreateCommentElements>
                ))}
            </div>
        </div>
    </div>
    </>
    )
}

export default CreateComment

