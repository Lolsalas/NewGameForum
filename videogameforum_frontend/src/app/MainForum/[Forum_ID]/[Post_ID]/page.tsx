'use client'

import Post from "../../../Post/post";
import CreateComment from "@/app/CreateComment/CreateComment";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import './post.css'
import './PostContainer.css'
import '../../../CreateComment/CreateComment.css'
import PostElement, { PostElements } from "@/app/Post/PostElement";
import { elements } from "@/app/CreateComment/CreateCommentElements";
import TopBar from "@/app/TopBar/TopBar";
import SideBar from "@/app/SideBar/SideBar";

function post()
{



    return(
        <div className="PostWrapper">
            <TopBar></TopBar>
        <div className="PostContainer">
            <SideBar></SideBar>
            <div className="PostContainerCard">
                <Post></Post>
                <div className="PostContainerTitle">
                    <h2>Comments</h2>
                </div>
                <CreateComment></CreateComment>
            </div>
        </div>
        </div>
    )
}

export default post