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




function MainForumElements({id,title,author,date,replies,postid}:Threads)
{
    return(
    <div className="MainForumElement">
    <div className="MainForumTitleRow">
        <Link href={`/MainForum/${id}/${postid}`}>
        <h3 className="MainForumTitle">{title}</h3>
        </Link>
    </div>
    <div className="MainForumTitleMeta">
        <span className="MainForumInfo">{author}</span>
        <span className="MainForumInfo">{date}</span>
        <span className="MainForumInfo">{replies}</span>
    </div>
    </div>
    )
}

export default MainForumElements
