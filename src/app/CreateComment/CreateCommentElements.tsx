import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";

export interface elements{
    Comment_Date:string,
    Comment_Text: string,
    User:number
}

function CreateCommentElements({Comment_Date,Comment_Text,User}:elements){
    return(
    <div className="CreateCommentElements">
        <div className="CreateCommentUserRow">
            <span>{User}</span>
        </div>
        <div className="CreateCommentTextRow">
            <span>{Comment_Text}</span>
            <span>{Comment_Date}</span>
        </div>
    </div>
    )
}

export default CreateCommentElements