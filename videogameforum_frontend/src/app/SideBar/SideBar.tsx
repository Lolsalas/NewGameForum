'use client'

import React from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery,Button,ListItemButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import './SideBar.css'
import { useRouter } from "next/navigation";
import { useState } from "react";




function SideBar(){



    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const router = useRouter(); 
    
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleHomeClick = () => {
        setShowLoginPopup(false); 
        router.push('/'); 
    };

    const handleUpdate = () => {
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
        } 
        else {
            router.push('/UpdateProfile');
        } 
    };
        const handleCreate = () => {
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
        } 
        else {
            router.push('/CreateForum');
        } 
    };
        const handlePinned = () => {
        const authToken=localStorage.getItem("authToken")
        if(!authToken){
            console.error("Usuario no encontrado")
            setShowLoginPopup(true)
        } 
        else {
            router.push('/PinnedForums');
        } 
    };

  const isDesktop = useMediaQuery("(min-width:900px)");

  const drawerContent=(
    <List>
      <Link href='/'>
      <ListItemButton sx={{mb:5,mt:5}}>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      </Link>
      <ListItemButton sx={{mb:5,mt:5}}  onClick={handlePinned}><ListItemText primary="Pinned Forums" /></ListItemButton>
      <ListItemButton sx={{mb:5,mt:5}}  onClick={handleCreate}>
        <ListItemText primary="Create a Forum"/>
      </ListItemButton>

      <ListItemButton onClick={handleUpdate}>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
    </List>
  )


      const PopUp=({onClose}:{onClose: ()=>void})=>{
        return(
            <div className="PopUpCard">
                <div className="PopUpInfo">
                    <h2>ALTO!!!</h2>
                    <span>Necesitas iniciar sesion para tener acceso a esta funcion.</span>
                    <div className="PopUpLink">
                        <Link href="/Login">Pulsa aqui para ir a la pantalla de inicio de sesion.</Link>
                    </div>
                    <button onClick={handleHomeClick}>
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
    <div className="SideBar">
      {!isDesktop&& (
        <IconButton className="hamburger-button" onClick={toggleDrawer(true)} sx={{
                position: 'fixed',
                left: 10,
                top: '50%',
                transform: 'translateY(50%)',
                zIndex: 1000,
                backgroundColor:'white',  
                '&:hover': {
                  backgroundColor:'white'
                },
            }}>
          <MenuIcon></MenuIcon>
        </IconButton>
      )}

      {isDesktop ? (
        <Drawer  open classes={{paper:'custom_drawer'}} ModalProps={{hideBackdrop:true}} variant="permanent" className="DrawerDesktop" sx={{'& .MuiDrawer-paper':{backgroundColor: '#525252ff'}}}>
          {drawerContent}
        </Drawer>
      ): (
        <Drawer  open={open} onClose={toggleDrawer(false)} classes={{paper:'custom_drawer'}} ModalProps={{keepMounted:true}} className="DrawerMobile" variant="temporary" sx={{'& .MuiDrawer-paper':{backgroundColor: '#525252ff'}}}>
          {drawerContent}
        </Drawer>
      )}

    </div>
    {showLoginPopup && <PopUp onClose={() => setShowLoginPopup(false)} />}
    </>
  )

}

export default SideBar