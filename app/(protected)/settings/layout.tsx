import SettingsTabs from '@/components/accounts/settings-tabs';
import SettingsAside from '@/components/auth/settings-aside';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User info',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
      <SettingsAside />

      <main className='flex-1'>
        <SettingsTabs />
        {children}
      </main>
    </div>
  );
}
