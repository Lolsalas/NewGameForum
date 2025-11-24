'use client'

import MainMenuCard from "../MainMenuCard/MainMenuCard";
import { useEffect,useState } from "react";
import './MainMenu.css'
import '../PopUp/PopUp.css'

interface Forums{
    Forum_Name:  string
	  Forum_ID :   number    
}

function MainMenu()
{
  const [Forum, setForum] = useState<Forums[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForum = async () => {


      try {
        const res = await fetch(`http://localhost:8081/forum`);
        const data:Forums[]=await res.json();
        console.log("Respuesta del backend:", data);

            if (res.ok) {
                setForum(data)
            } else {
              console.error("Error del backend:", data);
            }
      } catch (err) {
        console.error("Fetch falló:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchForum();
  },[]);


    return(
        <div className='MainMenu'>
          <h2 className="MainMenu-Title">Foros disponibles</h2>
            {Forum.map((forum,index)=>(
                <MainMenuCard key={index} Id={forum.Forum_ID} Title={forum.Forum_Name}></MainMenuCard>
            ))}
        </div>
    )
}

export default MainMenu