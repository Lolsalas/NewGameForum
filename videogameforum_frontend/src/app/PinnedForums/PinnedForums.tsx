'use client'

import PinnedForumCard from "./PinnedForumsElements"
import { useEffect,useState } from "react"
import Link from "next/link"
import'./PinnedForums.css'

interface Forums{
  Forum_Name:  string
	Forum_ID :   number    
}

function PinnedForums(){

  const[pinnedForum,setPinnedForum]=useState<Forums[]>([])
  const[loading,setLoading]=useState(true)
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(()=>{
    const fetchPinned = async ()=>{
      const authToken=localStorage.getItem("authToken")
      
      if(!authToken){
        console.error("Usuario no encontrado")
        setShowLoginPopup(true)
        return
      }
      try{
        const res= await fetch(`http://localhost:8081/forum/pinnedcomments`,{headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${authToken}`
        }})
        const data:Forums[]=await res.json()
        console.log("Respuesta del backend:", data); 

        if (res.ok){
          setPinnedForum(data)
        }
        else{
          console.error('Error del backend: ', data)
        }
      } catch(err){
        console.error('Fetch fallo: ',err)
      }finally{
        setLoading(false)
      }
    }
    fetchPinned()
  },[loading])
  
      const PopUp=({onClose}:{onClose: ()=>void})=>{
        return(
            <div className="PopUpCard">
                <div className="PopUpInfo">
                    <h2>ALTO!!!</h2>
                    <span>Necesitas iniciar sesion para tener acceso a esta funcion.</span>
                    <div className="PopUpLink">
                        <Link href="/Login">Pulsa aqui para ir a la pantalla de inicio de sesion.</Link>
                    </div>
                    <button>
                        <Link href='/'>
                            Pulsa aqui para volver al menu principal
                        </Link>
                    </button>
                </div>
            </div>
        )
    }

  return(
    <>
    <div className="PinnedForums">
      {pinnedForum.map((forum,index)=>(
        <PinnedForumCard
        key={index} Title={forum.Forum_Name} Id={forum.Forum_ID}></PinnedForumCard>
      ))}
    </div>
    {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
    </>
  )
}

export default PinnedForums