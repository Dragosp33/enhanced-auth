'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { ModeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { UserButton } from './auth/user-button';
import { ExitIcon } from '@radix-ui/react-icons';
import { LogoutButton } from './auth/logout-button';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container h-14 max-w-screen-2xl flex items-center justify-between px-4 py-2'>
        <Link className='flex items-center gap-2' href='#'>
          <MountainIcon className='h-6 w-6 font-bold' />
          <span className='text-lg font-bold'>DPC</span>
        </Link>
        <div className='hidden md:flex gap-4 items-center justify-center'>
          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname === '/' ? 'text-foreground/100' : 'text-foreground/60'
            }`}
            href='/'
          >
            Home
          </Link>

          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname === '/server'
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/server'
          >
            Server
          </Link>

          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname.includes('/client')
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/client'
          >
            Client
          </Link>

          <Link
            className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
              pathname.includes('/settings')
                ? 'text-foreground/100'
                : 'text-foreground/60'
            }`}
            href='/settings'
          >
            Settings
          </Link>
          <UserButton />
          <ModeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='md:hidden' size='icon' variant='outline'>
              <MenuIcon className='h-6 w-6' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right'>
            <SheetHeader>
              <SheetTitle> DPC Auth </SheetTitle>
              <SheetDescription>
                Check out different pages with server or client auth.
              </SheetDescription>
            </SheetHeader>
            <div className='grid grid-cols gap-4 w-[200px] p-4'>
              <SheetClose asChild>
                <Link
                  className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
                    pathname === '/'
                      ? 'text-foreground/100'
                      : 'text-foreground/60'
                  }`}
                  href='/'
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className={`transition-colors hover:underline hover:text-foreground/80 underline-offset-4 ${
                    pathname === '/server'
                      ? 'text-foreground/100'
                      : ' text-foreground/60'
                  }`}
                  href='/server'
                >
                  Server
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
                    pathname === '/client'
                      ? 'text-foreground/100'
                      : ' text-foreground/60'
                  }`}
                  href='/client'
                >
                  Client
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className={`transition-colors  hover:underline hover:text-foreground/80 underline-offset-4 ${
                    pathname.includes('/settings')
                      ? 'text-foreground/100'
                      : ' text-foreground/60'
                  }`}
                  href='/settings'
                >
                  Settings
                </Link>
              </SheetClose>
              <div className='flex flex-row w-full items-center justify-between'>
                {' '}
                <LogoutButton>
                  <div className='flex flex-row items-center '>
                    {' '}
                    <ExitIcon className='w-4 h-4 mr-2' />
                    Log out{' '}
                  </div>
                </LogoutButton>
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}
