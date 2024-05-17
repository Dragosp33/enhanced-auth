'use client';

import { UserInfo } from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Metadata } from 'next';
import Link from 'next/link';

const ClientPage = () => {
  const currentUser = useCurrentUser();
  return (
    <div>
      <UserInfo label='Client Session' user={currentUser} />
    </div>
  );
};

export default ClientPage;
