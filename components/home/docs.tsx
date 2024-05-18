import { ChevronRightIcon } from '@radix-ui/react-icons';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import Link from 'next/link';

const Docs = () => {
  return (
    <div className='container px-4 md:px-6 mt-4 mb-4'>
      <div className='mx-auto max-w-3xl space-y-4 h-full'>
        <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
          <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
            Docs
            <ChevronRightIcon className='h-5 w-5 transition-all' />
          </CollapsibleTrigger>
          <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                1. Features
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  Regarding a full authentication app, features present are:
                </p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>Credential and social sign up.</li>
                  <li>
                    Multiple account linking ( even with different emails )
                  </li>
                  <li>2FA via email OTP</li>
                  <li>View & update current session user</li>
                  <li>Client and server session</li>
                  <li> Extended user interface and session</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                2. Socials
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  Current socials are supported ( can be modified based on your
                  requirements).
                </p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li className='line-through decoration-pink-500'>Twitter</li>
                  <li> Github </li>
                  <li>Google</li>
                </ul>
                <p className='italic mt-1'>
                  In order to support twitter and request a user email, your app
                  must have a
                  <Link
                    href='/terms'
                    className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                  >
                    {' '}
                    Terms of service
                  </Link>{' '}
                  and a{' '}
                  <Link
                    href={'/privacypolicy'}
                    className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                  >
                    {' '}
                    Privacy policy{' '}
                  </Link>{' '}
                  page available
                </p>
                <p>
                  {' '}
                  For now twitter oauth does not support email, so I will use
                  github instead.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                3. Account linking
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  Account linking is possible two ways:
                  <ul className='list-disc space-y-2 pl-6'>
                    <li>
                      {' '}
                      automically, if a user logs in with a social having the
                      same email as another account already signed up with that
                      email.{' '}
                    </li>
                    <li>
                      Manually, on the{' '}
                      <Link
                        href={'/settings/accounts'}
                        target='blank'
                        className='italic hover:italic md:not-italic hover:underline underline-offset-4'
                      >
                        {' '}
                        Accounts{' '}
                      </Link>{' '}
                      page
                    </li>
                  </ul>
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                4. Auth modules
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  In order to use the auth like I needed, few modifiers have
                  been applied to base interfaces such as:{' '}
                  <span className='font-semibold'>
                    {' '}
                    User, Session, Account and JWT tokens.{' '}
                  </span>
                </p>

                <p>
                  {' '}
                  Modifiers:
                  <ul className='list-disc space-y-2 pl-6'>
                    <li>
                      {' '}
                      User interface now contains fields such as role, 2FA
                      active
                    </li>
                    <li>
                      {' '}
                      Account interface now contains a field for email, in order
                      to link multiple socials with different emails.
                    </li>
                    <li>
                      {' '}
                      JWT and Sessions now reflect changes and contain a new
                      field for the user named{' '}
                      <span className='font-semibold'> IsOAuth </span> which
                      indicates if a user has signed up with a credential
                      (password) or via a provider.{' '}
                    </li>
                  </ul>
                </p>
                <p>
                  {' '}
                  all this changes can be seen in the{' '}
                  <span className='font-semibold'>/auth.ts </span> file
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                5. How to run locally
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p className='mb-2'>
                  Deploying locally is simple and it takes 5minutes at most.
                </p>
                <ol className='list-decimal space-y-2 pl-6'>
                  <li>clone the git locally.</li>
                  <li> run npm install </li>
                  <li> Set up a mongodb </li>
                  <li>
                    create yourself keys for{' '}
                    <Link
                      href='https://developer.twitter.com'
                      target='blank'
                      className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                    >
                      {' '}
                      twitter{' '}
                    </Link>{' '}
                    ,
                    <Link
                      href='https://developers.google.com/'
                      target='blank'
                      className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                    >
                      {' '}
                      Google{' '}
                    </Link>{' '}
                    , and{' '}
                    <Link
                      href='https://github.com/'
                      target='blank'
                      className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                    >
                      {' '}
                      Github{' '}
                    </Link>{' '}
                  </li>
                  <li>
                    {' '}
                    Register and create a key on{' '}
                    <Link
                      href='https://resend.com'
                      target='blank'
                      className='transition-colors  hover:underline hover:text-foreground/80 underline-offset-4'
                    >
                      {' '}
                      Resend{' '}
                    </Link>{' '}
                    for emails. Note: as you register you can only send emails
                    to yourself; in order to send emails to any address, you
                    have to register & verify a domain.
                  </li>
                  <li>
                    Create your .env file to contain those keys and the mongodb
                    connection.
                  </li>
                  <li> npm run dev, and good to go. </li>
                </ol>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                6. File structure - brief.
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>Following this file structure:</p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>
                    <span className='font-semibold'>/actions </span> - folder
                    that contains actions needed for the auth actions like
                    login, register, setting up a new password, and more. each
                    action has its own file.
                  </li>
                  <li>
                    {' '}
                    <span className='font-semibold'>/routes.ts </span> -
                    contains routes that are public, protected or auth routes{' '}
                  </li>
                  <li>
                    <span className='font-semibold'>/auth.ts </span> - contains
                    the main auth file. together with{' '}
                    <span className='font-semibold'>/auth.config.ts </span> it
                    represents the whole authentication
                  </li>
                  <li>
                    <span className='font-semibold'>/data </span> - folder
                    containing server-run actions related to database data.
                  </li>
                  <li>
                    <span className='font-semibold'>/hooks </span> - folder
                    containing hooks for the client-side sessions (
                    use-current-user)
                  </li>
                  <li>
                    <span className='font-semibold'>/lib </span> - folder
                    containing helper functions, such as mail sender, mongodb
                    connection ( for the adapter ), schemas for forms, and more.
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default Docs;
