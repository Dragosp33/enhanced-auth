'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginButton } from './login-button';
import { signIn } from 'next-auth/react';

export const GoogleSignInButton = () => {
  const onClick = async (callbackUrl?: string) => {
    console.log({ callbackUrl });
    if (callbackUrl) {
      try {
        signIn('google', { callbackUrl: callbackUrl, redirect: true });
      } catch (error) {
        console.log('CAUGHT ERROR: ', error);
      }
    }
  };
  return (
    <Button
      size='lg'
      className='w-full'
      variant='outline'
      onClick={() => onClick(`${process.env.NEXTAUTH_URL}/settings`)}
    >
      <FcGoogle className='h-5 w-5' />
    </Button>
  );
};

const Social = () => {
  const onClick = (provider: 'google' | 'github', callbackUrl?: string) => {
    console.log({ provider, callbackUrl });
    try {
      signIn(provider, {
        callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log('ERROR CAUGHT: ', error);
    }
  };
  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('google', '/settings')}
      >
        <FcGoogle className='h-5 w-5' />
      </Button>

      <Button
        size='lg'
        className='w-full'
        variant='outline'
        onClick={() => onClick('github')}
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  );
};
export default Social;
