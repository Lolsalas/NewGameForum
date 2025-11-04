'use client'

import React from "react";
import { Drawer, Button, ListItemButton, ListItemText } from "@mui/material";
import {List} from "@mui/material";
import {ListItem} from "@mui/material";
import Link from "next/link";

function SideBar(){

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

}