'use client';
import React, { Suspense, ReactNode, useState } from 'react';
import Navbar from '../navbar/page';
import Footer from '../footer/page';
import ErrorPage from '../../error/page';
import Product from '../../productAPI/page';
import Login from '../../login/page';
import Register from '../../register/page';
import ViewProfile from '@/app/profile/viewProfile/page';
import EditProfile from '@/app/profile/editProfile/page';
import { usePathname } from 'next/navigation';
import { FormData } from '../formData/page';
interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
    address: '',
    subscribe: false,
    urlImage: null
  });

  const isAuthenticated = true;

  const handleUpdateProfile = (updatedData: FormData) => {
    setFormData(updatedData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
          <main className="flex flex-col items-center justify-center">
            {pathname === '/viewProfile' && isAuthenticated && <ViewProfile formData={formData} />}
            {pathname === '/editProfile' && isAuthenticated && <EditProfile formDataProp={formData} onUpdateProfile={handleUpdateProfile} />}
            {pathname === '/productAPI' && <Product />}
            {pathname === '/login' && <Login />}
            {pathname === '/register' && <Register />}
            {pathname === '/' && <div className="w-full h-full">{children}</div>}
            {!['/', '/viewProfile', '/editProfile', '/productAPI', '/login', '/register'].includes(pathname) && <ErrorPage />}
          </main>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


