import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import PostElement from "./PostElement";
import { PostElements } from "./PostElement";

interface Props{
    item:PostElements
}


function Post({item}:Props)
{
    return(
    <div>
        <TopBar></TopBar>
        <div className='Post'>
            <SideBar></SideBar>
            <div className="PostCard">
                <PostElement author={item.author} text={item.text} date={item.date} title={item.title}></PostElement>
            </div>
        </div>
    </div>
    )
}

export default Post