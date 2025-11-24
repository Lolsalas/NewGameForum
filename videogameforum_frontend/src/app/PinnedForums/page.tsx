'use client'

import PinnedForums from "./PinnedForums"
import SideBar from "../SideBar/SideBar"
import TopBar from "../TopBar/TopBar"

function pinnedforums(){
    return(
 <div>
            <TopBar></TopBar>
        <div className="Layout">
            <SideBar></SideBar>
            <div className="RightArea">
                <div className="MainContent">
                <PinnedForums></PinnedForums>
                </div>
            </div>
        </div>
        </div>
    )
}

export default pinnedforums