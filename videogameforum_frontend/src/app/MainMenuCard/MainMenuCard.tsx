'use client'

import './MainMenuCard.css'
import Link from 'next/link'

interface elements{
    Title:string
    Id:number
}

function MainMenuCard({Title,Id}:elements)
{
return (
        <Link href={`/MainForum/${Id}`} className="forum-card-link">
            <div className="forum-card">
                <div className="forum-details">
                    <h3 className="forum-name">{Title}</h3>
                </div>
            </div>
        </Link>
    );
}


export default MainMenuCard