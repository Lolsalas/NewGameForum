'use client'

import Post from "../../../Post/post";
import CreateComment from "@/app/CreateComment/CreateComment";
import { useEffect,useState } from "react";
import { useParams } from "next/navigation";
import './post.css'
import PostElement, { PostElements } from "@/app/Post/PostElement";
import { elements } from "@/app/CreateComment/CreateCommentElements";

function post()
{



    return(
        <div>
            <Post></Post>
            <CreateComment></CreateComment>
        </div>
    )
}

export default post