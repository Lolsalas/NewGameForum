export interface PostElements{
    title:string
    author:string,
    date:string,
    text:string,
}

function PostElement({author,date,text,title}:PostElements)
{
    return (
        <div className="PostCard main-post">
            
            {/* Contenedor del Título y el Cuerpo */}
            <div className="PostContent">
                
                {/* 1. Título del Post (Prominente) */}
                <div className="PostTitle">
                    <h1>{title}</h1>
                </div>
                
                {/* 2. Información Meta (Autor y Fecha) */}
                <div className="PostMeta">
                    <span className="PostAuthor">Posted by: {author}</span>
                    <span className="PostDate"> on {date}</span>
                </div>
                
                {/* 3. Cuerpo del Texto */}
                <div className="PostText">
                    <p>{text}</p>
                </div>
            </div>

        </div>
    );
}

export default PostElement