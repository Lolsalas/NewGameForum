export interface PostElements{
    title:string
    author:string,
    date:string,
    text:string
}

function PostElement({author,date,text,title}:PostElements)
{
    return(
        <div className="PostElement">
            <div className="PostTitle">
                <span>{title}</span>
            </div>
            <div className="PostInfo">
            <span className="PostAuthor">
                {author}
            </span>
            <span className="PostText">
                {text}
            </span>
            <span className="PostDate">
                {date}
            </span>
            </div>
        </div>
    )
}

export default PostElement