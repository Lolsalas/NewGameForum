import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import MainForumElements from "./MainForumElements";
import { Threads } from "./MainForumElements";
import './MainForum.css'
import { Key } from "@mui/icons-material";

interface Props{
    items:Threads[]
}

function MainForum({items}:Props)
{
    return(
        <div>
            <TopBar></TopBar>
            <div className="MainForum">
                <SideBar></SideBar>
                <div className="MainForumCard">
                    {items.map((item,index)=>
                    (
                        <MainForumElements key={index} id={item.id} title={item.title} author={item.author} date={item.date} replies={item.replies}></MainForumElements>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainForum