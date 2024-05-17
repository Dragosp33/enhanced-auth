'use client';

import { NewVerificationForm } from '@/components/auth/new-verification-form';
import { Suspense } from 'react';

const NewVerification = () => {
  return (
    <Suspense>
      {' '}
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerification;
