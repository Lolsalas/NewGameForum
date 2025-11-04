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
      <ListItemButton><ListItemText primary="Inicio" /></ListItemButton>
      <ListItemButton><ListItemText primary="Foros" /></ListItemButton>
      <ListItemButton><ListItemText primary="Mi Perfil" /></ListItemButton>
    </List>
  )
  return(
    <div className="SideBar">
      {!isDesktop&& (
        <IconButton className="hamburger-button" onClick={toggleDrawer(true)}>
          <MenuIcon></MenuIcon>
        </IconButton>
      )}

      {isDesktop ? (
        <Drawer  open classes={{paper:'custom_drawer'}} ModalProps={{hideBackdrop:true}} variant="permanent" className="DrawerDesktop" sx={{'& .MuiDrawer-paper':{backgroundColor: '#525252ff'}}}>
          {drawerContent}
        </Drawer>
      ): (
        <Drawer  open={open} onClose={toggleDrawer(false)} classes={{paper:'custom_drawer'}} ModalProps={{keepMounted:true}} variant="temporary" sx={{'& .MuiDrawer-paper':{backgroundColor: '#525252ff'}}}>
          {drawerContent}
        </Drawer>
      )}

    </div>
  )

}

export default SideBar