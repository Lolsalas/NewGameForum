import { Button, Box } from "@mui/material"
import Link from "next/link"
import { useState } from "react";

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
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [loading, setLoading] = useState(true);

    const handlePinForum= async()=>{

         const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
            return
        } 

        try{
            const response = await fetch(`http://localhost:8081/forum/${forumId}/pincomment`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${authToken}`,
                },
                    body: JSON.stringify({
                    userid:"",
                    forumid:id})
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


    // --- Estructura de la Página Completa ---
return (
        <>
            {/* Contenedor principal para el estilo oscuro */}
            <div className="forum-container">
                
                {/* 1. Botones de Acción (ESTA SECCIÓN SE MUESTRA SIEMPRE) */}
                <div className="main-actions">
                    {/* <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        href={createPostLink}
                        className="create-post-button"
                    >
                        Create Post
                    </Button> */}
                    <button 
                        className="PinThreadButton" 
                        onClick={handlePinForum}
                    >
                        📌 Pin
                    </button>
                </div>
                
                
                {/* 2. Encabezados de la Tabla (ESTA SECCIÓN SE MUESTRA SIEMPRE) */}
                <div className="forum-header">
                    <div className="header-topic">Topic</div>
                    <div className="header-author">Author</div>
                    <div className="header-replies">Replies</div>
                    <div className="header-activity">Activity</div>
                </div>

                {/* 3. Renderizado del Hilo (Solo si la prop 'title' existe) */}
                <div className="thread-list">
                    {/* Renderiza la fila SOLO si hay datos, si no, se muestra la lista vacía */}
                    {title && ( 
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
                                <span className="stat replies">💬 {replies}</span>
                            </div>

                            {/* Columna ACTIVITY (date) */}
                            <div className="activity-cell">{date}</div>
                        </div>
                    )}

                    {/* MENSAJE DE LISTA VACÍA (Si no hay título) */}
                    {!title && (
                         <div className="no-threads-message" style={{ padding: '20px', textAlign: 'center' }}>
                            ¡Aún no hay hilos en este foro! Sé el primero en crear uno.
                         </div>
                    )}
                </div>
            </div>
            {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
        </>
    );
}

export default MainForumElements;