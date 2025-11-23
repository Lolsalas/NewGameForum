import { Button, Box } from "@mui/material"
import Link from "next/link"

export interface Threads
    {
        id: number,
        title:string,
        author:string,
        date:string,
        replies:string,
        postid:number
    }




// function MainForumElements({id,title,author,date,replies,postid}:Threads)
// {
//     return(
//     <div className="Container">        
//     <div className="MainForumCreatePostButton"> 
//             <Link href={`/MainForum/${id}/CreatePost`}>Create Post</Link>
//     </div>
//     <div className="MainForumElement">
//         <div className="MainForumTitleRow">
//             <Link href={`/MainForum/${id}/${postid}`}>
//                 <h3 className="MainForumTitle">{title}</h3>
//             </Link>
//         </div>
//         <div className="MainForumTitleMeta">
//             <span className="MainForumInfo">{author}</span>
//             <span className="MainForumInfo">{date}</span>
//             <span className="MainForumInfo">{replies}</span>
//         </div>


//     </div>
//     </div>
//     )
// }

// export default MainForumElements

function MainForumElements({ id, title, author, date, replies, postid }: Threads) {
    
    // Asumiendo que 'id' es el ID del foro para el botón "Create Post"
    const forumId = id; 
    const createPostLink = `/MainForum/${forumId}/CreatePost`;
    const threadLink = `/MainForum/${id}/${postid}`;


    // --- Estructura de la Página Completa ---
    return (
        // Contenedor principal para el estilo oscuro
        <div className="forum-container">
            
            {/* 1. Botón de Creación de Post (Se repetirá si se itera sobre este componente) */}
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
            </div>
            
            {/* 2. Encabezados de la Tabla (Se repetirá si se itera sobre este componente) */}
            <div className="forum-header">
                <div className="header-topic">Topic</div>
                <div className="header-author">Author</div>
                <div className="header-replies">Replies</div>
                <div className="header-activity">Activity</div>
            </div>

            {/* 3. Renderizado del Hilo ÚNICO (La Fila de Datos) */}
            <div className="thread-list">
                <div key={id} className="forum-row">
                    
                    {/* Columna TOPIC */}
                    <div className="topic-cell">
                        <Link href={threadLink}>
                            <h3 className="thread-title">{title}</h3>
                        </Link>
                        <div className="sub-info">
                            <span className="discussion-marker"></span> 
                            <span className="category-text">General Discussion</span>
                        </div>
                    </div>

                    {/* Columna AUTHOR */}
                    <div className="author-cell">
                        <Link href={`/user/${author}`} className="author-link">{author}</Link>
                    </div>

                    {/* Columna REPLIES */}
                    <div className="replies-cell">
                        <span className="stat replies">
                            💬 {replies}
                        </span>
                    </div>

                    {/* Columna ACTIVITY (date) */}
                    <div className="activity-cell">{date}</div>
                </div>
            </div>
        </div>
    );
}

export default MainForumElements;