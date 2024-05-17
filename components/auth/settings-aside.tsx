'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SettingsAside = () => {
  const pathname = usePathname();
  return (
    <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-8.5rem)] w-full shrink-0 md:sticky md:block'>
      <div>
        <div>
          <h4 className='mb-1 rounded-md px-2 py-1 text-sm font-semibold'>
            Settings
          </h4>
        </div>
        <div className='grid grid-flow-row auto-rows-max text-sm'>
          <Link
            className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline  ${
              pathname === '/settings'
                ? 'text-foreground'
                : 'text-muted-foreground'
            }`}
            href={'/settings'}
          >
            User info
          </Link>
          <Link
            className={`group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline  ${
              pathname === '/settings/accounts'
                ? 'text-foreground'
                : 'text-muted-foreground'
            }`}
            href={'/settings/accounts'}
          >
            Accounts
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default SettingsAside;
