import { AccountsSkeleton } from '@/components/accounts/accounts-skeleton';
import AccountsTable from '@/components/accounts/table';
import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounts | Settings',
};

const page = () => {
  return (
    <div className='mx-auto w-full min-w-0'>
      <div className='space-y-2 mb-4'>
        <h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
          {' '}
          Accounts
        </h1>
        <p className='text-lg text-muted-foreground'>
          This is your user accounts page. Here you can view, link and unlink
          multiple accounts, from different providers, even with different
          emails.
        </p>
        <Suspense fallback={<AccountsSkeleton />}>
          <AccountsTable />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
