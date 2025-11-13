import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import MainForumElements from "./MainForumElements";
import { Threads } from "./MainForumElements";
import './MainForum.css'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";



interface Post {
  ID: number;
  Title: string;
  Content: string;
  UserID: number;
  CreatedAt: string;
  RepliesCount?: number;
}

interface ForumType {
  forum_id: number;
  Forum_Name: string;
  Posts: Post[];  // aquí especificamos que Posts es un arreglo de Post
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
        const res = await fetch(`http://localhost:8081/MainForum/${Forum_ID}`);
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
                    {Forum?.Posts && Forum.Posts.length>0 ? (
                        Forum?.Posts?.map((post,index)=>(
                            <MainForumElements
                            key={index}
                            id={post.ID}
                            author={post.UserID.toString()}
                            date="dasdsa"
                            replies="sdads"
                            title={post.Title}>

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