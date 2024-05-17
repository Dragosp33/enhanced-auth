import { ModeToggle } from '@/components/theme-toggle';

import { lusitana } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { LoginButton } from '@/components/auth/login-button';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import Docs from '@/components/home/docs';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className='flex min-h-full flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-semibold drop-shadow-md',
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className='mx-auto max-w-[700px] text-lg text-foreground font-light'>
          Enhanced auth with auth.js and mongodb. Multiple features such as
          server/client session, update session, multiple account linking,
          socials, and more.{' '}
        </p>
        <p className='mx-auto max-w-[700px] text-lg text-foreground font-light italic'>
          {' '}
          It is also OpenSource
        </p>
        <p className='mx-auto max-w-[700px] text-lg text-foreground font-light'>
          <span className='font-semibold'> Protected pages: </span>
          <Link className='hover:underline' href='/settings'>
            Settings,
          </Link>{' '}
          <Link className='hover:underline mr-1' href='/client'>
            Client,
          </Link>
          <Link className='hover:underline' href='/server'>
            Server
          </Link>
        </p>
        <p className='mx-auto max-w-[700px] text-lg text-foreground font-light'>
          <span className='font-semibold'>Public pages : </span>
          <Link className='hover:underline' href='/'>
            Home,
          </Link>{' '}
          <Link className='hover:underline mr-1' href='/terms'>
            Terms,
          </Link>
          <Link className='hover:underline' href='/privacypolicy'>
            Privacy policy
          </Link>
        </p>
      </div>
      <div className='mx-auto flex items-center max-w-[700px] mt-5'>
        <div className='mx-2'>
          <LoginButton asChild>
            <Button variant='default' size='lg'>
              Sign in
            </Button>
          </LoginButton>
        </div>
        <div className='mx-2'>
          <Button variant={'outline'} size={'lg'} asChild>
            <div>
              <FaGithub />
              <Link href='https://github.com/Dragosp33/enhanced-auth'>
                {' '}
                GitHub{' '}
              </Link>
            </div>
          </Button>
        </div>
        <div className='mx-2'>
          <ModeToggle />
        </div>
      </div>
      <Docs />
    </main>
  );
}
