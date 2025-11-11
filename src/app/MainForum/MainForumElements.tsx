export interface Threads
    {
        id: number,
        title:string,
        author:string,
        date:string,
        replies:string
    }




function MainForumElements({id,title,author,date,replies}:Threads)
{
    return(
    <div>
    <div className="MainForumTitleRow">
        <h3 className="MainForumTitle">{title}</h3>
    </div>
    <div className="MainForumTitleMeta">
        {author} {date}
    </div>
    <div className="MainForumTitleViews">
        {replies}
    </div>
    </div>
    )
}

export default MainForumElements
