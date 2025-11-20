'use client'

import './MainMenuCard.css'

interface elements{
    Title:string
}

function MainMenuCard({Title}:elements)
{
    return (
        <div className="MainMenuCard">
            <div className="ForumTitle">
                <h3>{Title}</h3>
            </div>
        </div>
    )
}

export default MainMenuCard