'use client'

import React from "react";
import { Box, Drawer, IconButton, List, ListItem, ListItemText, useMediaQuery,Button,ListItemButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import './SideBar.css'

function SideBar(){

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const isDesktop = useMediaQuery("(min-width:900px)");

  const drawerContent=(
    <List>
      <Link href='/'>
      <ListItemButton sx={{mb:5,mt:5}}>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      </Link>
      <ListItemButton sx={{mb:5,mt:5}}><ListItemText primary="Foros" /></ListItemButton>
      <Link href='/CreateForum'>
      <ListItemButton sx={{mb:5,mt:5}}>
        <ListItemText primary="Create a Forum"/>
      </ListItemButton>
      </Link>
    </List>
  )
  return(
    <div className="SideBar">
      {!isDesktop&& (
        <IconButton className="hamburger-button" onClick={toggleDrawer(true)} sx={{
                position: 'fixed',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1000,
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
  )

}

export default SideBar