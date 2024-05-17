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
                Privacy policy
              </h1>
              <p className='self-center md:self-end'>
                {' '}
                Last updated: 16.05.2024{' '}
              </p>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                DPC Auth is committed to protecting your privacy. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our app. Please read this Privacy
                Policy carefully.
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
                1. Information We Collect
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  We may collect information about you in a variety of ways,
                  including:
                </p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>
                    Personal Data: When you register for an account, we may
                    collect your name, email address, and other information you
                    provide.
                  </li>
                  <li>
                    Third-Party Sign-In Data: If you sign in using Google or
                    Twitter, we may collect your profile information from those
                    services.
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                2. Use of Your Information
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>We may use the information we collect to:</p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>Provide, operate, and maintain our service</li>
                  <li>Improve, personalize, and expand our service</li>
                  <li>Understand and analyze how you use our service</li>
                  <li>
                    Communicate with you, either directly or through one of our
                    partners, including for customer service, to provide you
                    with updates and other information relating to the service,
                    and for marketing and promotional purposes
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                3. Sharing Your Information
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  We do not sell, trade, or otherwise transfer to outside
                  parties your personally identifiable information. This does
                  not include trusted third parties who assist us in operating
                  our website, conducting our business, or servicing you, so
                  long as those parties agree to keep this information
                  confidential.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                4. Security of Your Information
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  We use administrative, technical, and physical security
                  measures to help protect your personal information. While we
                  have taken reasonable steps to secure the personal information
                  you provide to us, please be aware that despite our efforts,
                  no security measures are perfect or impenetrable, and no
                  method of data transmission can be guaranteed against any
                  interception or other type of misuse.
                </p>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                5. Your Data Protection Rights
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  Depending on your location, you may have the following rights
                  regarding your personal data:
                </p>
                <ul className='list-disc space-y-2 pl-6'>
                  <li>
                    The right to access – You have the right to request copies
                    of your personal data.
                  </li>
                  <li>
                    The right to rectification – You have the right to request
                    that we correct any information you believe is inaccurate.
                  </li>
                  <li>
                    The right to erasure – You have the right to request that we
                    erase your personal data, under certain conditions.
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className='rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950'>
              <CollapsibleTrigger className='flex w-full items-center justify-between gap-4 px-6 py-4 text-lg font-medium [&[data-state=open]>svg]:rotate-90'>
                6. Changes to This Privacy Policy
                <ChevronRightIcon className='h-5 w-5 transition-all' />
              </CollapsibleTrigger>
              <CollapsibleContent className='px-6 py-4 text-sm leading-relaxed'>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  our website. We encourage you to review this Privacy Policy
                  periodically for any changes.
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
