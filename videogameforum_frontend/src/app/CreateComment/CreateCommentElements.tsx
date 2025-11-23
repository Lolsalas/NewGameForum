import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

export interface elements{
    Comment_Date:string,
    Comment_Text: string,
    User:number
}

function CreateCommentElements({Comment_Date,Comment_Text,User}:elements){
    return(
        <div className="CommentCard">
            
            {/* Columna 1: Información del Usuario/Metadata */}
            <div className="CommentMetaPanel">
                {/* Opcional: Icono de Avatar o inicial */}
                <span className="CommentAuthor">{User}</span>
                <span className="CommentDate">{Comment_Date}</span>
            </div>
            
            {/* Columna 2: Cuerpo del Comentario */}
            <div className="CommentBody">
                <p className="CommentText">{Comment_Text}</p>
                {/* Opcional: Botones de Responder/Votar */}
            </div>
        </div>
    )
}

export default CreateCommentElements