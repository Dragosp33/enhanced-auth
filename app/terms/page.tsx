import { Button } from '@/components/ui/button';
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from '@/components/ui/collapsible';

export default function Component() {
  return (
    <>
      <section className='w-full py-12 lg:py-16 xl:py-24'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2 flex flex-col'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Terms of Service
              </h1>
              <p className='self-center md:self-end'>
                {' '}
                Last updated: 16.05.2024{' '}
              </p>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                By using our platform, you agree to these terms. Please read
                them carefully.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='mx-auto max-w-3xl space-y-4'>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                1. Introduction
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  Welcome to our platform! These Terms of Service govern your
                  access to and use of our website, mobile applications, and
                  related services. By accessing or using the Platform, you
                  agree to be bound by these Terms and our Privacy Policy.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                2. User Accounts
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  To access certain features of the Platform, you may be
                  required to create an account. You agree to provide accurate
                  and complete information when creating your account, and to
                  keep your account information up-to-date. You are responsible
                  for maintaining the confidentiality of your account
                  credentials and for any activity that occurs under your
                  account.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                3. Intellectual Property
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  The Platform and its content, features, and functionality are
                  owned by DPC Auth and are protected by copyright, trademark,
                  and other intellectual property laws. You may not modify,
                  copy, distribute, transmit, display, reproduce, or create
                  derivative works from the Platform without our prior written
                  consent.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                4. Termination
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  We reserve the right to suspend or terminate your access to
                  the Platform at any time for any reason, including if we
                  reasonably believe you have violated these Terms. You may also
                  delete your account at any time. Upon termination, your right
                  to use the Platform will immediately cease.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>
    </>
  );
}

function ChevronRightIcon(props: any) {
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
      <path d='m9 18 6-6-6-6' />
    </svg>
  );
}
