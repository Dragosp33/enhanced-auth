'use client';

import { LoginForm } from '@/components/auth/login-form';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      {' '}
      <LoginForm />
    </Suspense>
  );
};

export default page;
