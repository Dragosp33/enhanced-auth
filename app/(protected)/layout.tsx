import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import Navbar from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | DPC Auth',
    default: 'Authenticated',
  },
  description: 'DPC Auth dashboard.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  generator: 'Next.js',
  applicationName: 'DPC Auth',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Next.js',
    'React',
    'JavaScript',
    'auth.js',
    'mongodb',
    'next-auth',
    'DPC',
    'Dashboard',
  ],
  authors: [{ name: 'Dragos Polifronie', url: 'https://github.com/Dragosp33' }],
  creator: 'Dragos Polifronie',
  publisher: 'Dragos Polifronie',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className='relative flex min-h-screen flex-col bg-background'>
        <Navbar />
        <main className='flex-1'>
          <div className='border-b relative py-6 lg:py-8 md:mx-6'>
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
