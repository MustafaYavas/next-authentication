'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import Header from '../header/Header';

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        {children}
      </div>
    </SessionProvider>
  );
};

export default Providers;
