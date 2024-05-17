import { User } from 'next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from './ui/badge';

interface Props {
  user?: { isTwoFactorEnabled?: boolean; isOAuth?: boolean } & User;
  label: string;
}

export const UserInfo = ({ user, label }: Props) => {
  console.log({ user });
  return (
    <Card className='max-w-[600px] mx-auto'>
      <CardHeader>
        <p className='text-2xl text-center font-semibold'>{label}</p>
        <CardContent className='space-y-4'>
          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p className='text-sm font-medium'> ID</p>
            <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
              {user?.id}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p className='text-sm font-medium'> Name</p>
            <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
              {user?.name}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p className='text-sm font-medium'> Email </p>
            <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
              {user?.email}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p className='text-sm font-medium'> Role </p>
            <p className='truncate text-xs max-w-[150px] font-mono p-1 bg-slate-100 rounded-md dark:bg-slate-800'>
              {user?.role}
            </p>
          </div>
          {!user?.isOAuth && (
            <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
              <p className='text-sm font-medium'> 2FA </p>

              <Badge
                variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
              >
                {' '}
                {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
              </Badge>
            </div>
          )}

          <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p className='text-sm font-medium'> OAuth </p>

            <Badge variant={user?.isOAuth ? 'success' : 'destructive'}>
              {' '}
              {user?.isOAuth ? 'Yes' : 'No'}
            </Badge>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
