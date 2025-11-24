'use client'

import Link from "next/link";

export interface PostElements{
    title:string
    post_id:number,
    date:string,
    text:string,
    forum_id:number,
    author:string
    authorProfilePictureURL:string
    authorTitle:string

}

function PostElement({author,date,text,title,forum_id,post_id,authorProfilePictureURL, authorTitle}:PostElements)
{

    const profileImageUrl = `http://localhost:8081${authorProfilePictureURL}`;

    return (

        
        <div className="PostCard main-post">
            
            <div className="PostContent">
                
                <div className="PostTitle">
                    <h1>{title}</h1>
                </div>
                
                <div className="PostMeta">
                    <div className="AuthorInfo">
                        
                        {authorProfilePictureURL && (
                            <img
                                src={profileImageUrl}
                                alt={`Foto de perfil de ${author}`}
                                className="ProfilePictureSmall"
                            />
                        )}

                        <span className="PostAuthor">Posted by: **{author} {authorTitle}**</span>
                    </div>
                </div>
                
                <div className="PostText">
                    <p>{text}</p>
                </div>
                <div className="PostActions">

                    <Link href={`/MainForum/${forum_id}/${post_id}/PostComment`}>
                    <button className="CommentButton">
                        Comment
                    </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default PostElement