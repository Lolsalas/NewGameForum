'use client'

import Link from 'next/link'
import TopBar from '../TopBar/TopBar';
import SideBar from '../SideBar/SideBar';

interface elements{
    Title:string
    Id:number
}

function PinnedForumCard({Title,Id}:elements)
{
return (
    <div className='pinned-forum-wrapper'>
        <div className='pinned-forum-layout'>
        </div>
        <Link href={`/MainForum/${Id}`} className="pinned-forum-card-link">
            <div className="-pinned-forum-card">
                <div className="pinned-forum-details">
                    <h3 className="pinned-forum-name">{Title}</h3>
                </div>
            </div>
        </Link>
    </div>
    );
}


export default PinnedForumCard