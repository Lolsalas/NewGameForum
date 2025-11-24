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

  useEffect(()=>{
    const fetchPinned = async ()=>{
      const authToken=localStorage.getItem("authToken")
      
      if(!authToken){
        console.error("Usuario no encontrado")
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
  
  return(
    <>
    <div className="PinnedForums">
      {pinnedForum.map((forum,index)=>(
        <PinnedForumCard
        key={index} Title={forum.Forum_Name} Id={forum.Forum_ID}></PinnedForumCard>
      ))}
    </div>
    </>
  )
}

export default PinnedForums