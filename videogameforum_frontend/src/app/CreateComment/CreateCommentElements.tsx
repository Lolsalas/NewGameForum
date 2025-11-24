import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

export interface elements{
    Comment_Date:string,
    Comment_Text: string,
    User:string
    UserProfilePictureURL: string
}

function CreateCommentElements({Comment_Date,Comment_Text,User,UserProfilePictureURL}:elements){
    const profileImageUrl = `http://localhost:8081${UserProfilePictureURL}`;
    return(
        <div className="CommentCard">
            <div className="CommentMetaPanel">
                <div className="AuthorDisplay">
                    
                    {UserProfilePictureURL && (
                        <img
                            src={profileImageUrl}
                            alt={`Foto de perfil de ${User}`}
                            className="CommentAuthorPicture"
                        />
                    )}
                    
                    <span className="CommentAuthor">{User}</span>
                </div>
                <span className="CommentDate">{Comment_Date}</span>
            </div>
            <div className="CommentBody">
                <p className="CommentText">{Comment_Text}</p>
            </div>
        </div>
    )
}

export default CreateCommentElements