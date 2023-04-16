'use client';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

import Header from '@/components/header/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <SessionProvider>
          <Header />
          <div className="flex flex-col justify-center items-center h-screen">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
