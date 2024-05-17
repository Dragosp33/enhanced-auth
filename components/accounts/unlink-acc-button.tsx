'use client';

import React from 'react';
import { FaUnlink } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { unLinkAccount } from '@/actions/unlink-account';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

const UnlinkButton = ({
  id,
  deleteUser,
}: {
  id: string;
  deleteUser?: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' className='w-full' variant='destructive'>
          <p className='hidden md:block'> unlink </p>
          <FaUnlink className='block md:hidden' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will unlink your social from this
            user.
            {deleteUser && (
              <p className='font-semibold'>
                {' '}
                This is your main and only account linked. If you have not
                previously registered with a password, your data and your
                account will be lost.
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size='sm'
            //className='w-full'
            variant='destructive'
            onClick={async () => {
              await unLinkAccount(id);
            }}
          >
            {' '}
            Confirm{' '}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkButton;
