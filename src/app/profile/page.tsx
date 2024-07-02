'use client'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Menu, MenuItem, IconButton } from '@mui/material';
import Link from 'next/link';
import Logout from '@/app/logout/page';
import Product from '@/app/productAPI/page';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface BadgeAvatarsProps {
  imageUrl: string;
}

const BadgeAvatars: React.FC<BadgeAvatarsProps> = ({ imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    const storedImageUrl = localStorage.getItem('urlImage');
    if (storedImageUrl) {
      setAvatarUrl(storedImageUrl);
    } else {
      setAvatarUrl(imageUrl); 
    }
  }, [imageUrl]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack direction="row" spacing={2}>
      <IconButton onClick={handleClick} size="small">
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt="User Image" src={avatarUrl || imageUrl} />
        </StyledBadge>
      </IconButton>
      <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  PaperProps={{
    style: {
      width: '180px',
    },
  }}
>

        <Link href="/viewProfile" passHref> 
          <MenuItem onClick={handleClose}>View Profile</MenuItem>
        </Link>
        <Link href="/editProfile" passHref> 
          <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
        </Link>
        <Link href="/productAPI" passHref> 
          <MenuItem onClick={handleClose}>Back to home page</MenuItem>
        </Link>
        <Logout />
      </Menu>
    </Stack>
  );
};

export default BadgeAvatars;
