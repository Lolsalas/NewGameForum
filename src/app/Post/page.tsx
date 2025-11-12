import Post from "./post";
import './post.css'

const elements={
    title:'TestTitle',
    author:'TestAuthor',
    date:'TestDate',
    text:'TestText',

}

function post()
{
    return(
        <Post item={elements}></Post>
    )
}

export default post