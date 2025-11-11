import MainForum from "./MainForum";

const myItems =
[


    {
        id:1,
        title:'TitlePlaceholder',
        author:'AuthorPlaceholder',
        date:'DatePlaceholder',
        replies:'RepliesPlaceholder'
    },

    {
        id:2,
        title:'TitlePlaceholder',
        author:'AuthorPlaceholder',
        date:'DatePlaceholder',
        replies:'RepliesPlaceholder'
    }


]
function mainforum()
{
    return(
    <MainForum items={myItems}/>
    )
}

export default mainforum