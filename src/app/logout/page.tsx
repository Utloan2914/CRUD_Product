'use client'
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';

const Logout= () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('formData'); 
    window.location.href = "/"
  };

  return (
    <ListItem button onClick={handleLogout} sx={{ display: 'flex',width:'90px', mt: 2, color: 'black'}}>
      <ListItemIcon sx={{ minWidth: 35 }}>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  );
};

export default Logout;
