import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import MainForumElements from "./MainForumElements";
import { Threads } from "./MainForumElements";
import './MainForum.css'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";

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

      const { Forum_ID } = useParams<{ Forum_ID: string }>();
  const [Forum, setForum] = useState<ForumType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForum = async () => {
      console.log("ID recibido desde la URL:", Forum_ID); // Depuración

      if (!Forum_ID) {
        console.error("No se recibió un ID válido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8081/forum/${Forum_ID}`);
        const data = await res.json();
        console.log("Respuesta del backend:", data); // Depuración

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

    return(
        <div>
            <TopBar></TopBar>
            <div className="MainForum">
                <SideBar></SideBar>
                <div className="MainForumCard">
                    {/* {items.map((item,index)=>
                    (
                        <MainForumElements key={index} id={item.id} title={item.title} author={item.author} date={item.date} replies={item.replies}></MainForumElements>
                    ))} */}
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainForum