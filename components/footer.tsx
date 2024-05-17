import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='py-6'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'> DPC Auth </span>
          </Link>
        </div>
        <nav className='flex flex-wrap items-center justify-center gap-4 text-sm font-medium'>
          <Link className='hover:underline' href='/'>
            Home
          </Link>
          <Link className='hover:underline' href='/settings'>
            Settings
          </Link>

          <Link className='hover:underline' href='/terms'>
            Terms of Service
          </Link>
          <Link className='hover:underline' href='/privacypolicy'>
            Privacy Policy
          </Link>
          <Link
            href='https://github.com/Dragosp33/enhanced-auth'
            target='blank'
          >
            <FaGithub />
          </Link>
        </nav>
        <p className='text-xs'>© 2024 DPC. All rights reserved.</p>
      </div>
    </footer>
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
