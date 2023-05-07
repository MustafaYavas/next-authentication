import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import Providers from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white`}>
        <Providers children={children} />
      </body>
    </html>
  );
}
