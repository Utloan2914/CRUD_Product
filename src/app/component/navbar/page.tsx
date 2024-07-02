'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ModeToggle } from '@/components/page';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BadgeAvatars from '@/app/profile/page';
const StyledNavbar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 30px',
  background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(3,169,244,1) 100%)',
  color: 'white',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
});

const StyledNavLinks = styled('div')({
  display: 'flex',
  gap: '20px',
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1rem',
  color: 'white',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const StyledSignInButton = styled(Button)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  textTransform: 'none',
  color: 'white',
  fontSize: '1em',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

const WelcomeText = styled('div')({
  fontSize: '1.2rem',
  fontWeight: 'bold',
});

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const formData = localStorage.getItem('formData');
    if (formData) {
      const parsedData = JSON.parse(formData);
      setUserEmail(parsedData.email);
      setIsLoggedIn(true);
    }

    const storedImageUrl = localStorage.getItem('urlImage');
    if (storedImageUrl) {
      setUserImage(storedImageUrl);
    }
  }, []);

  return (
    <StyledNavbar>
      {userEmail ? (
        <>
          <WelcomeText>Welcome, {userEmail}</WelcomeText>
          {userImage && <BadgeAvatars imageUrl={userImage} />}
        </>
      ) : (
        <StyledNavLinks>
          <Link href="/login" passHref>
            <StyledSignInButton variant="contained" startIcon={<LoginIcon />}>
              Sign in
            </StyledSignInButton>
          </Link>
          <Link href="/register" passHref>
            <StyledButton variant="contained" startIcon={<PersonAddIcon />}>
              Sign up
            </StyledButton>
          </Link>
        </StyledNavLinks>
      )}
      <ModeToggle />
    </StyledNavbar>
  );
};

export default Navbar;
