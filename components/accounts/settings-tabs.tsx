'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SettingsTabs = () => {
  const path = usePathname();
  return (
    <Tabs
      defaultValue={path === '/settings' ? 'userinfo' : 'accounts'}
      className='md:hidden space-y-2 mb-2 ml-0'
    >
      <TabsList>
        <TabsTrigger value='userinfo'>
          <Link href='/settings'>User Info </Link>
        </TabsTrigger>
        <TabsTrigger value='accounts'>
          <Link href='/settings/accounts'>Accounts </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SettingsTabs;
