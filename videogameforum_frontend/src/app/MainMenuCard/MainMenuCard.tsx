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
        <div className="MainMenuCard">
            <div className="ForumTitle">
                <h3>
                    <Link href={`/MainForum/${Id}`}>{Title}</Link>
                </h3>
            </div>
        </div>
    )
}

export default MainMenuCard