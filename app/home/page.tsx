import { ModeToggle } from '@/components/theme-toggle';

import { lusitana } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { LoginButton } from '@/components/auth/login-button';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <h1
          className={cn(
            'text-6xl font-semibold drop-shadow-md',
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className=' text-lg'>
          Enhanced auth with auth.js and mongodb. Multiple features such as
          server/client session, update session, multiple account linking,
          socials, and more.{' '}
        </p>
        <div>
          <LoginButton asChild>
            <Button variant='default' size='lg'>
              Sign in
            </Button>
          </LoginButton>

          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
