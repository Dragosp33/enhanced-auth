import { getUserAccounts } from '@/data/User';
import { user } from '@/lib/auth';
import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaPlusCircle, FaUnlink } from 'react-icons/fa';
import { PlusIcon } from '@radix-ui/react-icons';
import UnlinkButton from './unlink-acc-button';

export default async function AccountsTable() {
  const currentUser = await user();
  const accounts = await getUserAccounts(currentUser?.id);
  return (
    <div className='pt-4'>
      <Card>
        <CardHeader>
          <CardTitle className='flex flex-row justify-between'>
            <p> Linked accounts </p>
            <LoginButton mode='modal' asChild>
              <Button size={'icon'} variant={'link'}>
                {' '}
                <FaPlusCircle />{' '}
              </Button>
            </LoginButton>
          </CardTitle>
          <CardDescription>
            You have {accounts?.length} linked accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {accounts?.map((acc, index) => (
              <Card
                key={index}
                //className='mb-4 grid grid-cols-[25px_1fr] items-start pb-4'
                className='mb-4 pt-2'
              >
                <CardContent className='px-1 md:p-6 md:pt-0 flex flex-row items-start'>
                  {acc.provider === 'google' && (
                    <FcGoogle className='flex h-5 w-5 translate-y-1 rounded-full mr-3' />
                  )}
                  {acc.provider === 'github' && (
                    <FaGithub className='flex h-5 w-5 translate-y-1 rounded-full mr-3' />
                  )}
                  <div className='space-y-1 flex flex-row justiy-between w-full'>
                    <div className='flex-1'>
                      <p className='text-sm font-medium leading-none'>
                        {acc.email}
                      </p>
                      <p className='text-sm text-muted-foreground space-y-1'>
                        {acc.provider}
                      </p>
                    </div>
                    <div className='flex-0'>
                      <UnlinkButton
                        id={acc._id.toString()}
                        deleteUser={accounts.length === 1}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
